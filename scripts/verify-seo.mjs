import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://flytotheend.t4vn.com';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetArg = process.argv[2];
const root = targetArg ? path.resolve(__dirname, '..', targetArg) : path.resolve(__dirname, '..');
console.log('Verifying SEO in:', root);

// 1. Validate sitemap.xml
const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log('Sitemap URLs:', locs.length);

// 2. Check every URL in sitemap is a clean URL (no .html) and maps to an existing file
let missingFiles = 0;
let sitemapHtmlExtErrors = 0;
for (const url of locs) {
  let rel = url.replace(`${SITE_URL}/`, '');
  if (rel.endsWith('.html')) {
    console.error('SITEMAP URL HAS .html:', url);
    sitemapHtmlExtErrors++;
  }
  if (!rel || rel.endsWith('/')) {
    rel += 'index.html';
  } else if (!path.posix.extname(rel)) {
    rel += '.html';
  }
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error('MISSING FILE:', full);
    missingFiles++;
  }
}

// 3. Validate JSON-LD, canonical, og:url, twitter:url, hreflang, h1, title, meta description & internal links
const genFiles = fs
  .readdirSync(path.join(root, 'landmarks'))
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(root, 'landmarks', f));
const toCheck = [
  ...genFiles,
  path.join(root, 'landmarks.html'),
  path.join(root, 'index.html'),
  path.join(root, 'rules.html'),
  path.join(root, 'download.html'),
  path.join(root, 'privacy.html'),
  path.join(root, 'terms.html'),
];

// Verify /play/index.html exists and has basic SEO tags
const playHtmlPath = path.join(root, 'play', 'index.html');
let playErrors = 0;
if (!fs.existsSync(playHtmlPath)) {
  console.error('MISSING PLAY ENTRY:', playHtmlPath);
  playErrors++;
} else {
  const playHtml = fs.readFileSync(playHtmlPath, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(playHtml)) {
    console.error('NO TITLE IN PLAY:', playHtmlPath);
    playErrors++;
  }
  if (!/<meta\s+name="description"\s+content="[^"]+"\s*\/?>/i.test(playHtml)) {
    console.error('NO DESC IN PLAY:', playHtmlPath);
    playErrors++;
  }
  if (!/<link\s+rel="canonical"\s+href="https:\/\/flytotheend\.t4vn\.com\/play\/"\s*\/?>/i.test(playHtml)) {
    console.error('NO CANONICAL IN PLAY:', playHtmlPath);
    playErrors++;
  }
}

function getExpectedCanonical(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') return `${SITE_URL}/`;
  return `${SITE_URL}/${rel.replace(/\.html$/, '')}`;
}

function resolveInternalCleanLink(rawHref, fileDir) {
  const clean = rawHref.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return path.join(root, 'index.html');

  const baseTarget = clean.startsWith('/')
    ? path.join(root, clean.slice(1))
    : path.resolve(fileDir, clean);

  if (clean.endsWith('/')) {
    return path.join(baseTarget, 'index.html');
  }
  if (!path.posix.extname(clean)) {
    const htmlCandidate = `${baseTarget}.html`;
    if (fs.existsSync(htmlCandidate)) return htmlCandidate;
    return path.join(baseTarget, 'index.html');
  }
  return baseTarget;
}

let jsonErrors = 0;
let metaErrors = 0;
let brokenInternalLinks = 0;
let htmlExtErrors = 0;
const canonicals = new Set();
let duplicateCanonicals = 0;

for (const file of toCheck) {
  const html = fs.readFileSync(file, 'utf8');

  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ldMatches.length === 0) {
    console.error('NO JSON-LD:', file);
    jsonErrors++;
  }
  for (const m of ldMatches) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      console.error('INVALID JSON-LD:', file, e.message);
      jsonErrors++;
    }
    if (/https:\/\/flytotheend\.t4vn\.com\/[^"'\s]*\.html/.test(m[1])) {
      console.error('JSON-LD CONTAINS .html URL:', file);
      htmlExtErrors++;
    }
  }

  if (!/<title>[^<]+<\/title>/.test(html)) {
    console.error('NO TITLE:', file);
    metaErrors++;
  }
  if (!/<meta name="description" content="[^"]+">/.test(html)) {
    console.error('NO DESC:', file);
    metaErrors++;
  }

  const expectedCanonical = getExpectedCanonical(file);
  const canMatch = html.match(/<link rel="canonical" href="(https:\/\/flytotheend\.t4vn\.com\/[^"]*)">/);
  if (!canMatch) {
    console.error('NO CANONICAL:', file);
    metaErrors++;
  } else {
    if (canMatch[1] !== expectedCanonical) {
      console.error('CANONICAL MISMATCH:', file, 'got:', canMatch[1], 'expected:', expectedCanonical);
      metaErrors++;
    }
    if (canonicals.has(canMatch[1])) {
      console.error('DUPLICATE CANONICAL:', canMatch[1]);
      duplicateCanonicals++;
    }
    canonicals.add(canMatch[1]);
  }

  for (const m of html.matchAll(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"/g)) {
    if (m[1].endsWith('.html')) {
      console.error('HREFLANG HAS .html:', file, m[1]);
      htmlExtErrors++;
    }
  }
  for (const m of html.matchAll(/<meta[^>]+(?:property="og:url"|name="twitter:url")[^>]+content="([^"]+)"/g)) {
    if (m[1].endsWith('.html')) {
      console.error('OG/TWITTER URL HAS .html:', file, m[1]);
      htmlExtErrors++;
    }
  }

  if (!/<h1[\s>]/.test(html)) {
    console.error('NO H1:', file);
    metaErrors++;
  }

  const dir = path.dirname(file);
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const h = m[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(h)) continue;
    const clean = h.split('#')[0].split('?')[0];
    if (clean.endsWith('.html')) {
      console.error('INTERNAL LINK HAS .html:', file, '->', h);
      htmlExtErrors++;
      continue;
    }
    const target = resolveInternalCleanLink(h, dir);
    if (!fs.existsSync(target)) {
      console.error('BROKEN LINK:', file, '->', h, '(resolved:', target, ')');
      brokenInternalLinks++;
    }
  }
}

console.log('Checked pages:', toCheck.length);
console.log('Unique canonicals:', canonicals.size);
console.log('Missing sitemap files:', missingFiles);
console.log('Sitemap .html errors:', sitemapHtmlExtErrors);
console.log('JSON-LD errors:', jsonErrors);
console.log('Meta/H1 errors:', metaErrors);
console.log('Duplicate canonicals:', duplicateCanonicals);
console.log('Clean-URL .html errors:', htmlExtErrors);
console.log('Broken internal links:', brokenInternalLinks);
console.log('Play entry errors:', playErrors);

if (
  missingFiles +
    sitemapHtmlExtErrors +
    jsonErrors +
    metaErrors +
    duplicateCanonicals +
    htmlExtErrors +
    brokenInternalLinks +
    playErrors >
  0
) {
  process.exit(1);
}
console.log('ALL SEO CHECKS PASSED!');
