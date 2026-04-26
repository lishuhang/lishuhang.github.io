/**
 * 航通社极简 JS v6.4.1
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
    var hasImg = !!post.i;
    var useOriginal = localStorage.getItem('useOriginalImage') === 'true';
    var imgSrc = hasImg ? (useOriginal ? post.i : 'https://images.weserv.nl/?url=' + encodeURIComponent(post.i) + '&w=400&h=260&output=jpg&q=80&fit=cover') : '';
    var h = '<a href="' + post.u + '" class="post-card-link">';
    if (hasImg) h += '<div class="post-card-thumb"><img src="' + imgSrc + '" data-original="' + esc(post.i) + '" alt="' + esc(post.t) + '" loading="lazy"></div>';
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
    var params = new URLSearchParams(window.location.search);
    var selectedYear = params.get('year') ? parseInt(params.get('year')) : null;
    var state = { base: selectedYear ? Math.floor(selectedYear / 12) * 12 : Math.floor(now.getFullYear() / 12) * 12 };

    function render() {
      var h = '<div class="cal-header"><button class="cal-nav" data-a="prev">&lsaquo;</button><span class="cal-title">' + state.base + ' - ' + (state.base + 11) + '</span><button class="cal-nav" data-a="next">&rsaquo;</button></div><div class="cal-grid cal-ys">';
      for (var y = state.base; y < state.base + 12; y++) {
        if (y < 2006) continue;
        var c = 'cal-yr';
        if (y === now.getFullYear()) c += ' cal-cur';
        if (y === selectedYear) c += ' cal-sel';
        var count = window.__YD__[y] || 0;
        h += '<span class="' + c + '" data-y="' + y + '">' + y + '<span class="cal-yr-count">' + count + ' 篇</span></span>';
      }
      h += '</div>';
      el.innerHTML = h;
      if (selectedYear) {
        var sel = el.querySelector('.cal-sel');
        if (sel) sel.scrollIntoView({ block: 'nearest' });
      }
    }

    el.addEventListener('click', function(e) {
      var t = e.target, a = t.dataset.a;
      if (a === 'prev') { state.base -= 12; if (state.base < 2000) state.base = 2000; render(); return; }
      if (a === 'next') { state.base += 12; render(); return; }
      if (t.dataset.y !== undefined) {
        window.location.href = '/?year=' + parseInt(t.dataset.y);
      }
    });
    render();
  }

  /* ===== Featured 轮播（仅首页第一页显示） ===== */
  function initFeatured() {
    var carousel = document.getElementById('featuredCarousel');
    var slides = document.querySelectorAll('.featured-slide');
    var dots = document.querySelectorAll('.featured-dot');
    var prevBtn = document.getElementById('featuredPrev');
    var nextBtn = document.getElementById('featuredNext');
    if (slides.length <= 1 || !carousel) return;
    var current = 0;
    var timer;

    function show(idx) {
      current = ((idx % slides.length) + slides.length) % slides.length;
      slides.forEach(function(s, i) { s.classList.toggle('active', i === current); });
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    // 圆点点击
    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        show(parseInt(this.dataset.idx));
        resetTimer();
      });
    });

    // 左右箭头
    if (prevBtn) prevBtn.addEventListener('click', function() { prev(); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { next(); resetTimer(); });

    // 触屏滑动
    var touchStartX = 0, touchEndX = 0;
    carousel.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    carousel.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetTimer(); }
    }, { passive: true });

    function resetTimer() { clearInterval(timer); timer = setInterval(next, 5000); }

    // 自动轮播
    timer = setInterval(next, 5000);
    // 鼠标悬停暂停
    carousel.addEventListener('mouseenter', function() { clearInterval(timer); });
    carousel.addEventListener('mouseleave', function() { timer = setInterval(next, 5000); });

    // 根据当前页面/过滤状态显示或隐藏 featured
    updateFeaturedVisibility();
  }

  function updateFeaturedVisibility() {
    var carousel = document.getElementById('featuredCarousel');
    if (!carousel) return;
    var params = new URLSearchParams(window.location.search);
    var isFiltered = params.get('tag') || params.get('year') || params.get('search');
    if (isFiltered || currentPage > 1) {
      carousel.classList.add('hidden');
    } else {
      carousel.classList.remove('hidden');
    }
  }

  /* ===== 移动端侧边栏（含遮罩修复） ===== */
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
    // 修复：窗口放大到宽屏时确保遮罩消失
    var mq = window.matchMedia('(min-width: 1150px)');
    mq.addEventListener('change', function(e) { if (e.matches) close(); });
    // 双重保障：resize 事件也检查
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() { if (window.innerWidth > 1149) close(); }, 100);
    });
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
        btn.title = '已复制！';
        setTimeout(function() { btn.title = '复制链接'; }, 1500);
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
        input.placeholder = v === 'google' ? '用 Google 搜索...' : v === 'bing' ? '用 Bing 搜索...' : '搜索文章...';
      });
    });
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var q = input.value.trim(); if (!q) return;
      var v = document.querySelector('input[name="engine"]:checked');
      var eng = v ? v.value : 'internal';
      if (eng === 'google') window.open('https://www.google.com/search?q=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
      else if (eng === 'bing') window.open('https://www.bing.com/search?q=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
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
      updateFeaturedVisibility();
      renderPage();
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
      if (tag) { filterTitle.textContent = '标签：' + tag; filterHeader.style.display = ''; }
      else if (year) { filterTitle.textContent = year + '年文章'; filterHeader.style.display = ''; }
      else if (search) { filterTitle.textContent = '搜索：' + search; filterHeader.style.display = ''; }
      else { filterHeader.style.display = 'none'; }
    }

    if (tag) document.title = '标签：' + tag + ' - 航通社';
    else if (year) document.title = year + '年文章 - 航通社';
    else if (search) document.title = '搜索：' + search + ' - 航通社';
    else document.title = '航通社 | 你应该知道的历史、现在和未来';

    document.querySelectorAll('.tag-btn').forEach(function(b) { b.classList.toggle('active', tag && b.textContent === tag); });

    var total = displayedPosts.length;
    container.innerHTML = '';
    if (total === 0) {
      if (noResults) { noResults.textContent = '没有找到匹配的文章'; noResults.style.display = 'block'; }
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }
    if (noResults) noResults.style.display = 'none';

    var start = (currentPage - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, total);
    for (var i = start; i < end; i++) container.appendChild(createCard(displayedPosts[i]));
    updateFeaturedVisibility();
    var _pe = paginationEl, _t = total, _c = currentPage;
    setTimeout(function() { renderPageButtons(_pe, _t, _c); }, 0);
  }

  function renderPageButtons(el, total, current) {
    if (!el) return;
    var tp = Math.ceil(total / PAGE_SIZE);
    if (tp <= 1) { el.innerHTML = ''; return; }
    var h = '';
    h += current > 1 ? '<a href="#" class="pagination-btn" data-page="' + (current - 1) + '">\u2190 上一页</a>' : '<span class="pagination-btn pagination-disabled">\u2190 上一页</span>';
    var s = Math.max(1, current - 2), e = Math.min(tp, current + 2);
    if (s > 1) { h += '<a href="#" class="pagination-btn" data-page="1">1</a>'; if (s > 2) h += '<span class="pagination-ellipsis">\u2026</span>'; }
    for (var i = s; i <= e; i++) h += i === current ? '<span class="pagination-btn pagination-current">' + i + '</span>' : '<a href="#" class="pagination-btn" data-page="' + i + '">' + i + '</a>';
    if (e < tp) { if (e < tp - 1) h += '<span class="pagination-ellipsis">\u2026</span>'; h += '<a href="#" class="pagination-btn" data-page="' + tp + '">' + tp + '</a>'; }
    h += current < tp ? '<a href="#" class="pagination-btn" data-page="' + (current + 1) + '">下一页 \u2192</a>' : '<span class="pagination-btn pagination-disabled">下一页 \u2192</span>';
    el.innerHTML = h;
    el.querySelectorAll('a[data-page]').forEach(function(btn) {
      btn.addEventListener('click', function(ev) {
        ev.preventDefault();
        currentPage = parseInt(this.dataset.page);
        renderPage();
        updateFeaturedVisibility();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ===== 原图切换 ===== */
  function initImageToggle() {
    var toggle = document.getElementById('originalImageToggle');
    if (!toggle) return;
    if (localStorage.getItem('useOriginalImage') === 'true') toggle.checked = true;
    function applyImg(img, orig) {
      var raw = img.getAttribute('data-original');
      if (!raw) return;
      img.src = orig ? raw : 'https://images.weserv.nl/?url=' + encodeURIComponent(raw) + '&output=jpg&q=80';
    }
    function process() {
      var orig = toggle.checked;
      var article = document.querySelector('.article-content');
      if (article) article.querySelectorAll('img').forEach(function(img) {
        if (!img.getAttribute('data-original')) img.setAttribute('data-original', img.src);
        applyImg(img, orig);
      });
      var featImg = document.querySelector('.article-featured-image img');
      if (featImg) applyImg(featImg, orig);
      document.querySelectorAll('.post-card-thumb img').forEach(function(img) { applyImg(img, orig); });
    }
    process();
    toggle.addEventListener('change', function() { localStorage.setItem('useOriginalImage', toggle.checked); process(); });
  }

  /* ===== 文章内图片懒加载 ===== */
  function initLazyImages() {
    // 为文章正文中所有图片设置懒加载
    var article = document.querySelector('.article-content');
    if (article) {
      article.querySelectorAll('img').forEach(function(img) {
        img.setAttribute('loading', 'lazy');
        if ('fetchPriority' in img) img.setAttribute('fetchpriority', 'low');
      });
    }
  }

  /* ===== 文章内链接强制新标签页打开 ===== */
  function initExternalLinks() {
    var article = document.querySelector('.article-content');
    if (!article) return;
    article.querySelectorAll('a').forEach(function(a) {
      if (a.hostname !== window.location.hostname) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /* ===== Giscus 评论计数监听 ===== */
  function initCommentCount() {
    var countEl = document.getElementById('commentCount');
    if (!countEl) return;
    window.addEventListener('message', function(e) {
      if (e.origin !== 'https://giscus.app') return;
      if (!(typeof e.data === 'object' && e.data.giscus)) return;
      var d = e.data.giscus;
      if (d.hasOwnProperty('discussion')) {
        var total = (d.discussion.totalCommentCount || 0) + (d.discussion.totalReplyCount || 0);
        countEl.textContent = total > 0 ? total + ' 条评论' : '评论';
      }
    });
  }

  /* ===== 超宽屏自适应缩放 ===== */
  function initResponsiveScale() {
    function update() {
      var vw = window.innerWidth;
      var scale = (vw * 2 / 3) / 1200;
      if (scale > 1) {
        document.documentElement.style.setProperty('--page-zoom', scale.toFixed(4));
      } else {
        document.documentElement.style.removeProperty('--page-zoom');
      }
    }
    update();
    window.addEventListener('resize', update);
  }

  /* ===== 初始化 ===== */
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initScrollToTop();
    initCopyLink();
    initSearch();
    initImageToggle();
    initArchive();
    initFeatured();
    initWechatShare();
    initLazyImages();
    initExternalLinks();
    initCommentCount();
    initResponsiveScale();
    initPagination();
  });
})();
