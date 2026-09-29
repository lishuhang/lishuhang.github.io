/* 航通社 WebMCP 工具注册（浏览器端，W3C webmcp 提案）
 * 数据源：/assets/data/posts.js 的 window.__POSTS__（首页异步加载，工具调用时惰性读取）
 * 注册 API：document.modelContext.registerTool（兼容 navigator.modelContext）
 * 已收录于 https://webmcp.com —— 提交收录后 agent 目录可直接发现本站工具
 */
(function () {
  'use strict';

  function getModelContext() {
    try { if (document.modelContext) return document.modelContext; } catch (e) {}
    try { if (navigator.modelContext) return navigator.modelContext; } catch (e) {}
    return null;
  }

  function posts() { return window.__POSTS__ || []; }

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
      description: '按发布时间倒序分页列出航通社（lishuhang.me）全部文章：序号、标题、日期、链接、标签与摘要。不返回正文，正文用 blog_read_post。',
      inputSchema: {
        type: 'object',
        properties: {
          page: { type: 'number', description: '页码，从 1 开始，默认 1' },
          pageSize: { type: 'number', description: '每页条数，默认 20，最大 50' }
        }
      },
      execute: async function (args) {
        args = args || {};
        var all = posts();
        var pageSize = Math.min(Math.max(args.pageSize || 20, 1), 50);
        var page = Math.max(args.page || 1, 1);
        var start = (page - 1) * pageSize;
        var items = all.slice(start, start + pageSize).map(item);
        return { total: all.length, page: page, pageSize: pageSize, posts: items };
      }
    },
    {
      name: 'blog_search_posts',
      description: '在航通社全站文章的标题、标签与摘要中做关键词搜索，返回命中列表（不含正文）。',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '关键词，可含多个空格分隔的词（命中任一即返回，按命中词数排序）' },
          limit: { type: 'number', description: '返回条数上限，默认 10，最大 30' }
        }
      },
      execute: async function (args) {
        args = args || {};
        var q = (args.query || '').trim();
        if (!q) return { query: q, hits: 0, results: [] };
        var tokens = q.split(/\s+/);
        var limit = Math.min(Math.max(args.limit || 10, 1), 30);
        var scored = [];
        posts().forEach(function (p, i) {
          var hay = [p.t || '', p.e || '', p.g || ''].join('\n');
          var score = 0;
          tokens.forEach(function (tk) {
            if (!tk) return;
            if ((p.t || '').indexOf(tk) !== -1) score += 5;
            if ((p.g || '').indexOf(tk) !== -1) score += 3;
            if ((p.e || '').indexOf(tk) !== -1) score += 1;
          });
          if (score > 0) scored.push({ score: score, p: p, i: i });
        });
        scored.sort(function (a, b) { return b.score - a.score; });
        return { query: q, hits: scored.length, results: scored.slice(0, limit).map(function (s) { var it = item(s.p, s.i); it.score = s.score; return it; }) };
      }
    },
    {
      name: 'blog_read_post',
      description: '读取航通社某篇文章的正文文本（按 URL）。返回标题、发布日期与正文纯文本。',
      inputSchema: {
        type: 'object',
        properties: {
          url: { type: 'string', description: '文章链接（站内相对路径或完整 URL，须为 lishuhang.me 文章页）' }
        },
        required: ['url']
      },
      execute: async function (args) {
        args = args || {};
        var u = args.url || '';
        if (u.indexOf('/') === 0) u = location.origin + u;
        if (u.indexOf('lishuhang.me') === -1) return { error: '仅支持 lishuhang.me 站内文章链接' };
        var res = await fetch(u, { credentials: 'omit' });
        if (!res.ok) return { error: 'HTTP ' + res.status + '，请确认链接来自 blog_list_posts 或 blog_search_posts 的结果' };
        var html = await res.text();
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var title = (doc.querySelector('h1') || {}).textContent || doc.title || '';
        var art = doc.querySelector('article') || doc.querySelector('main') || doc.body;
        var text = (art.innerText || art.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
        return { url: u, title: title.trim(), text: text };
      }
    }
  ];

  function register() {
    var mc = getModelContext();
    if (!mc || typeof mc.registerTool !== 'function' || registered) return false;
    var ok = 0;
    tools.forEach(function (t) {
      try { mc.registerTool(t, {}); ok++; } catch (e) { console.warn('[webmcp] 注册失败:', t.name, e); }
    });
    if (ok > 0) {
      registered = true;
      console.log('[webmcp] 已向浏览器 Agent 注册 ' + ok + ' 个博客工具');
    }
    return ok > 0;
  }

  if (!register()) {
    // modelContext 尚未就绪时短暂等待（浏览器 agent 注入时机不定）
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      if (register() || tries > 50) clearInterval(timer);
    }, 200);
  }
})();
