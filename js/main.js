/**
 * FLY TO THE END - Main Web Scripts
 * Handles Navigation, FAQ Accordions, Language Toggle & Analytics Hooks
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('show');
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove('show');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Region Filter Tabs for Vietnamese Landmarks (only for button-based tabs; <a> tabs navigate to dedicated SEO region pages)
  const regionTabs = document.querySelectorAll('button.region-tab');
  const landmarkCards = document.querySelectorAll('#landmarksGrid .landmark-card');
  if (regionTabs.length > 0 && landmarkCards.length > 0) {
    // Auto-update tab counts from actual DOM cards for future landmark additions
    regionTabs.forEach(tab => {
      const region = tab.dataset.region || 'all';
      const countEl = tab.querySelector('.tab-count');
      if (countEl) {
        const count = region === 'all'
          ? landmarkCards.length
          : Array.from(landmarkCards).filter(c => c.dataset.region === region).length;
        countEl.textContent = count;
      }
    });

    regionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedRegion = tab.dataset.region || 'all';

        regionTabs.forEach(t => {
          const isSelected = t === tab;
          t.classList.toggle('active', isSelected);
          t.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });

        landmarkCards.forEach(card => {
          const cardRegion = card.dataset.region;
          const shouldShow = selectedRegion === 'all' || cardRegion === selectedRegion;
          card.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
  }

  // Track Store Link Clicks
  const storeButtons = document.querySelectorAll('.store-btn:not(.store-btn--coming-soon), .footer-store-btn:not(.footer-store-btn--coming-soon)');
  storeButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const storeName = this.dataset.store || 'store';
      console.log(`[Store Download Click] ${storeName}`);
      // Google Analytics event hook if gtag exists
      if (typeof gtag === 'function') {
        gtag('event', 'click_download', {
          store_platform: storeName
        });
      }
    });
  });

  // 9:16 Gameplay Trailer Widgets (VI/EN switch, sound & play/pause controls)
  const trailerWidgets = document.querySelectorAll('[data-trailer-widget]');
  trailerWidgets.forEach(widget => {
    const video = widget.querySelector('video');
    const langBtns = widget.querySelectorAll('[data-video-lang]');
    const playBtn = widget.querySelector('[data-video-toggle-play]');
    const playLabel = widget.querySelector('[data-play-label]');
    const muteBtn = widget.querySelector('[data-video-toggle-mute]');
    const muteLabel = widget.querySelector('[data-mute-label]');
    if (!video) return;

    function syncControls() {
      if (playLabel) {
        playLabel.textContent = video.paused ? '▶ Phát' : '⏸ Tạm dừng';
      }
      if (muteLabel && muteBtn) {
        muteLabel.textContent = video.muted ? '🔇 Bật tiếng' : '🔊 Tắt tiếng';
        muteBtn.classList.toggle('is-unmuted', !video.muted);
      }
    }

    video.addEventListener('play', syncControls);
    video.addEventListener('pause', syncControls);
    video.addEventListener('volumechange', syncControls);

    video.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (!video.muted && video.paused) {
          video.play().catch(() => {});
        }
        syncControls();
      });
    }

    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newSrc = btn.getAttribute('data-src');
        const newPoster = btn.getAttribute('data-poster');
        if (!newSrc || video.getAttribute('src') === newSrc) return;

        const wasPaused = video.paused;
        const wasMuted = video.muted;
        const currentTime = video.currentTime || 0;

        langBtns.forEach(b => {
          const active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        if (newPoster) video.setAttribute('poster', newPoster);
        video.setAttribute('src', newSrc);
        video.load();
        video.muted = wasMuted;
        video.addEventListener('loadedmetadata', function onMeta() {
          video.removeEventListener('loadedmetadata', onMeta);
          if (currentTime > 0 && currentTime < video.duration) {
            video.currentTime = currentTime;
          }
          if (!wasPaused) {
            video.play().catch(() => {});
          }
          syncControls();
        });
      });
    });

    syncControls();
  });
});
