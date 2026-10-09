/* ============================================================
   Interactions (no dependencies, plain vanilla JS)
   Principle: progressive enhancement — if this script fails to
   load, the page content stays fully visible.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Auto-update the footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Show the header divider once scrolled ---------- */
  var header = document.querySelector('.site-header');

  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* ---------- Does the user prefer reduced motion? ---------- */
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll reveal ---------- */
  // Key point: .reveal is only added here. Without JS the elements are
  // never hidden, so the content can never disappear.
  if (!prefersReduced && 'IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll('.section');

    Array.prototype.forEach.call(revealTargets, function (el) {
      el.classList.add('reveal');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    Array.prototype.forEach.call(revealTargets, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Highlight the active nav section ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );

  if (navLinks.length && 'IntersectionObserver' in window) {
    var sectionsById = {};

    navLinks.forEach(function (link) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var section = document.querySelector(id);
      if (section) sectionsById[section.id] = section;
    });

    var tracked = Object.keys(sectionsById).map(function (k) {
      return sectionsById[k];
    });

    if (tracked.length) {
      var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var activeId = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === activeId
            );
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

      tracked.forEach(function (section) {
        navObserver.observe(section);
      });
    }
  }

  /* ---------- Clear the nav highlight back at the top ---------- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
        });
      });
    }, { threshold: 0.4 });

    heroObserver.observe(hero);
  }
})();
