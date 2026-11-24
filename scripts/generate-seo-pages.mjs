/**
 * FLY TO THE END - Static SEO Page & Sitemap Generator
 * Generates:
 *   - 63 individual landmark detail pages: landmarks/<slug>.html
 *   - 4 regional hub pages: landmarks/mien-bac.html, mien-trung.html, tay-nguyen.html, mien-nam.html
 *   - Updated sitemap.xml with all indexable URLs
 *
 * Usage: node scripts/generate-seo-pages.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANDMARKS, REGIONS, SITE_URL, LAST_MOD } from './landmarks-data.mjs';

const TOTAL_LANDMARKS = LANDMARKS.length;
const COUNT_BY_REGION = {
  north: LANDMARKS.filter((l) => l.region === 'north').length,
  central: LANDMARKS.filter((l) => l.region === 'central').length,
  highlands: LANDMARKS.filter((l) => l.region === 'highlands').length,
  south: LANDMARKS.filter((l) => l.region === 'south').length,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WEB_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(WEB_ROOT, 'landmarks');

fs.mkdirSync(OUT_DIR, { recursive: true });

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function safeJsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/');
}

function renderHeader() {
  return `  <!-- @include partials/header.html active="landmarks" base="../" -->`;
}

function renderFooter() {
  return `  <!-- @include partials/footer-landmarks.html -->`;
}

function renderHead({ title, description, keywords, canonicalUrl, jsonLd }) {
  return `<!DOCTYPE html>
<html lang="vi" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>${escHtml(title)}</title>
  <meta name="title" content="${escHtml(title)}">
  <meta name="description" content="${escHtml(description)}">
  <meta name="keywords" content="${escHtml(keywords)}">
  <meta name="author" content="T4VN">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${escHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="vi-VN" href="${escHtml(canonicalUrl)}">
  <link rel="alternate" hreflang="x-default" href="${escHtml(canonicalUrl)}">
  <meta name="theme-color" content="#f25346">

  <link rel="icon" href="../favicon.ico" sizes="any">
  <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
  <link rel="icon" type="image/png" sizes="64x64" href="../assets/images/favicon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="../assets/images/icon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="../assets/images/icon-512.png">
  <link rel="icon" type="image/svg+xml" href="../assets/icons/game-icon.svg">
  <link rel="apple-touch-icon" href="../assets/images/icon-512.png">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Fly to The End">
  <meta property="og:title" content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(description)}">
  <meta property="og:url" content="${escHtml(canonicalUrl)}">
  <meta property="og:image" content="${SITE_URL}/assets/images/og-banner-1200x628.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="628">
  <meta property="og:image:alt" content="${escHtml(title)}">
  <meta property="og:locale" content="vi_VN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${escHtml(canonicalUrl)}">
  <meta name="twitter:title" content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(description)}">
  <meta name="twitter:image" content="${SITE_URL}/assets/images/og-banner-1200x628.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">

  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9027163152867616" crossorigin="anonymous"></script>

  <!-- Structured Data JSON-LD for SEO -->
  <script type="application/ld+json">
${safeJsonLd(jsonLd)}
  </script>
</head>`;
}

// =========================================================================
// 1. GENERATE 42 INDIVIDUAL LANDMARK PAGES
// =========================================================================
LANDMARKS.forEach((lm, index) => {
  const region = REGIONS[lm.region];
  const prevLm = LANDMARKS[(index - 1 + LANDMARKS.length) % LANDMARKS.length];
  const nextLm = LANDMARKS[(index + 1) % LANDMARKS.length];
  const sameRegion = LANDMARKS.filter((other) => other.region === lm.region && other.id !== lm.id);

  const canonicalUrl = `${SITE_URL}/landmarks/${lm.slug}.html`;
  const regionUrl = `${SITE_URL}/landmarks/${region.slug}.html`;
  const title = `${lm.name} (${lm.location}) - Mô Hình 3D & Lịch Sử | Fly to The End`;
  const description = `Khám phá ${lm.name} tại ${lm.location} qua mô hình 3D xoay 360° trực tiếp trong Fly to The End. ${lm.shortDesc}`;

  const faqs = [
    {
      q: `${lm.name} nằm ở đâu tại Việt Nam?`,
      a: `${lm.name} tọa lạc tại ${lm.location}, thuộc khu vực ${region.name} Việt Nam (tọa độ tham khảo ${lm.lat.toFixed(4)}°N, ${lm.lng.toFixed(4)}°E). Đây là chặng dừng chân thứ #${pad2(lm.order)}/${TOTAL_LANDMARKS} trong hành trình xuyên Việt của game Fly to The End.`,
    },
    {
      q: `${lm.name} có điểm gì nổi bật về lịch sử và kiến trúc?`,
      a: `${lm.shortDesc} Công trình mang dấu ấn: ${lm.era}, được ghi nhận là ${lm.status}.`,
    },
    {
      q: `Làm sao để ngắm và bay qua ${lm.name} trong Fly to The End?`,
      a: `Bạn có thể xoay 360° trực tiếp mô hình 3D Low-poly của ${lm.name} ngay trên trang này, hoặc nhấn "Bay Ngắm Trực Tuyến" để lái phi cơ 3D miễn phí trên trình duyệt hoặc tải bản Android trên Google Play.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: 'vi-VN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        dateModified: LAST_MOD,
        mainEntity: { '@id': `${canonicalUrl}#landmark` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Di tích Việt Nam 3D', item: `${SITE_URL}/landmarks.html` },
          { '@type': 'ListItem', position: 3, name: region.name, item: regionUrl },
          { '@type': 'ListItem', position: 4, name: lm.name, item: canonicalUrl },
        ],
      },
      {
        '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings'],
        '@id': `${canonicalUrl}#landmark`,
        name: lm.name,
        description: `${lm.shortDesc} ${lm.history}`,
        url: canonicalUrl,
        image: `${SITE_URL}/assets/images/og-banner-1200x628.png`,
        touristType: ['Du lịch văn hóa', 'Khám phá di tích lịch sử', 'Giáo dục 3D'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: lm.location,
          addressRegion: lm.province,
          addressCountry: 'VN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lm.lat,
          longitude: lm.lng,
        },
        isAccessibleForFree: true,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  const regionShort = region.shortLabel || region.name;
  const tagClass = lm.isUnesco ? 'landmark-tag tag-unesco' : 'landmark-tag';

  const html = `${renderHead({
    title,
    description,
    keywords: `${lm.keywords}, Fly to The End, mô hình 3D di tích Việt Nam, T4VN`,
    canonicalUrl,
    jsonLd,
  })}
<body>
${renderHeader()}

  <main>
    <!-- BREADCRUMB -->
    <nav class="breadcrumb-bar" aria-label="Breadcrumb">
      <div class="container">
        <ol class="breadcrumb-list">
          <li><a href="../index.html">Trang chủ</a></li>
          <li><a href="../landmarks.html">${TOTAL_LANDMARKS} Di tích VN 3D</a></li>
          <li><a href="${region.slug}.html">${escHtml(region.name)}</a></li>
          <li class="is-current" aria-current="page">${escHtml(lm.name)}</li>
        </ol>
      </div>
    </nav>

    <!-- LANDMARK 3D HERO -->
    <section class="landmark-detail-hero">
      <div class="container">
        <div class="landmark-detail-grid">
          <!-- Interactive 360° 3D Stage -->
          <div class="landmark-stage-card">
            <span class="landmark-stage-badge">${escHtml(lm.pill)} • Trực tiếp từ Game</span>
            <div class="landmark-detail-stage" id="landmarkDetailStage" data-landmark-id="${escHtml(lm.id)}" role="img" aria-label="Mô hình 3D tương tác 360 độ của ${escHtml(lm.name)}">
              <noscript><p style="padding:2rem;text-align:center;">Bật JavaScript để xoay 360° mô hình 3D ${escHtml(lm.name)}.</p></noscript>
            </div>
            <div class="landmark-stage-toolbar">
              <span class="landmark-stage-hint">Kéo chuột / vuốt để xoay 360° • Cuộn để phóng to</span>
              <div class="landmark-stage-btns">
                <button type="button" class="modal-tool-btn is-active" id="detailAutoRotate" aria-pressed="true" title="Tự động xoay">↻ Tự xoay</button>
                <button type="button" class="modal-tool-btn" id="detailZoomOut" title="Thu nhỏ">−</button>
                <button type="button" class="modal-tool-btn" id="detailZoomIn" title="Phóng to">+</button>
                <button type="button" class="modal-tool-btn" id="detailResetView" title="Đặt lại góc nhìn">⟲</button>
              </div>
            </div>
          </div>

          <!-- Landmark Info Card -->
          <div class="landmark-info-card">
            <div>
              <div class="landmark-detail-meta">
                <span class="landmark-num">#${pad2(lm.order)} / ${TOTAL_LANDMARKS}</span>
                <a href="${region.slug}.html" class="landmark-region ${region.badgeClass}">${escHtml(regionShort)}</a>
                <span class="${tagClass}">${escHtml(lm.tag)}</span>
              </div>
              <h1 class="landmark-detail-title">${escHtml(lm.name)}</h1>
              <p class="landmark-detail-loc">📍 ${escHtml(lm.location)}, Việt Nam</p>
              <p class="landmark-detail-lead">${escHtml(lm.shortDesc)}</p>

              <div class="landmark-facts-list">
                <div class="landmark-fact-row">
                  <span class="landmark-fact-label">Vùng miền</span>
                  <span class="landmark-fact-value"><a href="${region.slug}.html">${escHtml(region.name)}</a></span>
                </div>
                <div class="landmark-fact-row">
                  <span class="landmark-fact-label">Địa phương</span>
                  <span class="landmark-fact-value">${escHtml(lm.province)}</span>
                </div>
                <div class="landmark-fact-row">
                  <span class="landmark-fact-label">Mốc lịch sử</span>
                  <span class="landmark-fact-value">${escHtml(lm.era)}</span>
                </div>
                <div class="landmark-fact-row">
                  <span class="landmark-fact-label">Danh hiệu</span>
                  <span class="landmark-fact-value">${escHtml(lm.status)}</span>
                </div>
                <div class="landmark-fact-row">
                  <span class="landmark-fact-label">Tọa độ GPS</span>
                  <span class="landmark-fact-value">${lm.lat.toFixed(4)}°N, ${lm.lng.toFixed(4)}°E</span>
                </div>
              </div>
            </div>

            <div class="landmark-detail-actions">
              <a href="../play/" class="btn-hero-demo">
                <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
                <span>Bay Ngắm Trực Tuyến</span>
              </a>
              <a href="../landmarks.html" class="btn-secondary-outline">← Tất cả ${TOTAL_LANDMARKS} Di tích</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RICH HISTORICAL & 3D ARCHITECTURE CONTENT -->
    <section class="landmark-article-section">
      <div class="container">
        <div class="landmark-article-grid">
          <article class="landmark-content-box">
            <h2>Lịch sử &amp; Ý nghĩa văn hóa của ${escHtml(lm.name)}</h2>
            <p>${escHtml(lm.history)}</p>
          </article>

          <article class="landmark-content-box">
            <h2>Kiến trúc nổi bật &amp; Mô hình 3D trong Fly to The End</h2>
            <p>${escHtml(lm.architecture)}</p>
          </article>
        </div>

        <div class="landmark-highlights-box">
          <h2>Điểm nổi bật cần biết về ${escHtml(lm.name)}</h2>
          <ul class="landmark-highlights-list">
            ${lm.highlights.map((h) => `<li>${escHtml(h)}</li>`).join('\n            ')}
          </ul>
        </div>

        <!-- FAQ SECTION -->
        <section class="faq-section" style="padding: 1rem 0 2rem;">
          <h2 class="section-title" style="font-size: 1.55rem; text-align: left; margin-bottom: 1rem;">Câu hỏi thường gặp về ${escHtml(lm.name)}</h2>
          <div class="faq-list">
            ${faqs
              .map(
                (f, i) => `<div class="faq-item${i === 0 ? ' active' : ''}">
              <button class="faq-question" type="button">
                <span>${escHtml(f.q)}</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer">
                <p>${escHtml(f.a)}</p>
              </div>
            </div>`
              )
              .join('\n            ')}
          </div>
        </section>

        <!-- PREV / NEXT JOURNEY NAVIGATION -->
        <nav class="landmark-journey-nav" aria-label="Điều hướng hành trình xuyên Việt">
          <a href="${prevLm.slug}.html" class="journey-nav-card">
            <span class="journey-nav-dir">‹ Chặng trước (#${pad2(prevLm.order)})</span>
            <span class="journey-nav-title">${escHtml(prevLm.name)}</span>
            <span class="journey-nav-sub">📍 ${escHtml(prevLm.location)}</span>
          </a>
          <a href="${nextLm.slug}.html" class="journey-nav-card is-next">
            <span class="journey-nav-dir">Chặng tiếp theo (#${pad2(nextLm.order)}) ›</span>
            <span class="journey-nav-title">${escHtml(nextLm.name)}</span>
            <span class="journey-nav-sub">📍 ${escHtml(nextLm.location)}</span>
          </a>
        </nav>

        <!-- Google AdSense Banner -->
        <div class="ad-section-wrap">
          <div class="ad-disclaimer">QUẢNG CÁO</div>
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-9027163152867616"
               data-ad-slot="3635303540"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>

        <!-- RELATED SAME-REGION LANDMARKS -->
        <section class="related-landmarks-section">
          <div class="related-section-head">
            <h2>Các địa danh 3D khác tại ${escHtml(region.name)}</h2>
            <a href="${region.slug}.html" class="related-all-link">Xem tất cả ${sameRegion.length + 1} di tích ${escHtml(region.name)} →</a>
          </div>
          <div class="related-mini-grid">
            ${sameRegion
              .slice(0, 8)
              .map(
                (r) => `<a href="${r.slug}.html" class="related-mini-card">
              <span class="related-mini-num">#${pad2(r.order)} • ${escHtml(r.tag)}</span>
              <span class="related-mini-name">${escHtml(r.name)}</span>
              <span class="related-mini-loc">📍 ${escHtml(r.location)}</span>
            </a>`
              )
              .join('\n            ')}
          </div>
        </section>
      </div>
    </section>
  </main>

${renderFooter()}

  <!-- Scripts -->
  <script src="../js/three.min.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/landmarks-demo.js"></script>
  <script src="../js/landmark-detail-3d.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(OUT_DIR, `${lm.slug}.html`), html, 'utf8');
});

// =========================================================================
// 2. GENERATE 4 REGIONAL HUB PAGES
// =========================================================================
Object.values(REGIONS).forEach((region) => {
  const regionLandmarks = LANDMARKS.filter((lm) => lm.region === region.key);
  const canonicalUrl = `${SITE_URL}/landmarks/${region.slug}.html`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: region.seoTitle,
        description: region.seoDescription,
        inLanguage: 'vi-VN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        dateModified: LAST_MOD,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Di tích Việt Nam 3D', item: `${SITE_URL}/landmarks.html` },
          { '@type': 'ListItem', position: 3, name: region.name, item: canonicalUrl },
        ],
      },
      {
        '@type': 'ItemList',
        name: region.fullName,
        numberOfItems: regionLandmarks.length,
        itemListElement: regionLandmarks.map((lm, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${lm.name} (${lm.location})`,
          url: `${SITE_URL}/landmarks/${lm.slug}.html`,
        })),
      },
    ],
  };

  const regionShort = region.shortLabel || region.name;

  const html = `${renderHead({
    title: region.seoTitle,
    description: region.seoDescription,
    keywords: region.keywords,
    canonicalUrl,
    jsonLd,
  })}
<body>
${renderHeader()}

  <main>
    <nav class="breadcrumb-bar" aria-label="Breadcrumb">
      <div class="container">
        <ol class="breadcrumb-list">
          <li><a href="../index.html">Trang chủ</a></li>
          <li><a href="../landmarks.html">${TOTAL_LANDMARKS} Di tích VN 3D</a></li>
          <li class="is-current" aria-current="page">${escHtml(region.name)}</li>
        </ol>
      </div>
    </nav>

    <section class="subpage-hero" style="padding-top: 1.5rem;">
      <div class="container">
        <div class="badge-tag">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          Hành Trình ${escHtml(region.name)} • ${regionLandmarks.length} Mô Hình 3D
        </div>
        <h1 class="subpage-title">${escHtml(region.fullName)}</h1>
        <p class="subpage-subtitle">${escHtml(region.intro)}</p>
        <div class="subpage-actions">
          <a href="../play/" class="btn-hero-demo">
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
            <span>Bay Ngắm ${escHtml(region.name)} Ngay</span>
          </a>
          <a href="../rules.html" class="btn-secondary-outline">Xem Luật Chơi &amp; 7 Tầng Thử Thách →</a>
        </div>
      </div>
    </section>

    <section class="landmarks-section" style="padding-top: 1.5rem;">
      <div class="container">
        <nav class="region-tabs" aria-label="Chọn vùng miền di tích">
          <a href="../landmarks.html" class="region-tab">
            Tất Cả <span class="tab-count">${TOTAL_LANDMARKS}</span>
          </a>
          ${Object.values(REGIONS)
            .map((r) => {
              const cnt = LANDMARKS.filter((l) => l.region === r.key).length;
              const active = r.key === region.key ? ' active' : '';
              const ariaCurrent = r.key === region.key ? ' aria-current="page"' : '';
              return `<a href="${r.slug}.html" class="region-tab${active}"${ariaCurrent}>
            ${escHtml(r.name)} <span class="tab-count">${cnt}</span>
          </a>`;
            })
            .join('\n          ')}
        </nav>

        <div class="landmarks-grid">
          ${regionLandmarks
            .map(
              (lm) => `<article class="landmark-card" data-region="${lm.region}">
            <div class="landmark-preview" data-landmark-id="${lm.id}" role="button" tabindex="0" aria-label="Xem mô hình 3D ${escHtml(lm.name)}">
              <canvas class="landmark-thumb" width="520" height="325"></canvas>
              <span class="landmark-3d-pill">${escHtml(lm.pill)}</span>
            </div>
            <div class="landmark-card-body">
              <div class="landmark-card-head">
                <span class="landmark-num">#${pad2(lm.order)}</span>
                <span class="landmark-region ${region.badgeClass}">${escHtml(regionShort)}</span>
              </div>
              <h2 class="landmark-name"><a href="${lm.slug}.html" class="landmark-name-link">${escHtml(lm.name)}</a></h2>
              <p class="landmark-loc">📍 ${escHtml(lm.location)}</p>
              <p class="landmark-desc">${escHtml(lm.shortDesc)}</p>
              <div class="landmark-card-footer">
                <span class="${lm.isUnesco ? 'landmark-tag tag-unesco' : 'landmark-tag'}">${escHtml(lm.tag)}</span>
                <a href="${lm.slug}.html" class="landmark-detail-link">Chi tiết 3D →</a>
              </div>
            </div>
          </article>`
            )
            .join('\n\n          ')}
        </div>
      </div>
    </section>
  </main>

${renderFooter()}

  <!-- INTERACTIVE 360° 3D LANDMARK MODAL VIEWER -->
  <div class="landmark-modal" id="landmarkModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="landmarkModalName">
    <div class="landmark-modal-dialog">
      <button class="landmark-modal-close" id="landmarkModalClose" aria-label="Đóng trình xem 3D">&times;</button>
      <div class="landmark-modal-stage-wrap">
        <div class="landmark-modal-stage" id="landmarkModalStage"></div>
        <div class="landmark-modal-hint">Kéo chuột / vuốt để xoay 360° • Cuộn để phóng to</div>
        <div class="landmark-modal-toolbar">
          <button type="button" class="modal-tool-btn is-active" id="landmarkAutoRotate" aria-pressed="true" title="Tự động xoay">↻ Tự xoay</button>
          <button type="button" class="modal-tool-btn" id="landmarkZoomOut" title="Thu nhỏ">−</button>
          <button type="button" class="modal-tool-btn" id="landmarkZoomIn" title="Phóng to">+</button>
        </div>
      </div>
      <div class="landmark-modal-info">
        <div class="landmark-modal-meta">
          <span class="landmark-num" id="landmarkModalNum">#01 / ${TOTAL_LANDMARKS}</span>
          <span class="landmark-region ${region.badgeClass}" id="landmarkModalRegion">${escHtml(regionShort)}</span>
        </div>
        <h3 class="landmark-modal-title" id="landmarkModalName"></h3>
        <p class="landmark-modal-loc" id="landmarkModalLoc"></p>
        <p class="landmark-modal-desc" id="landmarkModalDesc"></p>
        <span class="landmark-tag" id="landmarkModalTag"></span>
        <div class="landmark-modal-nav">
          <button type="button" class="modal-nav-btn" id="landmarkModalPrev">‹ Địa điểm trước</button>
          <button type="button" class="modal-nav-btn" id="landmarkModalNext">Địa điểm tiếp ›</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="../js/three.min.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/landmarks-demo.js"></script>
  <script src="../js/landmarks-showcase.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(OUT_DIR, `${region.slug}.html`), html, 'utf8');
});

// =========================================================================
// 3. GENERATE SITEMAP.XML (53 INDEXABLE URLS)
// =========================================================================
const coreUrls = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/landmarks.html`, changefreq: 'weekly', priority: '0.95' },
  { loc: `${SITE_URL}/rules.html`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/download.html`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/play/`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE_URL}/privacy.html`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/terms.html`, changefreq: 'monthly', priority: '0.5' },
];

const regionUrls = Object.values(REGIONS).map((r) => ({
  loc: `${SITE_URL}/landmarks/${r.slug}.html`,
  changefreq: 'weekly',
  priority: '0.85',
}));

const landmarkUrls = LANDMARKS.map((lm) => ({
  loc: `${SITE_URL}/landmarks/${lm.slug}.html`,
  changefreq: 'monthly',
  priority: '0.8',
}));

const allUrls = [...coreUrls, ...regionUrls, ...landmarkUrls];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(WEB_ROOT, 'sitemap.xml'), sitemapXml, 'utf8');

// =========================================================================
// 4. SYNC LANDMARKS.HTML (42 DETAIL LINKS + 4 REGION HUB LINKS + JSON-LD + OG)
// =========================================================================
const landmarksHtmlPath = path.join(WEB_ROOT, 'landmarks.html');
let landmarksHtml = fs.readFileSync(landmarksHtmlPath, 'utf8');

// 4a. Upgrade OG & Twitter image to 1200x628 banner
landmarksHtml = landmarksHtml
  .replace(
    /<meta property="og:image" content="https:\/\/flytotheend\.t4vn\.com\/assets\/images\/icon-512\.png">\s*<meta property="og:image:width" content="512">\s*<meta property="og:image:height" content="512">/,
    `<meta property="og:image" content="${SITE_URL}/assets/images/og-banner-1200x628.png">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="628">`
  )
  .replace(
    /<meta name="twitter:image" content="https:\/\/flytotheend\.t4vn\.com\/assets\/images\/icon-512\.png">/,
    `<meta name="twitter:image" content="${SITE_URL}/assets/images/og-banner-1200x628.png">`
  );

// 4b. Replace JSON-LD with full 63-item ItemList pointing to individual URLs
const hubJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/landmarks.html#webpage`,
      url: `${SITE_URL}/landmarks.html`,
      name: `${TOTAL_LANDMARKS} Di Tích Lịch Sử & Danh Thắng Việt Nam 3D - Fly to The End`,
      description:
        `Bộ sưu tập ${TOTAL_LANDMARKS} mô hình 3D Low-poly các di tích lịch sử, chiến tích cách mạng, di sản UNESCO và danh thắng Việt Nam xuyên suốt Bắc - Trung - Tây Nguyên - Nam & Biển Đảo trong Fly to The End.`,
      inLanguage: 'vi-VN',
      dateModified: LAST_MOD,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: `${TOTAL_LANDMARKS} Di tích Việt Nam 3D`, item: `${SITE_URL}/landmarks.html` },
      ],
    },
    {
      '@type': 'ItemList',
      name: `Hành trình ${TOTAL_LANDMARKS} Di tích Lịch sử & Danh thắng Việt Nam 3D`,
      description: `Danh sách ${TOTAL_LANDMARKS} mô hình di tích lịch sử, chiến tích & danh thắng Việt Nam 3D có trang chi tiết xoay 360° riêng trong Fly to The End`,
      numberOfItems: LANDMARKS.length,
      itemListElement: LANDMARKS.map((lm, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${lm.name} (${lm.location})`,
        url: `${SITE_URL}/landmarks/${lm.slug}.html`,
      })),
    },
  ],
};

landmarksHtml = landmarksHtml.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n${safeJsonLd(hubJsonLd)}\n  </script>`
);

// 4c. Unify .region-tabs into a single crawlable navigation bar & remove any duplicate .region-hub-bar
const unifiedRegionTabsHtml = `        <!-- Region Filter Tabs (Unified SEO Navigation) -->
        <nav class="region-tabs" aria-label="Chọn vùng miền di tích">
          <a href="landmarks.html" class="region-tab active" aria-current="page">
            Tất Cả <span class="tab-count">${LANDMARKS.length}</span>
          </a>
          ${Object.values(REGIONS)
            .map((r) => {
              const cnt = LANDMARKS.filter((l) => l.region === r.key).length;
              return `<a href="landmarks/${r.slug}.html" class="region-tab">
            ${escHtml(r.name)} <span class="tab-count">${cnt}</span>
          </a>`;
            })
            .join('\n          ')}
        </nav>`;

landmarksHtml = landmarksHtml
  .replace(/\s*<!-- SEO Crawlable Regional Hub Links -->[\s\S]*?<\/nav>\s*/g, '\n\n        ')
  .replace(
    /<!-- Region Filter Tabs[\s\S]*?(<\/div>|<\/nav>)/,
    unifiedRegionTabsHtml.trim()
  );

