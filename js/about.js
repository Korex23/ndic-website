// ══════════════════════════════════════════════════════
// STATS COUNTER — IntersectionObserver + rAF ease-out
// ══════════════════════════════════════════════════════
(function () {
  const section = document.getElementById('stats-section');
  if (!section) return;
  let animated = false;

  new IntersectionObserver(function (entries, obs) {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      obs.disconnect();
      var els      = section.querySelectorAll('.stat-number');
      var duration = 1800;
      var start    = performance.now();

      function tick(now) {
        var elapsed  = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);
        els.forEach(function (el) {
          var target = parseInt(el.dataset.target, 10);
          el.textContent = (el.dataset.prefix || '') + Math.round(eased * target) + (el.dataset.suffix || '');
        });
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.4 }).observe(section);
})();


// ══════════════════════════════════════════════════════
// GALLERY — sticky wrapper → horizontal translateX
// ══════════════════════════════════════════════════════
(function () {
  var wrapper  = document.getElementById('gallery-sticky-wrapper');
  var track    = document.getElementById('gallery-track');
  var progBar  = document.getElementById('gallery-progress');
  var counter  = document.getElementById('gallery-counter');
  if (!wrapper || !track) return;

  var CARD_W     = 300;
  var GAP        = 16;
  var SIDE_PAD   = 48;
  var totalCards = track.querySelectorAll('.gallery-card').length;
  var maxT       = 0;

  function setup() {
    maxT = (totalCards * (CARD_W + GAP)) - window.innerWidth + (SIDE_PAD * 2);
    if (maxT < 0) maxT = 0;
    wrapper.style.height = (maxT + window.innerHeight) + 'px';
  }

  setup();
  window.addEventListener('resize', setup);

  window.addEventListener('scroll', function () {
    var rect      = wrapper.getBoundingClientRect();
    var scrolled  = -rect.top;
    var range     = wrapper.offsetHeight - window.innerHeight;
    var p         = range > 0 ? Math.max(0, Math.min(1, scrolled / range)) : 0;

    track.style.transform = 'translateX(-' + (p * maxT) + 'px)';
    progBar.style.width   = (p * 100) + '%';

    var idx = Math.min(Math.floor(p * totalCards), totalCards - 1);
    counter.textContent   = (Math.max(0, idx) + 1) + ' / ' + totalCards;
  }, { passive: true });
})();


// ══════════════════════════════════════════════════════
// HISTORY — sticky wrapper → opacity class swap
// ══════════════════════════════════════════════════════
(function () {
  var wrapper = document.getElementById('history-sticky-wrapper');
  var slides  = Array.from(document.querySelectorAll('.history-slide'));
  if (!wrapper || !slides.length) return;

  var PER_SLIDE = 600;
  wrapper.style.height = (slides.length * PER_SLIDE + window.innerHeight) + 'px';

  var current = 0;

  window.addEventListener('scroll', function () {
    var rect     = wrapper.getBoundingClientRect();
    var scrolled = -rect.top;
    var idx      = Math.max(0, Math.min(slides.length - 1, Math.floor(scrolled / PER_SLIDE)));

    if (idx !== current) {
      slides[current].classList.remove('active');
      slides[idx].classList.add('active');
      current = idx;
    }
  }, { passive: true });
})();
