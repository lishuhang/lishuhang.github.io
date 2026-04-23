# 航通社 — Jekyll 博客主题

## 概述

从 WordPress "minimal-blog" 主题迁移至纯静态 Jekyll 实现的个人博客主题。支持多标签文章筛选、年份存档、搜索引擎集成、Featured 轮播、三态深色模式、Giscus 评论等完整博客功能。

**部署地址**: https://lishuhang.me
**子站（每日 AIGC 早报）**: https://lishuhang.me/daily/ （独立主题，见 `daily-theme-readme.md`）

## 目录结构

```
jekyll-theme/
├── _config.yml          # 站点配置（标题、颜色、导航、评论等）
├── _layouts/
│   ├── base.html        # HTML 骨架（SVG 图标 + 布局容器 + 浮动按钮 + 数据嵌入）
│   ├── home.html        # 首页（Featured 轮播 + 过滤 + 文章列表 + 翻页）
│   ├── post.html        # 文章详情（题图 + 正文排版 + 分享 + 评论）
│   └── page.html        # 静态页面（关于等）
├── _includes/
│   ├── head.html        # <head>（SEO、字体、样式、主题色注入）
│   ├── header.html      # 顶部吸顶导航（Logo + 导航链接 + 汉堡按钮）
│   ├── sidebar.html     # 右侧边栏（搜索 + 导航 + 存档 + 标签 + 开关）
│   ├── post-card.html   # 文章卡片组件（题图 + 日期 + 标签 + 标题 + 摘要）
│   ├── comments.html    # Giscus 评论区域
│   └── share.html       # 分享按钮 + 微信二维码浮层
├── assets/
│   ├── style.css        # 全站样式（含响应式 + 深色模式）
│   ├── js/main.js       # 主题切换、轮播、翻页、搜索、筛选、缩放
│   └── logo.svg         # 站点 Logo
├── index.html           # 首页
├── about.md             # 关于页面
├── 404.html             # 404 页面（含最近文章建议）
├── feed.xml             # RSS 订阅
├── robots.txt           # 搜索引擎爬虫指令
├── CNAME                # 自定义域名
├── Gemfile              # Ruby 依赖
└── favicon.ico          # 网站图标
```

## _config.yml 配置项

### 基础设置

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `name` | 站点名称 | `"航通社"` |
| `title` | 页面标题 | `"航通社"` |
| `description` | 站点描述 | `"你应该知道的历史、现在和未来"` |
| `url` | 站点域名 | `"https://lishuhang.me"` |
| `domain` | 域名（用于搜索引擎） | `"lishuhang.me"` |
| `lang` | 语言代码 | `"zh"` |

### 外观

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `color` | 主题色（十六进制），影响全站 accent 颜色 | `"#347df8"` |
| `logo` | Logo 图片路径 | `"/assets/logo.svg"` |
| `show_title` | 是否显示站名和描述文字 | `true` |
| `header_accent_bg` | 页眉是否使用主题色背景（浅色文字） | `false` |
| `copyright` | 侧边栏版权文字（支持 Markdown） | `"© 2025 书航 ..."` |

### 功能集成

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `google_analytics` | Google Analytics ID（留空不加载） | `""` |
| `google_site_verification` | Google 站点验证（留空不加载） | `""` |
| `bing_site_verification` | Bing 站点验证（留空不加载） | `""` |
| `robots` | robots meta 标签内容 | `"index, follow, ..."` |

### 评论（Giscus）

在文章页面底部集成 Giscus 评论系统，通过 `comments.html` 实现。需在 `post.html` 的 front matter 或侧边栏中配置 Giscus 参数。

## 文章 Front Matter

```yaml
---
layout: post
title: "文章标题"
date: 2025-01-01
image: "https://example.com/cover.jpg"   # 题图（可选）
tags: [标签1, 标签2]                       # 标签（可选）
---
正文内容（支持 Markdown / HTML）...
```

- `image` 字段用于文章列表的卡片缩略图、文章页顶部大图。通过 weserv.nl CDN 自动压缩。
- `tags` 字段支持多标签。标签 `AIGC` 为特殊标签，会被首页过滤排除（用于每日早报子站）。
- 文章 URL 格式：`/posts/:year/:month/:day/:title/`

## 功能特性

### 首页

- **Featured 轮播**: 带 `featured` 标签的最新 5 篇文章自动轮播，支持鼠标悬停暂停、触屏滑动、左右箭头、圆点导航
- **文章列表**: 卡片式布局，带封面图、日期、标签、标题、摘要
- **多维度筛选**: 按标签 (`?tag=xxx`)、按年份 (`?year=xxxx`)、站内搜索 (`?search=xxx`)
- **翻页**: 每页 10 篇，支持页码跳转

### 侧边栏

- **多引擎搜索**: 站内 / Google / Bing 三种搜索模式（单选切换）
- **年份存档选择器**: 12 年一组翻页，显示每年文章数
- **标签云**: 所有标签一键筛选
- **原图切换**: 通过 weserv.nl CDN 缩放 vs 原始图片
- **三态主题切换**: 浅色 / 跟随系统 / 深色
- **版权信息**

### 文章详情页

- 顶部大图（16:9 比例）
- 完整排版支持：标题层级、代码块、表格、引用、列表
- 分享按钮：微博 / Twitter / QQ / 微信二维码 / 复制链接
- 上一篇 / 下一篇导航
- Giscus 评论系统

### 响应式布局

视口宽度从窄到宽的渐进式适配：

