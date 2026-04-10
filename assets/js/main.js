/**
 * 航通社极简 JS v4
 * 三态主题 / 日历控件 / 翻页 / 预建索引过滤 / 搜索引擎切换
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

  /* ===== 日历控件 ===== */
  function initCalendar() {
    var el = document.getElementById('calendarWidget');
    if (!el || !window.__CD__) return;
    var params = new URLSearchParams(window.location.search);
    var now = new Date();
    var state = { view: 'days', year: now.getFullYear(), month: now.getMonth() };
    if (params.get('year')) state.year = parseInt(params.get('year'));
    if (params.get('month')) { var mp = params.get('month').split('-'); state.year = parseInt(mp[0]); state.month = parseInt(mp[1]) - 1; }
    if (params.get('date')) { var dp = params.get('date').split('-'); state.year = parseInt(dp[0]); state.month = parseInt(dp[1]) - 1; }

    var MN = ['1\u6708','2\u6708','3\u6708','4\u6708','5\u6708','6\u6708','7\u6708','8\u6708','9\u6708','10\u6708','11\u6708','12\u6708'];
    var WD = ['\u4e00','\u4e8c','\u4e09','\u56db','\u4e94','\u516d','\u65e5'];

    function cdHas(year, month, day) { var k = year + '-' + String(month + 1).padStart(2, '0'); var s = window.__CD__[k]; return s && s.has(day); }
    function cmHas(year, month) { var k = year + '-' + String(month + 1).padStart(2, '0'); var s = window.__CD__[k]; return s && s.size > 0; }

    function render() {
      el.innerHTML = state.view === 'days' ? rDays() : state.view === 'months' ? rMonths() : rYears();
    }

    function rDays() {
      var first = new Date(state.year, state.month, 1);
      var dim = new Date(state.year, state.month + 1, 0).getDate();
      var sd = (first.getDay() + 6) % 7;
      var td = new Date();
      var h = '<div class="cal-header"><button class="cal-nav" data-a="pm">&lsaquo;</button><span class="cal-title" data-a="vm">' + state.year + '\u5e74' + MN[state.month] + '</span><button class="cal-nav" data-a="nm">&rsaquo;</button></div><div class="cal-grid cal-wds">';
      WD.forEach(function(w) { h += '<span class="cal-wd">' + w + '</span>'; });
      h += '</div><div class="cal-grid cal-days">';
      for (var i = 0; i < sd; i++) h += '<span></span>';
      for (var d = 1; d <= dim; d++) {
        var c = 'cal-day';
        if (d === td.getDate() && state.month === td.getMonth() && state.year === td.getFullYear()) c += ' cal-today';
        if (cdHas(state.year, state.month, d)) c += ' cal-has-post';
        h += '<span class="' + c + '" data-d="' + d + '">' + d + '</span>';
      }
      h += '</div>';
      return h;
    }

    function rMonths() {
      var td = new Date();
      var h = '<div class="cal-header"><button class="cal-nav" data-a="py">&lsaquo;</button><span class="cal-title" data-a="vy">' + state.year + '\u5e74</span><button class="cal-nav" data-a="ny">&rsaquo;</button></div><div class="cal-grid cal-ms">';
      for (var m = 0; m < 12; m++) {
        var c = 'cal-mo';
        if (m === td.getMonth() && state.year === td.getFullYear()) c += ' cal-cur';
        if (cmHas(state.year, m)) c += ' cal-has-post';
        h += '<span class="' + c + '" data-m="' + m + '">' + MN[m] + '</span>';
      }
      h += '</div>';
      return h;
    }

    function rYears() {
      var base = Math.floor(state.year / 12) * 12;
      var td = new Date();
      var h = '<div class="cal-header"><button class="cal-nav" data-a="pr">&lsaquo;</button><span class="cal-title">' + base + ' - ' + (base + 11) + '</span><button class="cal-nav" data-a="nr">&rsaquo;</button></div><div class="cal-grid cal-ys">';
      for (var y = base; y < base + 12; y++) {
        var c = 'cal-yr';
        if (y === td.getFullYear()) c += ' cal-cur';
        h += '<span class="' + c + '" data-y="' + y + '">' + y + '</span>';
      }
      h += '</div>';
      return h;
    }

    el.addEventListener('click', function(e) {
      var t = e.target, a = t.dataset.a;
      if (a === 'pm') { state.month--; if (state.month < 0) { state.month = 11; state.year--; } render(); return; }
      if (a === 'nm') { state.month++; if (state.month > 11) { state.month = 0; state.year++; } render(); return; }
      if (a === 'py') { state.year--; render(); return; }
      if (a === 'ny') { state.year++; render(); return; }
      if (a === 'pr') { state.year -= 12; render(); return; }
      if (a === 'nr') { state.year += 12; render(); return; }
      if (a === 'vm') { state.view = 'months'; render(); return; }
      if (a === 'vy') { state.view = 'years'; render(); return; }
      if (t.dataset.d !== undefined) {
        var dv = parseInt(t.dataset.d);
        if (cdHas(state.year, state.month, dv)) {
          window.location.href = '/?date=' + state.year + '-' + String(state.month + 1).padStart(2, '0') + '-' + String(dv).padStart(2, '0');
        }
        return;
      }
      if (t.dataset.m !== undefined) {
        var mv = parseInt(t.dataset.m);
        state.month = mv; state.view = 'days';
        if (cmHas(state.year, mv)) window.location.href = '/?month=' + state.year + '-' + String(mv + 1).padStart(2, '0');
        else render();
        return;
      }
      if (t.dataset.y !== undefined) {
        state.year = parseInt(t.dataset.y); state.view = 'months';
        window.location.href = '/?year=' + state.year;
        return;
      }
    });
    render();
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
      navigator.clipboard.writeText(window.location.href).then(function() { btn.title = '\u5df2\u590d\u5236\uff01'; setTimeout(function() { btn.title = '\u590d\u5236\u94fe\u63a5'; }, 1500); });
    });
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
      var e = v ? v.value : 'internal';
      if (e === 'google') window.open('https://www.google.com/search?q=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
      else if (e === 'baidu') window.open('https://www.baidu.com/s?wd=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
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
    var tag = params.get('tag'), year = params.get('year'), month = params.get('month'), date = params.get('date'), search = params.get('search');
    if (!allPosts.length) return;

    if (tag || year || month || date || search) {
      // 让浏览器先绘制 loading 提示，再执行过滤
      setTimeout(function() {
        displayedPosts = [];
        if (tag && window.__TI__ && window.__TI__[tag]) displayedPosts = window.__TI__[tag].map(function(i) { return allPosts[i]; });
        else if (year && window.__YI__ && window.__YI__[year]) displayedPosts = window.__YI__[year].map(function(i) { return allPosts[i]; });
        else if (month && window.__MI__ && window.__MI__[month]) displayedPosts = window.__MI__[month].map(function(i) { return allPosts[i]; });
        else if (date) {
          var mk = date.substring(0, 7), dd = parseInt(date.split('-')[2]);
          if (window.__MI__ && window.__MI__[mk]) displayedPosts = window.__MI__[mk].map(function(i) { return allPosts[i]; }).filter(function(p) { return parseInt(p.d.split('-')[2]) === dd; });
        } else if (search) {
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
    var tag = params.get('tag'), year = params.get('year'), month = params.get('month'), date = params.get('date'), search = params.get('search');

    // 标题
    if (filterHeader && filterTitle) {
      if (tag) { filterTitle.textContent = '\u6807\u7b7e\uff1a' + tag; filterHeader.style.display = ''; }
      else if (date) { filterTitle.textContent = date; filterHeader.style.display = ''; }
      else if (month) { filterTitle.textContent = month.replace('-', '\u5e74') + '\u6708'; filterHeader.style.display = ''; }
      else if (year) { filterTitle.textContent = year + '\u5e74\u6587\u7ae0'; filterHeader.style.display = ''; }
      else if (search) { filterTitle.textContent = '\u641c\u7d22\uff1a' + search; filterHeader.style.display = ''; }
      else { filterHeader.style.display = 'none'; }
    }

    // 页面标题
    if (tag) document.title = '\u6807\u7b7e\uff1a' + tag + ' - \u822a\u901a\u793e';
    else if (date) document.title = date + ' - \u822a\u901a\u793e';
    else if (month) document.title = month.replace('-', '\u5e74') + '\u6708 - \u822a\u901a\u793e';
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

  /* ===== 初始化 ===== */
  document.addEventListener('DOMContentLoaded', function() {
    initTheme(); initMobileMenu(); initScrollToTop();
    initCopyLink(); initSearch(); initImageToggle();
    initCalendar(); initPagination();
  });
})();
