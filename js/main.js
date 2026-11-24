/**
 * FLY TO THE END - Main Web Scripts
 * Handles Navigation, FAQ Accordions, Analytics Hooks & Trailer Widgets
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Dynamic Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    function setMenuOpen(open) {
      navLinks.classList.toggle('show', open);
      mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileBtn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    }

    mobileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('show')) {
        setMenuOpen(false);
        mobileBtn.focus();
      }
    });
  }

  // FAQ Accordion with aria-expanded accessibility sync
  const faqItems = document.querySelectorAll('.faq-item');
  function syncFaqAria() {
    faqItems.forEach(function (item) {
      const btn = item.querySelector('.faq-question');
      if (btn) {
        btn.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
      }
    });
  }
  syncFaqAria();

  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        faqItems.forEach(function (other) {
          other.classList.remove('active');
        });
        if (!isActive) {
          item.classList.add('active');
        }
        syncFaqAria();
      });
    }
  });

  // Safe Smooth Scroll for same-page hash anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.getElementById(targetId.slice(1));
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Track Store Link Clicks (Google Analytics hook if gtag exists)
  const storeButtons = document.querySelectorAll(
    '.store-btn:not(.store-btn--coming-soon), .footer-store-btn:not(.footer-store-btn--coming-soon)'
  );
  storeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const storeName = this.dataset.store || 'store';
      if (typeof gtag === 'function') {
        gtag('event', 'click_download', {
          store_platform: storeName,
        });
      }
    });
  });

  // 9:16 Gameplay Trailer Widgets (viewport-aware playback, VI/EN switch, mutually exclusive audio)
  const trailerWidgets = document.querySelectorAll('[data-trailer-widget]');
  const allTrailerVideos = [];

  trailerWidgets.forEach(function (widget) {
    const video = widget.querySelector('video');
    const langBtns = widget.querySelectorAll('[data-video-lang]');
    const playBtn = widget.querySelector('[data-video-toggle-play]');
    const playLabel = widget.querySelector('[data-play-label]');
    const muteBtn = widget.querySelector('[data-video-toggle-mute]');
    const muteLabel = widget.querySelector('[data-mute-label]');
    if (!video) return;

    allTrailerVideos.push(video);
    let userPaused = false;
    let isInView = false;
    let pendingMetaHandler = null;

    function syncControls() {
      if (playLabel) {
        playLabel.textContent = video.paused ? '▶ Phát' : '⏸ Tạm dừng';
      }
      if (muteLabel && muteBtn) {
        muteLabel.textContent = video.muted ? '🔇 Bật tiếng' : '🔊 Tắt tiếng';
        muteBtn.classList.toggle('is-unmuted', !video.muted);
      }
    }

    function togglePlay() {
      if (video.paused) {
        userPaused = false;
        video.play().catch(function () {});
      } else {
        userPaused = true;
        video.pause();
      }
    }

    video.addEventListener('play', syncControls);
    video.addEventListener('pause', syncControls);
    video.addEventListener('volumechange', syncControls);
    video.addEventListener('click', togglePlay);

    if (playBtn) {
      playBtn.addEventListener('click', togglePlay);
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', function () {
        const nextMuted = !video.muted;
        if (!nextMuted) {
          // Ensure only one trailer plays sound at a time
          allTrailerVideos.forEach(function (other) {
            if (other !== video && !other.muted) {
              other.muted = true;
            }
          });
        }
        video.muted = nextMuted;
        if (!video.muted && video.paused) {
          userPaused = false;
          video.play().catch(function () {});
        }
        syncControls();
      });
    }

    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const newSrc = btn.getAttribute('data-src');
        const newPoster = btn.getAttribute('data-poster');
        if (!newSrc || video.getAttribute('src') === newSrc) return;

        const shouldPlay = !userPaused && isInView;
        const wasMuted = video.muted;
        const currentTime = video.currentTime || 0;

        langBtns.forEach(function (b) {
          const active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        if (pendingMetaHandler) {
          video.removeEventListener('loadedmetadata', pendingMetaHandler);
          pendingMetaHandler = null;
        }

        if (newPoster) video.setAttribute('poster', newPoster);
        video.setAttribute('src', newSrc);
        video.load();
        video.muted = wasMuted;

        pendingMetaHandler = function () {
          video.removeEventListener('loadedmetadata', pendingMetaHandler);
          pendingMetaHandler = null;
          if (currentTime > 0 && Number.isFinite(video.duration) && currentTime < video.duration) {
            video.currentTime = currentTime;
          }
          if (shouldPlay) {
            video.play().catch(function () {});
          }
          syncControls();
        };
        video.addEventListener('loadedmetadata', pendingMetaHandler);
      });
    });

    if (typeof IntersectionObserver === 'function') {
      const videoObserver = new IntersectionObserver(function (entries) {
        for (let i = 0; i < entries.length; i++) {
          isInView = entries[i].isIntersecting;
          if (isInView) {
            if (!userPaused) {
              video.play().catch(function () {});
            }
          } else if (!video.paused) {
            video.pause();
          }
        }
      }, { threshold: 0.25 });
      videoObserver.observe(widget);
    } else {
      isInView = true;
      video.play().catch(function () {});
    }

    syncControls();
  });
});
