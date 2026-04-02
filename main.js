// main.js

/* ─── Active nav link ─────────────────────────────────────── */
// Marque le lien de navigation correspondant à la page courante
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) {
      link.classList.add('active');
    }
  });
})();

/* ─── Scroll fade-in ──────────────────────────────────────── */
// Ajoute la classe .visible aux éléments .fade-in quand ils entrent dans le viewport
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach(function (el) { observer.observe(el); });
})();
