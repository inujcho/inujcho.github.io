/**
 * Inu Cho — Site Scripts
 * Accessible Theme Switcher & Origami Plate Modal
 */

(function () {
  'use strict';

  // --- Theme Toggle ---
  function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    function getEffectiveTheme() {
      const explicit = document.documentElement.getAttribute('data-theme');
      if (explicit === 'dark' || explicit === 'light') return explicit;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    function updateButtonUI(theme) {
      const isDark = theme === 'dark';
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      toggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      const textSpan = toggleBtn.querySelector('.theme-toggle-text');
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light' : 'Dark';
      }
      // Keep the iOS Safari toolbar / status bar tint in sync with the page
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) {
        themeColor.setAttribute('content', isDark ? '#0D131A' : '#FAF8F5');
      }
    }

    // Set initial button state
    updateButtonUI(getEffectiveTheme());

    toggleBtn.addEventListener('click', function () {
      const current = getEffectiveTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('inu_theme', next);
      } catch (e) {}
      updateButtonUI(next);
    });

    // Listen to OS preference changes if no manual override is saved
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        try {
          if (!localStorage.getItem('inu_theme')) {
            updateButtonUI(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      });
    }
  }

  // --- Origami Plate Lightbox Dialog ---
  function initLightbox() {
    const dialog = document.getElementById('plate-lightbox');
    if (!dialog) return;

    const dialogImg = dialog.querySelector('.lightbox-img');
    const dialogTitle = dialog.querySelector('.lightbox-title');
    const dialogMeta = dialog.querySelector('.lightbox-meta');
    const closeBtn = dialog.querySelector('.lightbox-close');

    function openModal(src, title, meta) {
      if (dialogImg) {
        dialogImg.src = src;
        dialogImg.alt = title || 'Origami plate';
      }
      if (dialogTitle) dialogTitle.textContent = title || '';
      if (dialogMeta) dialogMeta.textContent = meta || '';
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.style.overflow = '';
      if (dialogImg) dialogImg.src = '';
    }

    document.querySelectorAll('[data-zoom-plate]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const src = btn.getAttribute('data-zoom-plate');
        const title = btn.getAttribute('data-plate-title');
        const meta = btn.getAttribute('data-plate-meta');
        openModal(src, title, meta);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        closeModal();
      }
    });

    dialog.addEventListener('cancel', function () {
      document.body.style.overflow = '';
      if (dialogImg) dialogImg.src = '';
    });
  }

  // --- Smooth Page Transitions ---
  function initPageTransitions() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('http') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

      // In browsers where native cross-document view transitions work with navigation, let CSS handle it
      if (window.CSS && CSS.supports && CSS.supports('view-transition-name', 'none') && window.navigation) {
        return;
      }

      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(function () {
        window.location.href = href;
      }, 140);
    });

    window.addEventListener('pageshow', function () {
      document.body.classList.remove('page-leaving');
    });
  }

  function initAll() {
    initTheme();
    initLightbox();
    initPageTransitions();
    if (window.ScrollCraft && typeof window.ScrollCraft.mount === 'function') {
      window.ScrollCraft.mount(document.body);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
