import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetArg = process.argv[2];
const root = targetArg ? path.resolve(__dirname, '..', targetArg) : path.resolve(__dirname, '..');
console.log('Verifying SEO in:', root);

// 1. Validate sitemap.xml
const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log('Sitemap URLs:', locs.length);

// 2. Check every URL in sitemap maps to an existing file
let missingFiles = 0;
for (const url of locs) {
  let rel = url.replace('https://flytotheend.t4vn.com/', '');
  if (!rel || rel.endsWith('/')) rel += 'index.html';
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error('MISSING FILE:', full);
    missingFiles++;
  }
}

// 3. Validate JSON-LD, canonical, h1, title, meta description & internal links
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

let jsonErrors = 0;
let metaErrors = 0;
let brokenInternalLinks = 0;
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
  }

  if (!/<title>[^<]+<\/title>/.test(html)) {
    console.error('NO TITLE:', file);
    metaErrors++;
  }
  if (!/<meta name="description" content="[^"]+">/.test(html)) {
    console.error('NO DESC:', file);
    metaErrors++;
  }
  const canMatch = html.match(/<link rel="canonical" href="(https:\/\/flytotheend\.t4vn\.com\/[^"]*)">/);
  if (!canMatch) {
    console.error('NO CANONICAL:', file);
    metaErrors++;
  } else {
    if (canonicals.has(canMatch[1])) {
      console.error('DUPLICATE CANONICAL:', canMatch[1]);
      duplicateCanonicals++;
    }
    canonicals.add(canMatch[1]);
  }
  if (!/<h1[\s>]/.test(html)) {
    console.error('NO H1:', file);
    metaErrors++;
  }

  const dir = path.dirname(file);
  const hrefs = [...html.matchAll(/href="([^"]+\.html(?:#[^"]*)?)"/g)]
    .map((m) => m[1])
    .filter((h) => !h.startsWith('http'));
  for (const h of hrefs) {
    const clean = h.split('#')[0];
    const target = path.resolve(dir, clean);
    if (!fs.existsSync(target)) {
      console.error('BROKEN LINK:', file, '->', h);
      brokenInternalLinks++;
    }
  }
}

console.log('Checked pages:', toCheck.length);
console.log('Unique canonicals:', canonicals.size);
console.log('Missing sitemap files:', missingFiles);
console.log('JSON-LD errors:', jsonErrors);
console.log('Meta/H1 errors:', metaErrors);
console.log('Duplicate canonicals:', duplicateCanonicals);
console.log('Broken internal HTML links:', brokenInternalLinks);

console.log('Play entry errors:', playErrors);

if (missingFiles + jsonErrors + metaErrors + duplicateCanonicals + brokenInternalLinks + playErrors > 0) {
  process.exit(1);
}
console.log('ALL SEO CHECKS PASSED!');
