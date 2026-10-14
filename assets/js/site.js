(function () {
  var ICON = {
    left: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('site-nav');
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Reading progress (works for whichever view is visible) */
  function updateProgress() {
    [].forEach.call(document.querySelectorAll('.progress span'), function (bar) {
      var v = bar.closest('.view');
      if (v && v.hidden) return;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + '%';
    });
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  /* Carousels: native scroll-snap (swipe on touch), arrows, dots, counter, keyboard */
  function initCarousel(root) {
    if (root.__ready) return;
    root.__ready = true;
    var track = root.querySelector('[data-track]');
    var slides = [].slice.call(track.children);
    var prev = root.querySelector('[data-dir="-1"]');
    var next = root.querySelector('[data-dir="1"]');
    var dots = root.querySelector('[data-dots]');
    var count = root.querySelector('[data-count]');
    var n = slides.length;
    var info = { step: 1, per: 1, pages: 1 };

    function measure() {
      if (!track.clientWidth || !slides[0]) return false;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var w = slides[0].getBoundingClientRect().width;
      info.step = w + gap;
      info.per = Math.max(1, Math.floor((track.clientWidth + gap) / info.step + 0.02));
      info.pages = Math.max(1, Math.ceil(n / info.per));
      return true;
    }
    function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 3; }
    function buildDots() {
      dots.innerHTML = '';
      if (info.pages < 2) return;
      for (var i = 0; i < info.pages; i++) {
        (function (i) {
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'dot';
          b.setAttribute('aria-label', 'Show page ' + (i + 1) + ' of ' + info.pages);
          b.addEventListener('click', function () { track.scrollTo({ left: i * info.per * info.step }); });
          dots.appendChild(b);
        })(i);
      }
    }
    function update() {
      if (!measure()) return;
      if (dots.children.length !== info.pages && !(info.pages < 2 && !dots.children.length)) buildDots();
      var start = Math.round(track.scrollLeft / info.step) + 1;
      var page = Math.round(track.scrollLeft / (info.per * info.step));
      if (atEnd()) { page = info.pages - 1; start = Math.max(1, n - info.per + 1); }
      var end = Math.min(n, start + info.per - 1);
      count.textContent = n <= info.per ? (n + (n === 1 ? ' writing' : ' writings')) : (start + '\u2013' + end + ' of ' + n);
      [].forEach.call(dots.children, function (d, i) { d.setAttribute('aria-current', i === page ? 'true' : 'false'); });
      var atStart = track.scrollLeft <= 2;
      prev.setAttribute('aria-disabled', atStart ? 'true' : 'false');
      next.setAttribute('aria-disabled', atEnd() ? 'true' : 'false');
      root.querySelector('.carousel-arrows').style.visibility = n <= info.per ? 'hidden' : 'visible';
    }
    function go(dir) {
      measure();
      track.scrollBy({ left: dir * info.per * info.step });
    }
    prev.innerHTML = ICON.left; next.innerHTML = ICON.right;
    prev.addEventListener('click', function () { if (prev.getAttribute('aria-disabled') !== 'true') go(-1); });
    next.addEventListener('click', function () { if (next.getAttribute('aria-disabled') !== 'true') go(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    var raf;
    track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(function () { update(); }).observe(track);
    window.addEventListener('resize', update);
    update();
  }

  /* Archive: search + language filter + pagination (4 per row, 2 rows) */
  function initArchive(root) {
    if (root.__ready) return;
    root.__ready = true;
    var grid = root.querySelector('[data-archive-grid]');
    var cards = [].slice.call(grid.querySelectorAll('.card'));
    var input = root.querySelector('[data-search-input]');
    var chips = [].slice.call(root.querySelectorAll('[data-lang-filter]'));
    var pager = root.querySelector('[data-pagination]');
    var summary = root.querySelector('[data-summary]');
    var none = root.querySelector('[data-nomatch]');
    var state = { q: '', lang: 'all', page: 1 };

    function perPage() {
      var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length || 1;
      return cols === 1 ? 4 : cols * 2;
    }
    function render(scroll) {
      var pp = perPage();
      var match = cards.filter(function (c) {
        return (state.lang === 'all' || c.getAttribute('data-lang') === state.lang) &&
               (!state.q || (c.getAttribute('data-search') || '').indexOf(state.q) > -1);
      });
      var pages = Math.max(1, Math.ceil(match.length / pp));
      if (state.page > pages) state.page = pages;
      var from = (state.page - 1) * pp, to = from + pp;
      cards.forEach(function (c) { c.hidden = true; });
      match.forEach(function (c, i) { c.hidden = !(i >= from && i < to); });
      summary.textContent = match.length === 0 ? '0 writings' :
        'Showing ' + (from + 1) + '\u2013' + Math.min(to, match.length) + ' of ' + match.length + (match.length === 1 ? ' writing' : ' writings');
      none.hidden = match.length !== 0;
      buildPager(pages);
      if (scroll) { var top = root.getBoundingClientRect().top + window.pageYOffset - 16; window.scrollTo({ top: top, behavior: 'smooth' }); }
    }
    function pbtn(label, page, opts) {
      var b = document.createElement('button');
      b.type = 'button'; b.innerHTML = label; opts = opts || {};
      if (opts.aria) b.setAttribute('aria-label', opts.aria);
      if (opts.disabled) b.disabled = true;
      if (opts.current) b.setAttribute('aria-current', 'page');
      b.addEventListener('click', function () { state.page = page; render(true); });
      return b;
    }
    function buildPager(pages) {
      pager.innerHTML = '';
      if (pages < 2) return;
      pager.appendChild(pbtn(ICON.left, state.page - 1, { aria: 'Previous page', disabled: state.page === 1 }));
      var shown = [];
      for (var i = 1; i <= pages; i++) if (i === 1 || i === pages || Math.abs(i - state.page) <= 1) shown.push(i);
      var last = 0;
      shown.forEach(function (i) {
        if (last && i - last > 1) { var s = document.createElement('span'); s.className = 'gap'; s.textContent = '\u2026'; pager.appendChild(s); }
        pager.appendChild(pbtn(String(i), i, { current: i === state.page, aria: 'Page ' + i }));
        last = i;
      });
      pager.appendChild(pbtn(ICON.right, state.page + 1, { aria: 'Next page', disabled: state.page === pages }));
    }
    input.addEventListener('input', function () { state.q = input.value.toLowerCase().trim(); state.page = 1; render(false); });
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        state.lang = b.getAttribute('data-lang-filter'); state.page = 1;
        chips.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        render(false);
      });
    });
    var lastCols = 0;
    function onResize() { var c = getComputedStyle(grid).gridTemplateColumns; if (c !== lastCols) { lastCols = c; render(false); } }
    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(grid);
    window.addEventListener('resize', onResize);
    render(false);
  }

  function refresh(scope) {
    scope = scope || document;
    [].forEach.call(scope.querySelectorAll('[data-carousel]'), initCarousel);
    [].forEach.call(scope.querySelectorAll('[data-archive]'), initArchive);
    updateProgress();
  }
  window.LevUI = { refresh: refresh };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { refresh(); });
  else refresh();
})();
