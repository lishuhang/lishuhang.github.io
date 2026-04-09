/**
 * 航通社极简 JS — 顶部页眉 + 右侧边栏版
 * 功能：深色模式、移动端菜单、回到顶部、URL过滤、搜索、原图切换、复制链接
 */
(function() {
  'use strict';

  function debounce(fn, ms) {
    var t;
    return function() { clearTimeout(t); t = setTimeout(fn, ms); };
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

  // ===== 移动端侧边栏（从右侧滑出） =====
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

  // ===== URL 过滤 =====
  function initFilters() {
    var container = document.getElementById('postsContainer');
    var cards = container ? container.querySelectorAll('.post-card') : [];
    if (!cards.length) return;
    var searchInput = document.getElementById('searchInput');
    var filterHeader = document.getElementById('filterHeader');
    var filterTitle = document.getElementById('filterTitle');
    var noMore = document.getElementById('noMore');

    function apply() {
      var params = new URLSearchParams(window.location.search);
      var tag = params.get('tag'), year = params.get('year'), search = params.get('search');
      var visible = 0;
      cards.forEach(function(c) {
        var show = true;
        if (tag) show = c.dataset.tags.toLowerCase().split(',').indexOf(tag.toLowerCase()) !== -1;
        if (year && show) show = c.dataset.year === year;
        if (search && show) {
          var q = search.toLowerCase();
          show = c.dataset.title.indexOf(q) !== -1 || c.dataset.excerpt.indexOf(q) !== -1;
        }
        c.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (filterHeader && filterTitle) {
        if (tag) { filterTitle.textContent = '标签：' + tag; filterHeader.style.display = ''; }
        else if (year) { filterTitle.textContent = year + '年文章'; filterHeader.style.display = ''; }
        else if (search) { filterTitle.textContent = '搜索：' + search; filterHeader.style.display = ''; }
        else { filterHeader.style.display = 'none'; }
      }
      if (noMore) { noMore.textContent = visible === 0 ? '没有找到匹配的文章' : '没有更多文章了'; noMore.style.display = 'block'; }
      document.querySelectorAll('.tag-btn').forEach(function(b) { b.classList.toggle('active', tag && b.textContent === tag); });
      if (tag) document.title = '标签：' + tag + ' - 航通社';
      else if (year) document.title = year + '年文章 - 航通社';
      else if (search) document.title = '搜索：' + search + ' - 航通社';
      else document.title = '航通社 | 你应该知道的历史、现在和未来';
    }

    if (searchInput) {
      var p = new URLSearchParams(window.location.search);
      if (p.get('search')) searchInput.value = p.get('search');
      searchInput.addEventListener('input', debounce(function() {
        var q = searchInput.value.trim();
        window.history.replaceState(null, '', q ? '/?search=' + encodeURIComponent(q) : '/');
        apply();
      }, 300));
    }
    apply();
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
    initCopyLink(); initFilters(); initImageToggle();
  });
})();
