/**
 * 航通社极简 JS v5
 * 三态主题 / 年份存档 / Featured轮播 / 翻页 / 搜索
 */
(function() {
  'use strict';

  var PAGE_SIZE = 10;
  var currentPage = 1;
  var allPosts = [];
  var displayedPosts = [];

  /* ===== 工具 ===== */
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function createCard(post) {
    var el = document.createElement('article');
    el.className = 'post-card';
    el.dataset.year = post.y;
    el.dataset.month = post.m;
    el.dataset.tags = post.g || '';
    el.dataset.title = (post.t || '').toLowerCase();
    el.dataset.excerpt = (post.e || '').toLowerCase();
    var imgSrc = post.i ? 'https://images.weserv.nl/?url=' + encodeURIComponent(post.i) + '&w=400&h=200&output=jpg&q=80&fit=cover' : '';
    var h = '<a href="' + post.u + '" class="post-card-link">';
    if (imgSrc) h += '<div class="post-card-thumb"><img src="' + imgSrc + '" alt="' + esc(post.t) + '" loading="lazy"></div>';
    h += '<div class="post-card-body"><div class="post-card-meta"><span class="post-card-date">' + esc(post.d) + '</span>';
    if (post.g) post.g.split(',').slice(0, 3).forEach(function(t) { t = t.trim(); if (t) h += '<span class="post-tag">#' + esc(t) + '</span>'; });
    h += '</div><h2 class="post-card-title">' + esc(post.t) + '</h2>';
    if (post.e) h += '<p class="post-card-excerpt">' + esc(post.e) + '</p>';
    h += '</div></a>';
    el.innerHTML = h;
    return el;
  }

  /* ===== 三态主题（浅色 / 跟随系统 / 深色） ===== */
  function initTheme() {
    var saved = localStorage.getItem('theme') || 'system';
    applyTheme(saved);
    document.querySelectorAll('.theme-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var t = this.dataset.theme;
        localStorage.setItem('theme', t);
        applyTheme(t);
      });
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      if ((localStorage.getItem('theme') || 'system') === 'system') applyTheme('system');
    });
  }

  function applyTheme(preference) {
    var actual = preference === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : preference;
    document.documentElement.setAttribute('data-theme', actual);
    var f = document.querySelector('iframe.giscus-frame');
    if (f) f.contentWindow.postMessage({ giscus: { setConfig: { theme: actual === 'dark' ? 'dark' : 'light' } } }, 'https://giscus.app');
    document.querySelectorAll('.theme-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.theme === preference); });
  }

  /* ===== 年份存档选择器 ===== */
  function initArchive() {
    var el = document.getElementById('calendarWidget');
    if (!el || !window.__YD__) return;
    var now = new Date();
    var state = { base: Math.floor(now.getFullYear() / 12) * 12 };
    var params = new URLSearchParams(window.location.search);
    if (params.get('year')) state.base = Math.floor(parseInt(params.get('year')) / 12) * 12;

    function render() {
      var h = '<div class="cal-header"><button class="cal-nav" data-a="prev">&lsaquo;</button><span class="cal-title">' + state.base + ' - ' + (state.base + 11) + '</span><button class="cal-nav" data-a="next">&rsaquo;</button></div><div class="cal-grid cal-ys">';
      for (var y = state.base; y < state.base + 12; y++) {
        var c = 'cal-yr';
        if (y === now.getFullYear()) c += ' cal-cur';
        var count = window.__YD__[y] || 0;
        h += '<span class="' + c + '" data-y="' + y + '">' + y + '<span class="cal-yr-count">' + count + ' 篇</span></span>';
      }
      h += '</div>';
      el.innerHTML = h;
    }

    el.addEventListener('click', function(e) {
      var t = e.target, a = t.dataset.a;
      if (a === 'prev') { state.base -= 12; render(); return; }
      if (a === 'next') { state.base += 12; render(); return; }
      if (t.dataset.y !== undefined) {
        window.location.href = '/?year=' + parseInt(t.dataset.y);
      }
    });
    render();
  }

  /* ===== Featured 轮播 ===== */
  function initFeatured() {
    var slides = document.querySelectorAll('.featured-slide');
    var dots = document.querySelectorAll('.featured-dot');
    if (slides.length <= 1) return;
    var current = 0;
    var timer;

    function show(idx) {
      current = idx;
      slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
    }

    function next() { show((current + 1) % slides.length); }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        show(parseInt(this.dataset.idx));
        clearInterval(timer); timer = setInterval(next, 5000);
      });
    });

    // 自动轮播
    timer = setInterval(next, 5000);
    // 鼠标悬停暂停
    var carousel = document.getElementById('featuredCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', function() { clearInterval(timer); });
      carousel.addEventListener('mouseleave', function() { timer = setInterval(next, 5000); });
    }
  }

  /* ===== 移动端侧边栏 ===== */
  function initMobileMenu() {
    var btn = document.getElementById('hamburgerButton');
    var overlay = document.getElementById('sidebarOverlay');
    var sidebar = document.getElementById('site-sidebar');
    if (!btn) return;
    function open() { if (sidebar) sidebar.classList.add('open'); if (overlay) overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function close() { if (sidebar) sidebar.classList.remove('open'); if (overlay) overlay.classList.remove('active'); document.body.style.overflow = ''; }
    btn.addEventListener('click', function() { sidebar.classList.contains('open') ? close() : open(); });
    if (overlay) overlay.addEventListener('click', close);
    if (sidebar) sidebar.addEventListener('click', function(e) { if (e.target.tagName === 'A') close(); });
  }

  /* ===== 回到顶部 ===== */
  function initScrollToTop() {
    var btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', function() { btn.classList.toggle('show', window.scrollY > window.innerHeight); }, { passive: true });
    btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ===== 复制链接 ===== */
  function initCopyLink() {
    var btn = document.getElementById('copyLinkBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href).then(function() {
        btn.title = '\u5df2\u590d\u5236\uff01';
        setTimeout(function() { btn.title = '\u590d\u5236\u94fe\u63a5'; }, 1500);
      });
    });
  }

  /* ===== 微信分享二维码 ===== */
  function initWechatShare() {
    var btn = document.getElementById('wechatShareBtn');
    var overlay = document.getElementById('wechatQrOverlay');
    var closeBtn = document.getElementById('wechatQrClose');
    var qrDiv = document.getElementById('wechatQrCode');
    if (!btn || !overlay || !qrDiv) return;

    function show() {
      var url = window.location.href;
      // 使用 Google Chart API 生成二维码（无需外部依赖）
      qrDiv.innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(url) + '" alt="QR Code" loading="lazy">';
      overlay.classList.add('active');
    }
    function hide() { overlay.classList.remove('active'); }

    btn.addEventListener('click', show);
    if (closeBtn) closeBtn.addEventListener('click', hide);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) hide(); });
  }

  /* ===== 搜索 ===== */
  function initSearch() {
    var form = document.querySelector('.search-form');
    var input = document.getElementById('searchInput');
    if (!form || !input) return;
    document.querySelectorAll('input[name="engine"]').forEach(function(r) {
      r.addEventListener('change', function() {
        var v = document.querySelector('input[name="engine"]:checked').value;
        input.placeholder = v === 'google' ? '\u7528 Google \u641c\u7d22...' : v === 'baidu' ? '\u7528\u767e\u5ea6\u641c\u7d22...' : '\u641c\u7d22\u6587\u7ae0...';
      });
    });
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var q = input.value.trim(); if (!q) return;
      var v = document.querySelector('input[name="engine"]:checked');
      var eng = v ? v.value : 'internal';
      if (eng === 'google') window.open('https://www.google.com/search?q=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
      else if (eng === 'baidu') window.open('https://www.baidu.com/s?wd=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
      else window.location.href = '/?search=' + encodeURIComponent(q);
    });
  }

  /* ===== 翻页 + 预建索引过滤 ===== */
  function initPagination() {
    allPosts = window.__POSTS__ || [];
    var container = document.getElementById('postsContainer');
    var loadingHint = document.getElementById('loadingHint');
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    var tag = params.get('tag'), year = params.get('year'), search = params.get('search');
    if (!allPosts.length) return;

    if (tag || year || search) {
      setTimeout(function() {
        displayedPosts = [];
        if (tag && window.__TI__ && window.__TI__[tag]) displayedPosts = window.__TI__[tag].map(function(i) { return allPosts[i]; });
        else if (year && window.__YI__ && window.__YI__[year]) displayedPosts = window.__YI__[year].map(function(i) { return allPosts[i]; });
        else if (search) {
          var q = search.toLowerCase();
          displayedPosts = allPosts.filter(function(p) { return p.t.toLowerCase().indexOf(q) !== -1 || p.e.toLowerCase().indexOf(q) !== -1; });
        }
        currentPage = 1;
        container.style.display = '';
        container.innerHTML = '';
        if (loadingHint) loadingHint.style.display = 'none';
        renderPage();
      }, 30);
      return;
    }

    displayedPosts = allPosts;
    currentPage = 1;
    renderPageButtons(document.getElementById('pagination'), allPosts.length, 1);
  }

  function renderPage() {
    var container = document.getElementById('postsContainer');
    var paginationEl = document.getElementById('pagination');
    var filterHeader = document.getElementById('filterHeader');
    var filterTitle = document.getElementById('filterTitle');
    var noResults = document.getElementById('noResults');
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    var tag = params.get('tag'), year = params.get('year'), search = params.get('search');

    if (filterHeader && filterTitle) {
      if (tag) { filterTitle.textContent = '\u6807\u7b7e\uff1a' + tag; filterHeader.style.display = ''; }
      else if (year) { filterTitle.textContent = year + '\u5e74\u6587\u7ae0'; filterHeader.style.display = ''; }
      else if (search) { filterTitle.textContent = '\u641c\u7d22\uff1a' + search; filterHeader.style.display = ''; }
      else { filterHeader.style.display = 'none'; }
    }

    if (tag) document.title = '\u6807\u7b7e\uff1a' + tag + ' - \u822a\u901a\u793e';
    else if (year) document.title = year + '\u5e74\u6587\u7ae0 - \u822a\u901a\u793e';
    else if (search) document.title = '\u641c\u7d22\uff1a' + search + ' - \u822a\u901a\u793e';
    else document.title = '\u822a\u901a\u793e | \u4f60\u5e94\u8be5\u77e5\u9053\u7684\u5386\u53f2\u3001\u73b0\u5728\u548c\u672a\u6765';

    document.querySelectorAll('.tag-btn').forEach(function(b) { b.classList.toggle('active', tag && b.textContent === tag); });

    var total = displayedPosts.length;
    container.innerHTML = '';
    if (total === 0) {
      if (noResults) { noResults.textContent = '\u6ca1\u6709\u627e\u5230\u5339\u914d\u7684\u6587\u7ae0'; noResults.style.display = 'block'; }
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }
    if (noResults) noResults.style.display = 'none';

    var start = (currentPage - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, total);
    for (var i = start; i < end; i++) container.appendChild(createCard(displayedPosts[i]));
    renderPageButtons(paginationEl, total, currentPage);
  }

  function renderPageButtons(el, total, current) {
    if (!el) return;
    var tp = Math.ceil(total / PAGE_SIZE);
    if (tp <= 1) { el.innerHTML = ''; return; }
    var h = '';
    h += current > 1 ? '<a href="#" class="pagination-btn" data-page="' + (current - 1) + '">\u2190 \u4e0a\u4e00\u9875</a>' : '<span class="pagination-btn pagination-disabled">\u2190 \u4e0a\u4e00\u9875</span>';
    var s = Math.max(1, current - 2), e = Math.min(tp, current + 2);
    if (s > 1) { h += '<a href="#" class="pagination-btn" data-page="1">1</a>'; if (s > 2) h += '<span class="pagination-ellipsis">\u2026</span>'; }
    for (var i = s; i <= e; i++) h += i === current ? '<span class="pagination-btn pagination-current">' + i + '</span>' : '<a href="#" class="pagination-btn" data-page="' + i + '">' + i + '</a>';
    if (e < tp) { if (e < tp - 1) h += '<span class="pagination-ellipsis">\u2026</span>'; h += '<a href="#" class="pagination-btn" data-page="' + tp + '">' + tp + '</a>'; }
    h += current < tp ? '<a href="#" class="pagination-btn" data-page="' + (current + 1) + '">\u4e0b\u4e00\u9875 \u2192</a>' : '<span class="pagination-btn pagination-disabled">\u4e0b\u4e00\u9875 \u2192</span>';
    el.innerHTML = h;
    el.querySelectorAll('a[data-page]').forEach(function(btn) {
      btn.addEventListener('click', function(ev) { ev.preventDefault(); currentPage = parseInt(this.dataset.page); renderPage(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    });
  }

  /* ===== 原图切换 ===== */
  function initImageToggle() {
    var toggle = document.getElementById('originalImageToggle');
    if (!toggle) return;
    if (localStorage.getItem('useOriginalImage') === 'true') toggle.checked = true;
    function process() {
      var article = document.querySelector('.article-content');
      var featImg = document.querySelector('.article-featured-image img');
      var orig = toggle.checked;
      if (article) article.querySelectorAll('img').forEach(function(img) {
        var src = img.getAttribute('data-original') || img.src;
        if (!img.getAttribute('data-original')) img.setAttribute('data-original', src);
        if (orig) img.src = src;
        else if (!img.src.includes('weserv.nl')) img.src = 'https://images.weserv.nl/?url=' + encodeURIComponent(src) + '&output=jpg&q=80';
      });
      if (featImg) { var o = featImg.getAttribute('data-original'); if (o) featImg.src = orig ? o : 'https://images.weserv.nl/?url=' + encodeURIComponent(o) + '&output=jpg&q=80'; }
    }
    process();
    toggle.addEventListener('change', function() { localStorage.setItem('useOriginalImage', toggle.checked); process(); });
  }

  /* ===== Logo 宽高比检测 ===== */
  function initLogo() {
    var logo = document.querySelector('.site-logo img');
    var brand = document.getElementById('brandText');
    if (!logo || !brand) return;
    function check() {
      var w = logo.naturalWidth, h = logo.naturalHeight;
      if (w && h) {
        if (w / h > 1.5) brand.classList.add('hidden');
      }
    }
    if (logo.complete && logo.naturalWidth) check();
    else logo.addEventListener('load', check);
  }

  /* ===== 初始化 ===== */
  document.addEventListener('DOMContentLoaded', function() {
    initLogo();
    initTheme(); initMobileMenu(); initScrollToTop();
    initCopyLink(); initSearch(); initImageToggle();
    initArchive(); initFeatured(); initWechatShare();
    initPagination();
  });
})();
