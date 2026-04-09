/**
 * 航通社极简 JS — 顶部页眉 + 右侧边栏版
 * 功能：深色模式、移动端菜单、回到顶部、URL过滤、搜索、原图切换、复制链接、无限滚动
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
  var applyFilters; // 暴露给无限滚动使用
  function initFilters() {
    var container = document.getElementById('postsContainer');
    var searchInput = document.getElementById('searchInput');
    var filterHeader = document.getElementById('filterHeader');
    var filterTitle = document.getElementById('filterTitle');
    var noMore = document.getElementById('noMorePosts');

    applyFilters = function() {
      var cards = container ? container.querySelectorAll('.post-card') : [];
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

      // 仅在所有分页加载完毕后显示结束提示
      var meta = document.getElementById('paginationMeta');
      var allLoaded = meta && meta.dataset.allLoaded === 'true';
      if (allLoaded && noMore) {
        noMore.textContent = visible === 0 ? '没有找到匹配的文章' : '没有更多文章了';
        noMore.style.display = 'block';
      }

      document.querySelectorAll('.tag-btn').forEach(function(b) { b.classList.toggle('active', tag && b.textContent === tag); });
      if (tag) document.title = '标签：' + tag + ' - 航通社';
      else if (year) document.title = year + '年文章 - 航通社';
      else if (search) document.title = '搜索：' + search + ' - 航通社';
      else document.title = '航通社 | 你应该知道的历史、现在和未来';
    };

    if (searchInput) {
      var p = new URLSearchParams(window.location.search);
      if (p.get('search')) searchInput.value = p.get('search');
      searchInput.addEventListener('input', debounce(function() {
        var q = searchInput.value.trim();
        window.history.replaceState(null, '', q ? '/?search=' + encodeURIComponent(q) : '/');
        applyFilters();
      }, 300));
    }
    applyFilters();
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

  // ===== 无限滚动 =====
  function initInfiniteScroll() {
    var meta = document.getElementById('paginationMeta');
    if (!meta) return;

    var container = document.getElementById('postsContainer');
    var loading = document.getElementById('loadingIndicator');
    var noMore = document.getElementById('noMorePosts');
    var nextPage = parseInt(meta.dataset.nextPage) || 0;
    var isLoading = false;

    function loadNextPage() {
      if (isLoading || nextPage === 0) return;
      isLoading = true;
      if (loading) loading.style.display = 'flex';

      fetch('/page' + nextPage + '/')
        .then(function(res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.text();
        })
        .then(function(html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');
          var newCards = doc.querySelectorAll('#postsContainer .post-card');

          if (newCards.length > 0) {
            var frag = document.createDocumentFragment();
            newCards.forEach(function(card) {
              frag.appendChild(document.adoptNode(card));
            });
            container.appendChild(frag);
          }

          // 从下一页读取后续分页信息
          var newMeta = doc.getElementById('paginationMeta');
          if (newMeta) {
            nextPage = parseInt(newMeta.dataset.nextPage) || 0;
          } else {
            nextPage = 0;
          }

          isLoading = false;
          if (loading) loading.style.display = 'none';

          // 所有分页加载完毕
          if (nextPage === 0) {
            meta.dataset.allLoaded = 'true';
            if (noMore) noMore.style.display = 'block';
            // 重新应用过滤以更新结束提示文案
            if (typeof applyFilters === 'function') applyFilters();
          }
        })
        .catch(function(err) {
          console.error('加载失败:', err);
          isLoading = false;
          if (loading) loading.style.display = 'none';
        });
    }

    // 如果没有下一页，直接显示结束提示
    if (nextPage === 0) {
      meta.dataset.allLoaded = 'true';
      if (noMore) noMore.style.display = 'block';
      return;
    }

    // 使用 IntersectionObserver 监测哨兵元素进入视口
    var sentinel = document.getElementById('scrollSentinel');
    if (!sentinel) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) loadNextPage();
      }, { rootMargin: '300px' });
      observer.observe(sentinel);
    } else {
      // 降级：scroll 事件
      window.addEventListener('scroll', debounce(function() {
        var rect = sentinel.getBoundingClientRect();
        if (rect.top < window.innerHeight + 300) loadNextPage();
      }, 200), { passive: true });
    }
  }

  // ===== 初始化 =====
  document.addEventListener('DOMContentLoaded', function() {
    initDarkMode(); initMobileMenu(); initScrollToTop();
    initCopyLink(); initFilters(); initImageToggle(); initInfiniteScroll();
  });
})();
