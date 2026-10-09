/* ============================================================
   Interactions (no dependencies, plain vanilla JS)

   The three panels are full-viewport and scroll-snapped. This
   script derives each panel's opacity and a small vertical
   drift from its distance to the viewport centre, so the
   outgoing panel dissolves exactly as the incoming one appears.

   Progressive enhancement: if this script never runs, every
   panel stays at full opacity and native scrolling still works.
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Auto-update the footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Elements ---------- */
  var header   = document.querySelector('.site-header');
  var slides   = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var dots     = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var panelNow   = document.getElementById('panel-now');
  var panelTotal = document.getElementById('panel-total');

  if (!slides.length) return;

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tuning ---------- */
  // Fade range as a fraction of the viewport height. At 1.0 the crossfade
  // is perfectly balanced: midway between two panels their opacities sum
  // to 1, so one dissolves exactly as fast as the other appears.
  var FADE_RANGE = 1.0;
  // Pixels of vertical drift applied to a panel that is a full fade away.
  var DRIFT = 24;

  /* ---------- Per-frame render ---------- */
  function render() {
    var vh     = window.innerHeight;
    var range  = vh * FADE_RANGE;
    var centre = vh / 2;

    var bestIndex = -1;
    var bestScore = -1;

    for (var i = 0; i < slides.length; i++) {
      var rect = slides[i].getBoundingClientRect();
      var slideCentre = rect.top + rect.height / 2;
      var delta = slideCentre - centre;          // > 0 means it sits below centre
      var p = 1 - Math.abs(delta) / range;       // 1 centred, 0 a full range away

      if (p < 0) p = 0;
      if (p > 1) p = 1;

      if (!prefersReduced) {
        // Drift pushes each panel the way it is already travelling.
        var drift = (1 - p) * DRIFT * (delta >= 0 ? 1 : -1);
        slides[i].style.opacity = p.toFixed(3);
        slides[i].style.transform = 'translateY(' + drift.toFixed(1) + 'px)';
      }

      if (p > bestScore) {
        bestScore = p;
        bestIndex = i;
      }
    }

    /* Highlight the panel closest to the centre, in both nav places. */
    if (bestIndex >= 0) {
      var activeId = '#' + slides[bestIndex].id;

      navLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === activeId);
      });

      dots.forEach(function (dot) {
        dot.classList.toggle(
          'is-active',
          dot.getAttribute('data-target') === activeId
        );
      });

      /* Panel counter, zero-padded to two digits */
      if (panelNow) {
        var n = bestIndex + 1;
        panelNow.textContent = n < 10 ? '0' + n : String(n);
      }
    }

    /* Header divider: only once the first panel has moved away. */
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  }

  /* ---------- Throttle to one render per animation frame ---------- */
  var ticking = false;

  function requestRender() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      render();
    });
  }

  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', requestRender);

  /* ---------- Indicator dots jump to their panel ---------- */
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = document.querySelector(dot.getAttribute('data-target'));
      if (!target) return;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Click-to-copy contact details ----------
     A mailto: link silently does nothing on a machine with no default mail
     app, and a phone number has no usable URL at all. So every tile marked
     with data-copy copies to the clipboard and says so. The default action
     is cancelled synchronously — cancelling it inside the async callback
     would be too late, the navigation would already have started. */
  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (el) {
    var hint = el.querySelector('.contact-hint');
    var idleText = hint ? hint.textContent : '';
    var timer = null;

    el.addEventListener('click', function (event) {
      var text = el.getAttribute('data-copy');
      if (!text) return;
      event.preventDefault();

      copyText(text).then(function (ok) {
        if (!ok) {
          // Nothing was copied — fall back to whatever the link was for.
          var href = el.getAttribute('href');
          if (href) { window.location.href = href; return; }
        }
        if (!hint) return;
        hint.textContent = ok ? 'Copied!' : 'Copy failed';
        el.classList.add('is-copied');
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          hint.textContent = idleText;
          el.classList.remove('is-copied');
        }, 1600);
      });
    });
  });

  /* ---------- The panel count is read from the DOM, never hand-typed ---------- */
  if (panelTotal) {
    var total = slides.length;
    panelTotal.textContent = total < 10 ? '0' + total : String(total);
  }

  /* ---------- Initial paint ---------- */
  render();
})();
