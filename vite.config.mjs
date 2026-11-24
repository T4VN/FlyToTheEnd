import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { minify as minifyHtml } from 'html-minifier-terser';
import { transform as esbuildTransform } from 'esbuild';
import { LANDMARKS } from './scripts/landmarks-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GLOBAL_VARS = {
  totalLandmarks: String(LANDMARKS.length),
  countNorth: String(LANDMARKS.filter((l) => l.region === 'north').length),
  countCentral: String(LANDMARKS.filter((l) => l.region === 'central').length),
  countHighlands: String(LANDMARKS.filter((l) => l.region === 'highlands').length),
  countSouth: String(LANDMARKS.filter((l) => l.region === 'south').length),
};

const ACTIVE_MAP = {
  home: 'activeHome',
  rules: 'activeRules',
  landmarks: 'activeLandmarks',
  privacy: 'activePrivacy',
  terms: 'activeTerms',
};

function parseAttrs(attrStr) {
  const attrs = {};
  for (const m of attrStr.matchAll(/([a-zA-Z0-9_-]+)="([^"]*)"/g)) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function renderPartial(partialPath, attrs) {
  const fullPath = path.resolve(__dirname, partialPath);
  let tpl = fs.readFileSync(fullPath, 'utf8');

  const vars = {
    ...GLOBAL_VARS,
    base: attrs.base ?? '',
    activeHome: '',
    activeRules: '',
    activeLandmarks: '',
    activePrivacy: '',
    activeTerms: '',
    ...attrs,
  };

  if (attrs.active && ACTIVE_MAP[attrs.active]) {
    vars[ACTIVE_MAP[attrs.active]] = ' active';
  }

  tpl = tpl.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_, key) => vars[key] ?? '');
  return tpl.trimEnd();
}

/**
 * Expands <!-- @include partials/... key="val" --> in all HTML pages at dev & build time.
 * Watches partials/ for instant reload in `vite dev`.
 */
function htmlPartialsPlugin() {
  const partialsDir = path.resolve(__dirname, 'partials');
  return {
    name: 'html-partials',
    handleHotUpdate({ file, server }) {
      if (file.startsWith(partialsDir)) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          /<!--\s*@include\s+([^\s]+)(?:\s+([\s\S]*?))?\s*-->/g,
          (_, partialPath, attrStr = '') => renderPartial(partialPath, parseAttrs(attrStr))
        );
      },
    },
  };
}

/**
 * Minifies all built HTML pages while preserving SEO meta quotes, SVGs, and JSON-LD validity.
 */
function minifyHtmlPlugin() {
  return {
    name: 'minify-html',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        // Compact JSON-LD blocks safely before HTML minification
        const compactedJsonLd = html.replace(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
          (match, jsonText) => {
            try {
              const compact = JSON.stringify(JSON.parse(jsonText)).replace(/<\//g, '<\\/');
              return `<script type="application/ld+json">${compact}</script>`;
            } catch {
              return match;
            }
          }
        );

        return minifyHtml(compactedJsonLd, {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: false,
          removeStyleLinkTypeAttributes: true,
          removeAttributeQuotes: false,
          minifyCSS: true,
          minifyJS: true,
          keepClosingSlash: true,
        });
      },
    },
  };
}

/**
 * Copies static folders/files (assets, play, SEO files) and minifies classic js/*.js into dist/.
 */
function staticAssetsAndMinifyJsPlugin() {
  return {
    name: 'static-assets-and-minify-js',
    apply: 'build',
    async closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');

      // 1. Copy static root files
      for (const file of ['CNAME', 'favicon.ico', 'robots.txt', 'site.webmanifest', 'sitemap.xml']) {
        const src = path.resolve(__dirname, file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(distDir, file));
        }
      }

      // 2. Copy assets/ (keeps unhashed OG images & icons reachable) and play/ (pre-built game)
      for (const dir of ['assets', 'play']) {
        const srcDir = path.resolve(__dirname, dir);
        if (fs.existsSync(srcDir)) {
          fs.cpSync(srcDir, path.join(distDir, dir), { recursive: true, force: true });
        }
      }

      // 3. Minify classic js/*.js into dist/js/*.js (skip already-minified *.min.js)
      const jsSrcDir = path.resolve(__dirname, 'js');
      const jsDistDir = path.join(distDir, 'js');
      if (fs.existsSync(jsSrcDir)) {
        fs.mkdirSync(jsDistDir, { recursive: true });
        const jsFiles = fs.readdirSync(jsSrcDir).filter((f) => f.endsWith('.js'));
        for (const file of jsFiles) {
          const srcPath = path.join(jsSrcDir, file);
          const outPath = path.join(jsDistDir, file);
          const code = fs.readFileSync(srcPath, 'utf8');
          if (file.endsWith('.min.js')) {
            fs.writeFileSync(outPath, code, 'utf8');
          } else {
            const result = await esbuildTransform(code, {
              loader: 'js',
              minify: true,
              target: 'es2020',
            });
            fs.writeFileSync(outPath, result.code, 'utf8');
          }
        }
      }
    },
  };
}

/**
 * Discovers all MPA HTML entrypoints: root *.html and landmarks/*.html.
 */
function collectHtmlInputs() {
  const inputs = {};

  for (const file of fs.readdirSync(__dirname)) {
    if (file.endsWith('.html')) {
      const key = path.basename(file, '.html');
      inputs[key] = path.resolve(__dirname, file);
    }
  }

  const landmarksDir = path.resolve(__dirname, 'landmarks');
  if (fs.existsSync(landmarksDir)) {
    for (const file of fs.readdirSync(landmarksDir)) {
      if (file.endsWith('.html')) {
        const key = `landmarks/${path.basename(file, '.html')}`;
        inputs[key] = path.join(landmarksDir, file);
      }
    }
  }

  return inputs;
}

export default defineConfig({
  base: '/',
  publicDir: false,
  plugins: [
    htmlPartialsPlugin(),
    minifyHtmlPlugin(),
    staticAssetsAndMinifyJsPlugin(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      input: collectHtmlInputs(),
    },
  },
});
