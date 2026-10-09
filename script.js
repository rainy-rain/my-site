/* ============================================================
   交互脚本（无依赖，纯原生）
   设计原则：渐进增强 —— 脚本没加载成功时，页面内容照常完整可见。
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 页脚年份自动更新 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- 顶栏滚动后显示分割线 ---------- */
  var header = document.querySelector('.site-header');

  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* ---------- 用户是否希望减少动效 ---------- */
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 滚动淡入 ---------- */
  // 关键：.reveal 只在这里添加。若 JS 不可用，元素永远不会隐藏。
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

  /* ---------- 导航当前区块高亮 ---------- */
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

  /* ---------- 回到顶部时清空导航高亮 ---------- */
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