// 4d. Rebuild all 42 landmark cards inside #landmarksGrid with direct crawlable links
const cardsHtml = LANDMARKS.map((lm) => {
  const region = REGIONS[lm.region];
  const regionShort = region.shortLabel || region.name;
  const tagClass = lm.isUnesco ? 'landmark-tag tag-unesco' : 'landmark-tag';
  return `          <article class="landmark-card" data-region="${lm.region}">
            <div class="landmark-preview" data-landmark-id="${lm.id}" role="button" tabindex="0" aria-label="Xem mô hình 3D ${escHtml(lm.name)}">
              <canvas class="landmark-thumb" width="520" height="325"></canvas>
              <span class="landmark-3d-pill">${escHtml(lm.pill)}</span>
            </div>
            <div class="landmark-card-body">
              <div class="landmark-card-head">
                <span class="landmark-num">#${pad2(lm.order)}</span>
                <a href="landmarks/${region.slug}.html" class="landmark-region ${region.badgeClass}">${escHtml(regionShort)}</a>
              </div>
              <h3 class="landmark-name"><a href="landmarks/${lm.slug}.html" class="landmark-name-link">${escHtml(lm.name)}</a></h3>
              <p class="landmark-loc">📍 ${escHtml(lm.location)}</p>
              <p class="landmark-desc">${escHtml(lm.shortDesc)}</p>
              <div class="landmark-card-footer">
                <span class="${tagClass}">${escHtml(lm.tag)}</span>
                <a href="landmarks/${lm.slug}.html" class="landmark-detail-link">Chi tiết 3D →</a>
              </div>
            </div>
          </article>`;
}).join('\n\n');

landmarksHtml = landmarksHtml.replace(
  /(<div class="landmarks-grid" id="landmarksGrid">)[\s\S]*?(\n\s*<\/div>\s*\n\s*<div class="landmarks-cta">)/,
  `$1\n${cardsHtml}$2`
);

fs.writeFileSync(landmarksHtmlPath, landmarksHtml, 'utf8');

console.log(`Generated ${LANDMARKS.length} landmark pages, ${Object.keys(REGIONS).length} regional hub pages, synced landmarks.html, and updated sitemap.xml (${allUrls.length} URLs).`);
