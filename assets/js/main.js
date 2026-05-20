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
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
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
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 450);
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById('newsletterForm');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !isValidEmail(email)) {
        emailInput && emailInput.focus();
        showToast('Veuillez entrer une adresse email valide.');
        return;
      }

      const btn = newsletterForm.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = 'Inscription en cours…';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '&#10003; Inscrit avec succès !';
        showToast('Bienvenue ! Vous recevrez nos meilleures recettes dès demain.');
        newsletterForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }, 3500);
      }, 1200);
    });
  }

  // ===== STICKY HEADER =====
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.scrollY;
    if (currentScroll > 10) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== SEARCH TAGS =====
  document.querySelectorAll('.search-tags a').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) {
        searchInput.value = tag.textContent;
        searchInput.focus();
      }
    });
  });

  // ===== STAGGERED CARD ANIMATIONS =====
  document.querySelectorAll('.articles-grid').forEach(grid => {
    grid.querySelectorAll('[data-animate]').forEach((card, i) => {
      card.dataset.delay = i * 90;
    });
  });

})();
