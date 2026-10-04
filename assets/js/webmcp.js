/* 航通社 WebMCP 工具注册（浏览器端，W3C webmcp 提案）
 * 规范：https://webmachinelearning.github.io/webmcp/
 * 注册 API：document.modelContext.registerTool（兼容 navigator.modelContext）
 * 数据源：/assets/data/posts.js 的 window.__POSTS__（任何页面首次调用工具时按需加载并缓存）
 * 已收录于 https://webmcp.com —— 扫描器（WebMCP-enabled 浏览器）可捕获本脚本的工具注册
 */
(function () {
  'use strict';

  var DATA_URL = window.__POSTS_DATA_URL__ || '/assets/data/posts.js';
  var registered = false; // 修复：此前引用了未声明的 registered 变量，导致支持 WebMCP 的浏览器中注册脚本直接抛 ReferenceError
  var tries = 0;
  var postsPromise = null;

  function getModelContext() {
    try { if (document.modelContext && typeof document.modelContext.registerTool === 'function') return document.modelContext; } catch (e) {}
    try { if (navigator.modelContext && typeof navigator.modelContext.registerTool === 'function') return navigator.modelContext; } catch (e) {}
    return null;
  }

  function getAnyModelContext() {
    try { if (document.modelContext) return document.modelContext; } catch (e) {}
    try { if (navigator.modelContext) return navigator.modelContext; } catch (e) {}
    return null;
  }

  function loadPosts() {
    if (Array.isArray(window.__POSTS__) && window.__POSTS__.length) return Promise.resolve(window.__POSTS__);
    if (postsPromise) return postsPromise;
    postsPromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = DATA_URL;
      s.onload = function () {
        var all = window.__POSTS__;
        if (Array.isArray(all) && all.length) resolve(all);
        else reject(new Error('文章索引为空或格式不正确：' + DATA_URL));
      };
      s.onerror = function () {
        postsPromise = null;
        reject(new Error('文章索引加载失败：' + DATA_URL));
      };
      document.head.appendChild(s);
    });
    return postsPromise;
  }

  function item(p, i) {
    return {
      index: i,
      title: p.t,
      date: p.d,
      url: location.origin + p.u,
      tags: (p.g || '').split(',').filter(Boolean),
      excerpt: p.e || '',
      cover: p.i || null
    };
  }

  var tools = [
    {
      name: 'blog_list_posts',
      title: '列出博客文章',
      description: '按发布时间倒序分页列出航通社（lishuhang.me，书航的博客）全部文章，返回每篇的序号、标题、日期、链接、标签与摘要。本工具不返回正文；读取正文请用 blog_read_post。',
      inputSchema: {
        type: 'object',
        properties: {
          page: { type: 'number', description: '页码，从 1 开始，默认 1', minimum: 1 },
          pageSize: { type: 'number', description: '每页条数，默认 20，最大 50', minimum: 1, maximum: 50 }
        },
        additionalProperties: false
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        args = args || {};
        var all = await loadPosts();
        var pageSize = Math.min(Math.max(Math.floor(args.pageSize || 20) || 20, 1), 50);
        var page = Math.max(Math.floor(args.page || 1) || 1, 1);
        var start = (page - 1) * pageSize;
        var items = all.slice(start, start + pageSize).map(item);
        return { total: all.length, page: page, pageSize: pageSize, posts: items };
      }
    },
    {
      name: 'blog_search_posts',
      title: '搜索博客文章',
      description: '在航通社（lishuhang.me）全站文章的标题、标签与摘要中搜索关键词，返回命中的文章列表（含标题、日期、链接、摘要），不含正文。多个关键词用空格分隔，命中任一词即返回，命中词数多的排前面。',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '搜索关键词，支持中文或英文，如「大连 足球」' },
          limit: { type: 'number', description: '返回条数上限，默认 10，最大 30', minimum: 1, maximum: 30 }
        },
        required: ['query'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        args = args || {};
        var q = String(args.query || '').trim();
        if (!q) throw new Error('缺少必填参数 query（搜索关键词）');
        var tokens = q.split(/\s+/);
        var limit = Math.min(Math.max(Math.floor(args.limit || 10) || 10, 1), 30);
        var all = await loadPosts();
        var scored = [];
        all.forEach(function (p, i) {
          var t = p.t || '', e = p.e || '', g = p.g || '';
          var score = 0;
          tokens.forEach(function (tk) {
            if (!tk) return;
            if (t.indexOf(tk) !== -1) score += 5;
            if (g.indexOf(tk) !== -1) score += 3;
            if (e.indexOf(tk) !== -1) score += 1;
          });
          if (score > 0) scored.push({ score: score, p: p, i: i });
        });
        scored.sort(function (a, b) { return b.score - a.score; });
        return { query: q, hits: scored.length, results: scored.slice(0, limit).map(function (s) { var it = item(s.p, s.i); it.score = s.score; return it; }) };
      }
    },
    {
      name: 'blog_read_post',
      title: '读取博客文章正文',
      description: '读取航通社（lishuhang.me）某篇文章的全文，返回文章标题与正文纯文本。url 须为本站文章链接，可从 blog_list_posts 或 blog_search_posts 的结果中获得。',
      inputSchema: {
        type: 'object',
        properties: {
          url: { type: 'string', description: '文章链接，完整 URL 或站内相对路径，如 /posts/2026/08/31/cong-da-lian-mei-you-hu/' }
        },
        required: ['url'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        args = args || {};
        var u = String(args.url || '').trim();
        if (!u) throw new Error('缺少必填参数 url（文章链接）');
        if (u.indexOf('/') === 0) u = location.origin + u;
        if (!/^https?:\/\/(www\.)?lishuhang\.me\//.test(u)) {
          throw new Error('仅支持 lishuhang.me 站内文章链接，请先调用 blog_list_posts 或 blog_search_posts 获取有效链接');
        }
        var res = await fetch(u, { credentials: 'omit' });
        if (!res.ok) throw new Error('HTTP ' + res.status + '，无法读取 ' + u);
        var html = await res.text();
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var title = (doc.querySelector('h1') || {}).textContent || doc.title || '';
        var art = doc.querySelector('article') || doc.querySelector('main') || doc.body;
        var text = (art.innerText || art.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
        if (!text) throw new Error('文章内容为空，请确认链接指向文章页（/posts/ 开头）');
        return { url: u, title: title.trim(), text: text };
      }
    }
  ];

  function register() {
    if (registered) return true;
    var mc = getModelContext();
    if (!mc) return false;
    var ok = 0, fail = 0;
    tools.forEach(function (t) {
      try {
        var r = mc.registerTool(t);
        if (r && typeof r.then === 'function') {
          r.then(function () {}, function (err) {
            console.warn('[webmcp] 注册被浏览器拒绝:', t.name, err && (err.message || err));
          });
        }
        ok++;
      } catch (e) {
        fail++;
        console.warn('[webmcp] 注册失败:', t.name, e && (e.message || e));
      }
    });
    if (ok > 0) {
      registered = true;
      console.log('[webmcp] 已向浏览器 Agent 注册 ' + ok + ' 个博客工具: ' + tools.map(function (t) { return t.name; }).join(', '));
    }
    window.__WEBMCP__ = { registered: registered, ok: ok, fail: fail, tools: tools.map(function (t) { return t.name; }), dataUrl: DATA_URL };
    return ok > 0;
  }

  // 兼容旧式 provideContext API（如存在且 registerTool 不可用）
  function provideFallback() {
    var mc = getAnyModelContext();
    if (mc && typeof mc.provideContext === 'function') {
      try {
        mc.provideContext({ tools: tools.map(function (t) {
          return { name: t.name, title: t.title, description: t.description, inputSchema: t.inputSchema, annotations: t.annotations };
        }) });
        registered = true;
        window.__WEBMCP__ = { registered: true, via: 'provideContext', tools: tools.map(function (t) { return t.name; }), dataUrl: DATA_URL };
        console.log('[webmcp] 已通过 provideContext 提交 ' + tools.length + ' 个工具定义');
        return true;
      } catch (e) { console.warn('[webmcp] provideContext 失败:', e && (e.message || e)); }
    }
    return false;
  }

  if (!register()) {
    // modelContext 可能由浏览器 agent 注入，时机不定：轮询等待约 10 秒
    var timer = setInterval(function () {
      tries++;
      if (register() || provideFallback() || tries > 33) clearInterval(timer);
    }, 300);
  }
})();