| 视口宽度 | 布局特征 |
|----------|---------|
| < 640px | 卡片无缩略图，汉堡菜单，单栏 |
| 640 – 1149px | 卡片带缩略图，全宽布局，侧边栏隐藏（汉堡菜单唤出） |
| ≥ 1150px | 双栏布局（文章列表 + 右侧边栏） |
| ≥ 1800px | 全页等比例放大（zoom），内容区 ≥ 2/3 视口 |

### 深色模式

三态切换（浅色 / 跟随系统 / 深色），设置存于 `localStorage`（key: `theme`）。Giscus 评论主题随页面主题联动。

### 404 页面

显示最近发布的文章列表作为导航建议，帮助用户找回内容。

## 技术实现

### 数据嵌入

首页通过 Jekyll Liquid 将全部文章数据嵌入 `<script>` 标签：

- `window.__POSTS__`: 文章全量数据数组
- `window.__TI__`: 标签 → 文章索引映射
- `window.__YI__`: 年份 → 文章索引映射

JavaScript 在客户端读取这些预建索引实现标签筛选和年份筛选，无需 API 请求。

### CSS 变量主题系统

所有颜色通过 CSS 自定义属性定义。主题色由 `_config.yml` 的 `color` 字段通过 `head.html` 内联脚本动态计算并注入 `--accent`、`--accent-hover`、`--accent-light` 三个变量。

### 无构建依赖

纯静态 Jekyll 主题，CSS 和 JS 均为手写，未使用任何预处理器或打包工具。唯一的运行时 JS 依赖是 Giscus 评论系统（外部脚本）。

## 部署方法

1. 将主题文件放入仓库根目录
2. 在 `_posts/` 目录下添加文章（`YYYY-MM-DD-title.md` 格式）
3. 按需修改 `_config.yml`
4. 如需评论，配置 `comments.html` 中的 Giscus 参数
5. 推送到 GitHub Pages

## 浏览器兼容

- Chrome 80+ / Firefox 78+ / Safari 14+ / Edge 80+
- 依赖 `aspect-ratio`、`zoom`、CSS Grid、`position: sticky` 等现代特性

---

## Changelog

### v6.3.0 (2026-04-22)
- **性能优化（初版）**: 尝试将 1MB 内嵌 JSON 数据移至独立 `posts.js` 文件以利用浏览器缓存；Jekyll paginator 实现静态分页；内联关键 CSS + 异步加载完整样式表；字体从 973KB earlyaccess CSS 精简为 400/700 两个字重；Giscus 评论改为 IntersectionObserver 懒加载；文章页不再加载 posts.js；年份归档改为 Liquid 服务端生成；图片添加 `decoding=async`；深色模式防闪烁内联脚本
- **崩溃修复**: v6.3.0 性能优化导致站点崩溃（首页显示原始 YAML），修复三个问题：
  1. 布局文件（`home.html`、`post.html`、`page.html`）HTML 注释出现在 YAML front matter `---` 之前，Jekyll 要求 `---` 必须在文件绝对开头 → 将注释移至 front matter 之后
  2. `.nojekyll` 文件导致 GitHub Pages 跳过 Jekyll 处理 → 删除该文件
  3. `Gemfile` 插件配置有误 → 将所有插件移入 `:jekyll_plugins` 组，添加缺失的 `jekyll-feed` 和 `jekyll-seo-tag`
- **7 项功能回归修复**: 与原版主题逐项对比后恢复以下功能：
  1. **图片修复**: 恢复原版 weserv 缩略图 URL 构造方式，JS `createCard` 添加 weserv 缩略参数，文章页题图 `data-original` 属性
  2. **年份选择器**: 恢复日历式 3×4 网格选择器（替换摊开列表视图），12 年一组翻页
  3. **Featured 轮播**: 仅显示 `tag=featured` 的最新 5 篇文章（非简单有图文章），筛选/搜索/年份页面自动隐藏
  4. **搜索引擎**: 百度替换为 Bing，侧边栏搜索框增加站内/Google/Bing 单选切换
  5. **标签选择器**: 移除 Featured 轮播下方重复的标签选择器，仅保留侧边栏标签云
  6. **Blockquote 样式**: 引用块背景色恢复为 `var(--bg-secondary)`，与原版一致
  7. **Giscus 评论**: 恢复页面加载时直接初始化（非懒加载），启用 `emit-metadata=1` 支持评论计数，文章页 header 显示评论数
- **其他原版功能恢复**: SVG sprite 图标（分享按钮等）、内联 `__YD__` 和 `__POSTS__` 数据（替代外部 posts.js）、原版文章详情页布局、三态主题切换、微信分享二维码、QQ 分享、文章外链新标签页、图片懒加载、超宽屏缩放、原版分享按钮（微博/Twitter/QQ/微信/复制链接）

### v6.2.0 (2026-04-11)
- **响应式布局优化**: 中等页宽（640-1149px）时文章列表全宽显示，不再受 1200px 最大宽度限制，消除右侧空白
- 调整缩略图隐藏阈值从 780px 降至 640px，更精确地适配窄屏
- 窄屏 (<640px) 时 header 内边距收紧为 16px

### v6.1.0
- Giscus 评论计数联动（文章页 header 显示评论数）
- 文章图片懒加载 + fetchPriority 低优先级标记
- 404 页面增加最近文章建议列表

### v6.0.0
- 完整重写：从 WordPress "minimal-blog" 迁移至纯静态 Jekyll
- 右侧边栏（搜索、存档、标签、开关）
- Featured 轮播、标签筛选、年份筛选、站内搜索
- 三态主题切换、深色模式
- 超宽屏自适应缩放
- 移动端汉堡菜单
