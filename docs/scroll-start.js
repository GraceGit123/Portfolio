/* Start fresh visits/reloads at the top, before browser scroll restoration. */
(function () {
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  var interacted = false;
  function markInteraction() { interacted = true; }
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (type) {
    window.addEventListener(type, markInteraction, { passive: true });
  });
  function top() {
    if (interacted) return;
    var root = document.documentElement;
    var previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }
  function settle() {
    top();
    window.requestAnimationFrame(function () { top(); window.requestAnimationFrame(top); });
  }
  window.addEventListener('pageshow', function () { interacted = false; settle(); });
  window.addEventListener('load', settle);
  document.addEventListener('DOMContentLoaded', settle);
  window.addEventListener('portfolio:ready', settle);
  settle();
})();
