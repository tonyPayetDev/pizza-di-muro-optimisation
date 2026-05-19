/* Pizza Di Muro — main.js */

(function () {
  'use strict';

  /* --- Mobile nav toggle --- */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Scroll reveal --- */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));

  /* --- Lazy images --- */
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading already set via attribute
  } else {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach((img) => imgObserver.observe(img));
  }

  /* --- Newsletter form --- */
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      if (!email) return;

      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Inscription en cours…';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Inscription confirmée !';
        btn.style.background = '#16a34a';
        form.querySelector('input[type="email"]').value = '';
        setTimeout(() => {
          btn.textContent = "S'abonner maintenant";
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
      nav?.classList.remove('open');
    });
  });

  /* --- Active nav link based on scroll --- */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');
  const headerH    = () => document.querySelector('.site-header')?.offsetHeight || 70;

  const setActive = () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - headerH() - 80;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  /* --- Sticky header shadow --- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,.3)'
        : '0 2px 12px rgba(0,0,0,.2)';
    }, { passive: true });
  }

})();
