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
    mobileBtn.addEventListener('click', function () {
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

  // Track Store Link Clicks
  const storeButtons = document.querySelectorAll('.store-btn');
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
});
