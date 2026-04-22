/* ============================================================
   main.js – Optimized JavaScript for lishuhang.me
   
   Architecture:
   - All code uses vanilla JS, no dependencies
   - Deferred loading: this script loads with `defer`
   - Post data (window.__POSTS__) loads from separate /assets/data/posts.js
   - Giscus comments load lazily via Intersection Observer
   
   Performance notes:
   - No inline data in HTML (moved to posts.js)
   - Giscus only loads when comments section is visible
   - Carousel uses requestAnimationFrame for scroll detection
   - Event delegation where possible (document-level listeners)
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. Theme Manager
     - Reads saved preference from localStorage
     - Falls back to system preference (prefers-color-scheme)
     - Updates toggle UI and Giscus theme on change
     ---------------------------------------------------------- */
  const Theme = {
    KEY: "theme",
    init() {
      // Apply saved or system preference
      const saved = localStorage.getItem(this.KEY);
      if (saved) {
        document.documentElement.setAttribute("data-theme", saved);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
      this.updateToggleUI();

      // Bind click on theme toggle button
      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.addEventListener("click", () => this.toggle());
      });

      // Bind keyboard on toggle switch for accessibility
      document.querySelectorAll(".theme-toggle .toggle-switch").forEach((sw) => {
        sw.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.toggle();
          }
        });
      });

      // Listen for system preference changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem(this.KEY)) {
            document.documentElement.setAttribute(
              "data-theme",
              e.matches ? "dark" : "light"
            );
            this.updateToggleUI();
          }
        });
    },
    toggle() {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(this.KEY, next);
      this.updateToggleUI();
      this.updateGiscusTheme(next);
    },
    updateToggleUI() {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      document
        .querySelectorAll(".theme-toggle .toggle-switch")
        .forEach((el) => {
          el.classList.toggle("active", isDark);
          el.setAttribute("aria-checked", isDark);
        });
      document.querySelectorAll(".theme-toggle .icon-sun").forEach((el) => {
        el.style.display = isDark ? "none" : "block";
      });
      document.querySelectorAll(".theme-toggle .icon-moon").forEach((el) => {
        el.style.display = isDark ? "block" : "none";
      });
    },
    updateGiscusTheme(theme) {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (iframe) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: theme } } },
          "https://giscus.app"
        );
      }
    },
  };

  /* ----------------------------------------------------------
     2. Mobile Navigation
     - Hamburger toggle opens/closes sidebar
     - Overlay click closes sidebar
     - Escape key closes sidebar
     ---------------------------------------------------------- */
  const MobileNav = {
    init() {
      const hamburger = document.querySelector(".hamburger") || document.getElementById("hamburgerButton");
      const sidebar = document.querySelector(".sidebar-area");
      const overlay = document.querySelector(".sidebar-overlay");

      if (!hamburger || !sidebar) return;

      hamburger.addEventListener("click", () => {
        const isOpen = sidebar.classList.contains("open");
        this.toggle(!isOpen);
      });

      if (overlay) {
        overlay.addEventListener("click", () => this.toggle(false));
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sidebar.classList.contains("open")) {
          this.toggle(false);
        }
      });
    },
    toggle(open) {
      const hamburger = document.querySelector(".hamburger");
      const sidebar = document.querySelector(".sidebar-area");
      const overlay = document.querySelector(".sidebar-overlay");

      if (!hamburger || !sidebar) return;

      sidebar.classList.toggle("open", open);
      hamburger.classList.toggle("active", open);
      hamburger.setAttribute("aria-expanded", open);
      if (overlay) overlay.classList.toggle("active", open);
      document.body.style.overflow = open ? "hidden" : "";
    },
  };

  /* ----------------------------------------------------------
     3. Featured Carousel
     - Auto-advances every 5 seconds
     - Pause on hover
     - Dot navigation
     - Touch swipe support
     - First slide uses fetchpriority="high"
     ---------------------------------------------------------- */
  const Carousel = {
    current: 0,
    timer: null,
    interval: 5000,

    init() {
      const track = document.querySelector(".carousel-track");
      if (!track) return;

      this.track = track;
      this.slides = track.querySelectorAll(".carousel-slide");
      this.dots = document.querySelectorAll(".carousel-dot");
      this.total = this.slides.length;

      if (this.total <= 1) return;

      // Dot navigation (event delegation)
      document
        .querySelector(".carousel-dots")
        ?.addEventListener("click", (e) => {
          const dot = e.target.closest(".carousel-dot");
          if (!dot) return;
          const idx = Array.from(this.dots).indexOf(dot);
          if (idx >= 0) this.goTo(idx);
        });

      // Pause on hover
      const container = document.querySelector(".carousel");
      container?.addEventListener("mouseenter", () => this.pause());
      container?.addEventListener("mouseleave", () => this.start());

      // Touch support
      this.initTouch(container);

      this.start();
    },

    goTo(idx) {
      if (idx < 0) idx = this.total - 1;
      if (idx >= this.total) idx = 0;
      this.current = idx;
      this.track.style.transform = `translateX(-${idx * 100}%)`;
      this.dots.forEach((d, i) => {
        d.classList.toggle("active", i === idx);
        d.setAttribute("aria-selected", i === idx);
      });
    },

    next() {
      this.goTo(this.current + 1);
    },

    start() {
      this.pause();
      this.timer = setInterval(() => this.next(), this.interval);
    },

    pause() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    initTouch(el) {
      if (!el) return;
      let startX = 0;
      let diff = 0;

      el.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
          diff = 0;
        },
        { passive: true }
      );

      el.addEventListener(
        "touchmove",
        (e) => {
          diff = e.touches[0].clientX - startX;
        },
        { passive: true }
      );

      el.addEventListener("touchend", () => {
        if (Math.abs(diff) > 50) {
          this.pause();
          if (diff < 0) this.next();
          else this.goTo(this.current - 1);
          this.start();
        }
      });
    },
  };

  /* ----------------------------------------------------------
     4. Post Filter & Search (homepage only)
     
     On homepage:
     - Pre-rendered cards are shown by default (static HTML)
     - When user clicks tag/year/search, loads posts.js and filters
     - Static pagination hides, JS pagination shows for filtered results
     
     On article pages:
     - Tag/year clicks navigate to homepage with hash (#tag/xxx)
     ---------------------------------------------------------- */
  const Filter = {
    PER_PAGE: 10,
    currentFilter: null,
    filteredPosts: [],
    currentPage: 1,
    dataLoaded: false,
    isHomePage: false,

    init() {
      this.isHomePage = !!document.querySelector(".posts-grid");

      // Bind click events for tags and years (works on all pages)
      this.bindEvents();

      // If on homepage, set up full filtering
      if (this.isHomePage) {
        this.postsGrid = document.querySelector(".posts-grid");
        this.filteredContainer = document.querySelector(".posts-filtered");
        this.loadingEl = document.querySelector(".posts-loading");
        this.emptyEl = document.querySelector(".posts-empty");
        this.activeInfo = document.querySelector(".filter-active-info");
        this.staticPagination = document.querySelector(".pagination");
        this.jsPagination = document.querySelector(".pagination-js");

        // Check URL hash for initial filter
        this.checkURLHash();

        // Listen for hash changes (browser back/forward)
        window.addEventListener("hashchange", () => this.checkURLHash());
      }
    },

    bindEvents() {
      // Event delegation for all clicks
      document.addEventListener("click", (e) => {
        // Tag click
        const tagEl = e.target.closest("[data-filter-tag]");
        if (tagEl) {
          e.preventDefault();
          if (this.isHomePage) {
            this.applyFilter("tag", tagEl.dataset.filterTag);
          } else {
            // Navigate to homepage with tag filter
            window.location.href = "/#tag/" + encodeURIComponent(tagEl.dataset.filterTag);
          }
          return;
        }

        // Year click
        const yearEl = e.target.closest("[data-filter-year]");
        if (yearEl) {
          e.preventDefault();
          if (this.isHomePage) {
            this.applyFilter("year", yearEl.dataset.filterYear);
          } else {
            window.location.href = "/#year/" + yearEl.dataset.filterYear;
          }
          return;
        }

        // Clear filter
        const clearEl = e.target.closest(".filter-clear");
        if (clearEl) {
          this.clearFilter();
          return;
        }

        // JS pagination
        const pageEl = e.target.closest("[data-js-page]");
        if (pageEl) {
          e.preventDefault();
          this.goToPage(parseInt(pageEl.dataset.jsPage, 10));
          return;
        }
      });

      // Search input (homepage only, but sidebar exists on all pages)
      const searchInput = document.querySelector(".search-input");
      if (searchInput && this.isHomePage) {
        let debounceTimer;
        searchInput.addEventListener("input", () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            const q = searchInput.value.trim();
            if (q.length >= 2) {
              this.applyFilter("search", q);
            } else if (q.length === 0) {
              this.clearFilter();
            }
          }, 300);
        });
      }
    },

    checkURLHash() {
      const hash = location.hash.slice(1);
      if (hash.startsWith("tag/")) {
        this.applyFilter("tag", decodeURIComponent(hash.slice(4)));
      } else if (hash.startsWith("year/")) {
        this.applyFilter("year", hash.slice(5));
      }
    },

    applyFilter(type, value) {
      if (!this.isHomePage) return;

      this.currentFilter = { type, value };
      this.currentPage = 1;

      // Close mobile sidebar if open
      MobileNav.toggle(false);

      // Load data if needed
      if (!this.dataLoaded) {
        this.showLoading(true);
        this.loadData().then(() => {
          this.showLoading(false);
          this.renderFiltered();
        });
        return;
      }

      this.renderFiltered();
    },

    loadData() {
      if (this.dataLoaded) return Promise.resolve();
      if (window.__POSTS__) {
        this.dataLoaded = true;
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "/assets/data/posts.js";
        script.onload = () => {
          this.dataLoaded = true;
          resolve();
        };
        script.onerror = () => {
          console.error("Failed to load posts data");
          resolve();
        };
        document.head.appendChild(script);
      });
    },

    renderFiltered() {
      if (!this.currentFilter || !window.__POSTS__) return;

      const { type, value } = this.currentFilter;

      this.filteredPosts = window.__POSTS__.filter((post) => {
        if (type === "tag") return post.g && post.g.includes(value);
        if (type === "year") return post.d && post.d.startsWith(value);
        if (type === "search") {
          const q = value.toLowerCase();
          return (
            (post.t && post.t.toLowerCase().includes(q)) ||
            (post.e && post.e.toLowerCase().includes(q))
          );
        }
        return true;
      });

      // Swap: hide static posts, show filtered container
      this.postsGrid.style.display = "none";
      if (this.staticPagination) this.staticPagination.style.display = "none";
      this.filteredContainer.classList.add("visible");
      this.emptyEl.classList.toggle("visible", this.filteredPosts.length === 0);

      this.updateActiveInfo();
      this.renderPage();
    },

    renderPage() {
      const start = (this.currentPage - 1) * this.PER_PAGE;
      const end = start + this.PER_PAGE;
      const pagePosts = this.filteredPosts.slice(start, end);

      this.filteredContainer.innerHTML = pagePosts
        .map((post) => this.renderCard(post))
        .join("");

      this.filteredContainer
        .querySelectorAll(".post-card")
        .forEach((card, i) => {
          card.classList.add("animate-in");
          card.style.animationDelay = `${i * 50}ms`;
        });

      this.renderJSPagination();
    },

    renderCard(post) {
      const imgProxy = window.__IMG_PROXY__ || "";
      const imgSrc = post.i ? imgProxy + encodeURIComponent(post.i) : "";
      const tags = post.g
        ? post.g
            .map((t) => `<span class="tag">${this.esc(t)}</span>`)
            .join("")
        : "";

      return `<article class="post-card animate-in">${
        imgSrc
          ? `<div class="post-card-thumb"><img src="${imgSrc}" alt="${this.esc(post.t)}" loading="lazy" decoding="async"></div>`
          : ""
      }<div class="post-card-body"><h3 class="post-card-title"><a href="${post.u}">${this.esc(post.t)}</a></h3><div class="post-card-meta"><time>${post.d}</time></div>${
        post.e
          ? `<p class="post-card-excerpt">${this.esc(post.e)}</p>`
          : ""
      }${tags ? `<div class="post-card-tags">${tags}</div>` : ""}</div></article>`;
    },

    renderJSPagination() {
      if (!this.jsPagination) return;

      const totalPages = Math.ceil(this.filteredPosts.length / this.PER_PAGE);
      if (totalPages <= 1) {
        this.jsPagination.classList.remove("visible");
        return;
      }

      this.jsPagination.classList.add("visible");

      let html = "";
      if (this.currentPage > 1) {
        html += `<a href="#" class="prev" data-js-page="${this.currentPage - 1}">‹ 上一页</a>`;
      }

      for (let i = 1; i <= totalPages; i++) {
        if (i === this.currentPage) {
          html += `<span class="current">${i}</span>`;
        } else if (
          i === 1 ||
          i === totalPages ||
          Math.abs(i - this.currentPage) <= 2
        ) {
          html += `<a href="#" data-js-page="${i}">${i}</a>`;
        } else if (Math.abs(i - this.currentPage) === 3) {
          html += `<span class="gap">…</span>`;
        }
      }

      if (this.currentPage < totalPages) {
        html += `<a href="#" class="next" data-js-page="${this.currentPage + 1}">下一页 ›</a>`;
      }

      this.jsPagination.innerHTML = html;
    },

    goToPage(page) {
      this.currentPage = page;
      this.renderPage();
      this.filteredContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },

    clearFilter() {
      this.currentFilter = null;
      this.filteredPosts = [];
      this.currentPage = 1;

      // Restore static posts
      if (this.postsGrid) this.postsGrid.style.display = "";
      if (this.staticPagination) this.staticPagination.style.display = "";
      if (this.filteredContainer) {
        this.filteredContainer.classList.remove("visible");
        this.filteredContainer.innerHTML = "";
      }
      this.emptyEl?.classList.remove("visible");
      this.jsPagination?.classList.remove("visible");
      this.activeInfo?.classList.remove("visible");

      // Clear active states
      document
        .querySelectorAll(".tag.active, .year-archive-item.active")
        .forEach((el) => el.classList.remove("active"));

      // Clear search input
      const searchInput = document.querySelector(".search-input");
      if (searchInput) searchInput.value = "";

      // Clear URL hash
      if (location.hash) history.replaceState(null, "", location.pathname);
    },

    updateActiveInfo() {
      if (!this.activeInfo) return;

      const { type, value } = this.currentFilter;
      let label = "";
      if (type === "tag") label = `标签：${value}`;
      else if (type === "year") label = `年份：${value}`;
      else if (type === "search") label = `搜索：${value}`;

      this.activeInfo.innerHTML = `<span>${label}（${this.filteredPosts.length} 篇）</span><span class="filter-clear">清除筛选</span>`;
      this.activeInfo.classList.add("visible");

      // Highlight active tag/year
      document
        .querySelectorAll(".tag.active, .year-archive-item.active")
        .forEach((el) => el.classList.remove("active"));
      if (type === "tag") {
        document
          .querySelectorAll(`[data-filter-tag="${CSS.escape(value)}"]`)
          .forEach((el) => el.classList.add("active"));
      } else if (type === "year") {
        document
          .querySelectorAll(`[data-filter-year="${value}"]`)
          .forEach((el) => el.classList.add("active"));
      }

      // Update URL hash
      history.replaceState(
        null,
        "",
        `#${type}/${encodeURIComponent(value)}`
      );
    },

    showLoading(show) {
      this.loadingEl?.classList.toggle("visible", show);
    },

    esc(str) {
      if (!str) return "";
      const d = document.createElement("div");
      d.textContent = str;
      return d.innerHTML;
    },
  };

  /* ----------------------------------------------------------
     5. Giscus Lazy Loader
     - Only loads Giscus when comments section is near viewport
     - Uses IntersectionObserver with rootMargin for pre-loading
     - Saves 150-300KB on article pages where user doesn't scroll to comments
     ---------------------------------------------------------- */
  const LazyGiscus = {
    init() {
      const section = document.querySelector(".comments-section");
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadGiscus(section);
              observer.unobserve(section);
            }
          });
        },
        { rootMargin: "200px 0px" }
      );

      observer.observe(section);
    },

    loadGiscus(section) {
      const container = section.querySelector(".giscus-container");
      if (!container || container.dataset.loaded) return;

      const repo = container.dataset.repo || "";
      const repoId = container.dataset.repoId || "";
      const category = container.dataset.category || "";
      const categoryId = container.dataset.categoryId || "";
      const mapping = container.dataset.mapping || "pathname";
      const lang = container.dataset.lang || "zh-CN";
      const theme =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";

      const script = document.createElement("script");
      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", repo);
      script.setAttribute("data-repo-id", repoId);
      script.setAttribute("data-category", category);
      script.setAttribute("data-category-id", categoryId);
      script.setAttribute("data-mapping", mapping);
      script.setAttribute("data-strict", "0");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "top");
      script.setAttribute("data-theme", theme);
      script.setAttribute("data-lang", lang);
      script.setAttribute("data-loading", "lazy");
      script.crossOrigin = "anonymous";
      script.async = true;

      container.appendChild(script);
      container.dataset.loaded = "true";
    },
  };

  /* ----------------------------------------------------------
     6. Back to Top
     - Shows button after scrolling 400px
     - Uses requestAnimationFrame for scroll detection
     ---------------------------------------------------------- */
  const BackToTop = {
    init() {
      this.btn = document.querySelector(".back-to-top");
      if (!this.btn) return;

      let ticking = false;
      window.addEventListener("scroll", () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.btn.classList.toggle("visible", window.scrollY > 400);
            ticking = false;
          });
          ticking = true;
        }
      });

      this.btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
  };

  /* ----------------------------------------------------------
     7. Original Image Toggle
     - When enabled, removes weserv.nl proxy from article images
     - Preference saved in localStorage
     ---------------------------------------------------------- */
  const ImageToggle = {
    KEY: "original-images",
    init() {
      this.toggle = document.querySelector(
        ".original-image-toggle .toggle-switch"
      );
      if (!this.toggle) return;

      const saved = localStorage.getItem(this.KEY) === "true";
      this.toggle.classList.toggle("active", saved);
      this.toggle.setAttribute("aria-checked", saved);
      if (saved) this.applyOriginal(true);

      this.toggle.addEventListener("click", () => {
        const isActive = this.toggle.classList.toggle("active");
        this.toggle.setAttribute("aria-checked", isActive);
        localStorage.setItem(this.KEY, isActive);
        this.applyOriginal(isActive);
      });
    },
    applyOriginal(useOriginal) {
      const proxy = window.__IMG_PROXY__ || "";
      if (!proxy) return;

      document
        .querySelectorAll(".post-content img[src]")
        .forEach((img) => {
          if (useOriginal && img.src.includes("wsrv.nl")) {
            try {
              const url = new URL(img.src);
              const original = url.searchParams.get("url");
              if (original) img.src = original;
            } catch (e) {
              /* ignore malformed URLs */
            }
          } else if (!useOriginal && !img.src.includes("wsrv.nl")) {
            const baseUrl = img.src;
            if (baseUrl.startsWith("http")) {
              img.src = proxy + encodeURIComponent(baseUrl);
            }
          }
        });
    },
  };

  /* ----------------------------------------------------------
     8. WeChat QR Code
     - Toggles QR code popup on click
     - Generates QR if qrcode.js library is available
     ---------------------------------------------------------- */
  const WeChatQR = {
    init() {
      const btn = document.querySelector(".share-wechat");
      const popup = document.querySelector(".wechat-qr-popup");
      if (!btn || !popup) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        popup.classList.toggle("visible");
      });

      // Close on outside click
      document.addEventListener("click", (e) => {
        if (!popup.contains(e.target) && e.target !== btn) {
          popup.classList.remove("visible");
        }
      });

      // Generate QR if library is loaded
      if (typeof QRCode !== "undefined" && !popup.querySelector("canvas")) {
        const canvas = document.createElement("canvas");
        popup.insertBefore(canvas, popup.querySelector(".qr-label"));
        new QRCode(canvas, {
          text: location.href,
          width: 120,
          height: 120,
          correctLevel: QRCode.CorrectLevel.M,
        });
      }
    },
  };

  /* ----------------------------------------------------------
     9. Share Functions
     - Twitter/X, Weibo, Copy link
     - Uses window.open for social shares
     - Clipboard API for copy with visual feedback
     ---------------------------------------------------------- */
  const Share = {
    init() {
      document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-share]");
        if (!btn) return;

        const type = btn.dataset.share;
        const url = encodeURIComponent(location.href);
        const title = encodeURIComponent(document.title);

        switch (type) {
          case "twitter":
            window.open(
              `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
              "_blank",
              "width=600,height=400"
            );
            break;
          case "weibo":
            window.open(
              `https://service.weibo.com/share/share.php?url=${url}&title=${title}`,
              "_blank",
              "width=600,height=400"
            );
            break;
          case "copy":
            navigator.clipboard?.writeText(location.href).then(() => {
              const original = btn.innerHTML;
              btn.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
              setTimeout(() => (btn.innerHTML = original), 1500);
            });
            break;
        }
      });
    },
  };

  /* ----------------------------------------------------------
     10. Image Proxy Helper
     - Reads proxy URL from meta tag for JS card rendering
     ---------------------------------------------------------- */
  window.__IMG_PROXY__ =
    document.querySelector('meta[name="image-proxy"]')?.content || "";

  /* ----------------------------------------------------------
     Initialize All Modules
     ---------------------------------------------------------- */
  function init() {
    Theme.init();
    MobileNav.init();
    Carousel.init();
    Filter.init();
    LazyGiscus.init();
    BackToTop.init();
    ImageToggle.init();
    WeChatQR.init();
    Share.init();
  }

  // Script is deferred, DOM should be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
