/**
 * 航通社极简 JS — 顶部页眉 + 右侧边栏 + 翻页
 * 功能：深色模式、移动端菜单、回到顶部、翻页浏览、tag/year/search过滤、搜索引擎切换、原图切换、复制链接
 */
(function() {
  'use strict';

  var PAGE_SIZE = 10;
  var currentPage = 1;
  var allPosts = [];
  var displayedPosts = [];

  // ===== 工具 =====
  function debounce(fn, ms) {
    var t;
    return function() { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  function esc(s) {
    var d = document.createElement('div'); d.textContent = s; return d.innerHTML;
  }

  // 从 __POSTS__ 数据生成一张卡片 DOM
  function createCard(post) {
    var el = document.createElement('article');
    el.className = 'post-card';
    el.dataset.year = post.y;
    el.dataset.tags = post.g || '';
    el.dataset.title = (post.t || '').toLowerCase();
    el.dataset.excerpt = (post.e || '').toLowerCase();

    var imgSrc = post.i
      ? 'https://images.weserv.nl/?url=' + encodeURIComponent(post.i) + '&w=400&h=200&output=jpg&q=80&fit=cover'
      : '';

    var h = '<a href="' + post.u + '" class="post-card-link">';
    if (imgSrc) h += '<div class="post-card-thumb"><img src="' + imgSrc + '" alt="' + esc(post.t) + '" loading="lazy"></div>';
    h += '<div class="post-card-body"><div class="post-card-meta"><span class="post-card-date">' + esc(post.d) + '</span>';
    if (post.g) post.g.split(',').slice(0, 3).forEach(function(t) {
      t = t.trim(); if (t) h += '<span class="post-tag">#' + esc(t) + '</span>';
    });
    h += '</div><h2 class="post-card-title">' + esc(post.t) + '</h2>';
    if (post.e) h += '<p class="post-card-excerpt">' + esc(post.e) + '</p>';
    h += '</div></a>';
    el.innerHTML = h;
    return el;
  }

  // ===== 深色模式 =====
  function initDarkMode() {
    var toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    var saved = localStorage.getItem('theme');
    if (saved) { applyTheme(saved); toggle.checked = saved === 'dark'; }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark'); toggle.checked = true;
    }
    toggle.addEventListener('change', function() {
      var theme = toggle.checked ? 'dark' : 'light';
      applyTheme(theme); localStorage.setItem('theme', theme);
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) { applyTheme(e.matches ? 'dark' : 'light'); toggle.checked = e.matches; }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var frame = document.querySelector('iframe.giscus-frame');
    if (frame) frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } }, 'https://giscus.app'
    );
  }

  // ===== 移动端侧边栏 =====
  function initMobileMenu() {
    var btn = document.getElementById('hamburgerButton');
    var overlay = document.getElementById('sidebarOverlay');
    var sidebar = document.getElementById('site-sidebar');
    if (!btn) return;
    function open() {
      if (sidebar) sidebar.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      if (sidebar) sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    btn.addEventListener('click', function() { sidebar.classList.contains('open') ? close() : open(); });
    if (overlay) overlay.addEventListener('click', close);
    if (sidebar) sidebar.addEventListener('click', function(e) { if (e.target.tagName === 'A') close(); });
  }

  // ===== 回到顶部 =====
  function initScrollToTop() {
    var btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      btn.classList.toggle('show', window.scrollY > window.innerHeight);
    }, { passive: true });
    btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ===== 复制链接 =====
  function initCopyLink() {
    var btn = document.getElementById('copyLinkBtn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      navigator.clipboard.writeText(window.location.href).then(function() {
        btn.title = '已复制！'; setTimeout(function() { btn.title = '复制链接'; }, 1500);
      });
    });
  }

  // ===== 搜索（站内 / Google / 百度） =====
  function initSearch() {
    var form = document.querySelector('.search-form');
    var input = document.getElementById('searchInput');
    if (!form || !input) return;

    // 搜索引擎切换时更新 placeholder
    document.querySelectorAll('input[name="engine"]').forEach(function(r) {
      r.addEventListener('change', function() {
        var v = document.querySelector('input[name="engine"]:checked').value;
        input.placeholder =
          v === 'google' ? '用 Google 搜索...' :
          v === 'baidu' ? '用百度搜索...' : '搜索文章...';
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) return;
      var engine = document.querySelector('input[name="engine"]:checked');
      var v = engine ? engine.value : 'internal';
      if (v === 'google') {
        window.open('https://www.google.com/search?q=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
      } else if (v === 'baidu') {
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent('site:lishuhang.me ' + q), '_blank');
      } else {
        // 站内搜索：跳转到 ?search= 由翻页系统处理
        window.location.href = '/?search=' + encodeURIComponent(q);
      }
    });
  }

  // ===== 翻页 + 过滤 =====
  function initPagination() {
    allPosts = window.__POSTS__ || [];
    var container = document.getElementById('postsContainer');
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    var tag = params.get('tag');
    var year = params.get('year');
    var search = params.get('search');

    // 如果 __POSTS__ 未加载（条件不生效），保留 HTML 预渲染的 10 条作为后备
    if (!allPosts.length) return;

    // ---------- 有过滤参数：从全量数据筛选 ----------
    if (tag || year || search) {
      displayedPosts = allPosts.filter(function(post) {
        if (tag && post.g.toLowerCase().split(',').indexOf(tag.toLowerCase()) === -1) return false;
        if (year && post.y !== year) return false;
        if (search) {
          var q = search.toLowerCase();
          if (post.t.toLowerCase().indexOf(q) === -1 && post.e.toLowerCase().indexOf(q) === -1) return false;
        }
        return true;
      });

      currentPage = 1;
      container.style.display = ''; // 恢复可见
      container.innerHTML = '';
      renderPage();
      return;
    }

    // ---------- 无过滤：正常首页 ----------
    displayedPosts = allPosts;
    currentPage = 1;
    // HTML 已渲染前 10 条，直接添加翻页按钮
    renderPaginationButtons(document.getElementById('pagination'), allPosts.length, 1);
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

    // 标题栏
    if (filterHeader && filterTitle) {
      if (tag) { filterTitle.textContent = '标签：' + tag; filterHeader.style.display = ''; }
      else if (year) { filterTitle.textContent = year + '年文章'; filterHeader.style.display = ''; }
      else if (search) { filterTitle.textContent = '搜索：' + search; filterHeader.style.display = ''; }
      else { filterHeader.style.display = 'none'; }
    }

    // 页面标题
    if (tag) document.title = '标签：' + tag + ' - 航通社';
    else if (year) document.title = year + '年文章 - 航通社';
    else if (search) document.title = '搜索：' + search + ' - 航通社';
    else document.title = '航通社 | 你应该知道的历史、现在和未来';

    // 高亮标签按钮
    document.querySelectorAll('.tag-btn').forEach(function(b) {
      b.classList.toggle('active', tag && b.textContent === tag);
    });

    // 渲染当前页卡片
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

    renderPaginationButtons(paginationEl, total, currentPage);
  }

  function renderPaginationButtons(el, total, current) {
    if (!el) return;
    var totalPages = Math.ceil(total / PAGE_SIZE);
    if (totalPages <= 1) { el.innerHTML = ''; return; }

    var html = '';
    if (current > 1) {
      html += '<a href="#" class="pagination-btn" data-page="' + (current - 1) + '">\u2190 \u4e0a\u4e00\u9875</a>';
    } else {
      html += '<span class="pagination-btn pagination-disabled">\u2190 \u4e0a\u4e00\u9875</span>';
    }

    var s = Math.max(1, current - 2), e = Math.min(totalPages, current + 2);
    if (s > 1) {
      html += '<a href="#" class="pagination-btn" data-page="1">1</a>';
      if (s > 2) html += '<span class="pagination-ellipsis">\u2026</span>';
    }
    for (var i = s; i <= e; i++) {
      html += i === current
        ? '<span class="pagination-btn pagination-current">' + i + '</span>'
        : '<a href="#" class="pagination-btn" data-page="' + i + '">' + i + '</a>';
    }
    if (e < totalPages) {
      if (e < totalPages - 1) html += '<span class="pagination-ellipsis">\u2026</span>';
      html += '<a href="#" class="pagination-btn" data-page="' + totalPages + '">' + totalPages + '</a>';
    }

    if (current < totalPages) {
      html += '<a href="#" class="pagination-btn" data-page="' + (current + 1) + '">\u4e0b\u4e00\u9875 \u2192</a>';
    } else {
      html += '<span class="pagination-btn pagination-disabled">\u4e0b\u4e00\u9875 \u2192</span>';
    }

    el.innerHTML = html;
    el.querySelectorAll('a[data-page]').forEach(function(btn) {
      btn.addEventListener('click', function(ev) {
        ev.preventDefault();
        currentPage = parseInt(this.dataset.page);
        renderPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // ===== 原图切换 =====
  function initImageToggle() {
    var toggle = document.getElementById('originalImageToggle');
    if (!toggle) return;
    if (localStorage.getItem('useOriginalImage') === 'true') toggle.checked = true;

    function processImages() {
      var article = document.querySelector('.article-content');
      var featImg = document.querySelector('.article-featured-image img');
      var useOriginal = toggle.checked;
      if (article) {
        article.querySelectorAll('img').forEach(function(img) {
          var src = img.getAttribute('data-original') || img.src;
          if (!img.getAttribute('data-original')) img.setAttribute('data-original', src);
          if (useOriginal) { img.src = src; }
          else if (!img.src.includes('weserv.nl')) { img.src = 'https://images.weserv.nl/?url=' + encodeURIComponent(src) + '&output=jpg&q=80'; }
        });
      }
      if (featImg) {
        var orig = featImg.getAttribute('data-original');
        if (orig) featImg.src = useOriginal ? orig : 'https://images.weserv.nl/?url=' + encodeURIComponent(orig) + '&output=jpg&q=80';
      }
    }

    processImages();
    toggle.addEventListener('change', function() { localStorage.setItem('useOriginalImage', toggle.checked); processImages(); });
  }

  // ===== 初始化 =====
  document.addEventListener('DOMContentLoaded', function() {
    initDarkMode(); initMobileMenu(); initScrollToTop();
    initCopyLink(); initSearch(); initImageToggle(); initPagination();
  });
})();
