(function () {
  var nav = document.querySelector('.section-nav');
  if (!nav) return;

  var header = nav.closest('.masthead');
  function updateOffset() {
    document.documentElement.style.setProperty(
      '--section-nav-offset', (header.offsetHeight + 16) + 'px'
    );
  }
  updateOffset();
  window.addEventListener('resize', updateOffset);
  if (window.ResizeObserver) {
    new ResizeObserver(updateOffset).observe(header);
  }

  // Capture these clicks before the theme's fixed-offset smooth-scroll handler.
  nav.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey) return;

    var target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    updateOffset();
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
    if (window.location.hash !== link.hash) {
      window.history.pushState(null, '', link.hash);
    }
  }, true);
})();
