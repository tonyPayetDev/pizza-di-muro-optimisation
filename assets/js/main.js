/* Pizza Di Muro - Main JavaScript */

(function () {
  'use strict';

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileMenu && mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ===== SEARCH OVERLAY =====
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  searchOverlay && searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMenu();
    }
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  // ===== LAZY LOADING IMAGES =====
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById('newsletterForm');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (!email) return;
      const btn = newsletterForm.querySelector('button[type="submit"]');
      btn.textContent = 'Inscription en cours...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Inscrit !';
        showToast('Bienvenue ! Vous êtes bien inscrit à notre newsletter.');
        newsletterForm.reset();
        setTimeout(() => { btn.textContent = "S'abonner à la newsletter"; btn.disabled = false; }, 3000);
      }, 1200);
    });
  }

  // ===== STICKY HEADER SHADOW =====
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,0.12)'
        : '0 2px 8px rgba(0,0,0,0.08)';
    }
  }, { passive: true });

  // ===== SEARCH TAGS CLICK =====
  document.querySelectorAll('.search-tags a').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) {
        searchInput.value = tag.textContent;
        searchInput.focus();
      }
    });
  });

})();
