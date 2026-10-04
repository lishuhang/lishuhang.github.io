# WebMCP 修复工作日志（2026-10-04）

背景：webmcp.com 扫描 lishuhang.me 报告 `status: no-tools`（report: db338265-b7bd-4a39-bf17-d1f1e973cee9，rubric v4）。
目标：让 webmcp.com 扫描器发现站点工具，页面 head 立即提示后端 MCP（mcp.lishuhang.com/mcp）。

## 根因分析

1. **致命 bug**（assets/js/webmcp.js）：`register()` 中引用了未声明变量 `registered`。
   在支持 WebMCP 的浏览器（`document.modelContext` 存在）里，读取未声明变量抛
   `ReferenceError`，IIFE 直接死亡 → `registerTool` 从未被调用 → 扫描器捕获不到任何注册。
   在不支持 WebMCP 的浏览器里虽不报错，但也无事发生。
2. **数据面缺口**：`window.__POSTS__` 仅首页加载（`__POSTS_DATA_URL__` 只注入 home 布局），
   文章页上即使注册成功，工具调用也无数据。
3. **缺静态声明通道**：目录内已收录站点（如 render.com）均带
   `<script id="webmcp" type="application/json">` 静态工具声明（webmcp/0.1 约定），
   供扫描器/agent 不执行 JS 即可读取。
4. **缺扫描引导**：webmcp.com 支持在 `/.well-known/webmcp.json` 提供 `pages` 数组，
   引导扫描器优先抓取代表性页面（webmcp.com 扩展字段）。

## 变更清单

- `assets/js/webmcp.js` 重写：
  - 声明 `registered`，修复 ReferenceError；
  - 按规范补 `title`、`annotations:{readOnlyHint:true}`、`additionalProperties:false`；
  - `registerTool` 返回 promise 时挂 `.catch`，避免 "browser rejected its registration"（评 C 级）；
  - 任意页面按需加载 `/assets/data/posts.js`（首次工具调用时注入 script 并缓存）；
  - 兼容 `document.modelContext` / `navigator.modelContext`，保留 `provideContext` 降级；
  - modelContext 就绪时机不定：300ms 轮询 ×33 次（约 10s）等待注入；
  - 调试出口 `window.__WEBMCP__`。
- `_includes/head.html`：
  - 新增 `<link rel="mcp" href="https://mcp.lishuhang.com/mcp">`（head 级 MCP 提示）；
  - 新增 `<script id="webmcp" type="application/json">` 静态声明
    （blog_get_index / blog_get_post_markdown / blog_get_agent_guide，指向真实 GET 端点）。
- 新增 `.well-known/webmcp.json`：spec/site/mcp/pages/sitemap；`_config.yml` 增加 `include: [.well-known]`。
- `_config.yml` exclude 增加 `docs`（本日志）与 `tmp`（12MB 调试 trace，无页面引用）。
- `llms.txt`：补 WebMCP 静态声明条目。
- 未改动任何 _posts 内容。

## 回滚方式

备份分支：`backup/pre-webmcp-fix-20261004`（改动前 HEAD = 23f5a88）。
`git checkout main && git reset --hard backup/pre-webmcp-fix-20261004 && git push --force origin main`

## 扫描器机制备忘（webmcp.com / W3C webmcp）

- 扫描器用 WebMCP-enabled 浏览器（如 Cloudflare Browser Run lab）逐页加载，经 CDP WebMCP
  域捕获注册（"captured registrations"），同时读取静态工具声明（"tool definitions"）；
  扫首页 + 最多 5 个后续页；工具执行与全站覆盖不在本次测试范围。
- 评分：C=浏览器拒绝注册；B-=schema/execute 无效；B=缺描述；A-=用途重叠/描述不清。
  静态声明与 JS 注册的工具名刻意错开，避免 "同名不同义" 触发 Uncertain evidence。
