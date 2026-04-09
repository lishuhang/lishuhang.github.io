# 航通社 Jekyll 主题 — 纯静态极简版

## 改造背景

航通社官网（lishuhang.me）自 2015 年建站以来经历了多次技术栈变迁：WordPress → Jekyll → Docsify → Jekyll + SPA（单页应用）。2025 年 10 月，使用 Manus AI 将站点改造为基于 Jekyll 静态生成 + JavaScript SPA 的混合架构。该架构虽然在用户体验上实现了流畅的无刷新导航，但引入了大量 JavaScript 逻辑（约 1300 行），导致页面加载时间过长，尤其是在中国大陆无 CDN 的情况下表现更为明显。

本次改造的核心目标是：**在保留所有现有功能的前提下，将 SPA 架构回归纯静态 Jekyll，最大程度减少页面计算量和 JavaScript 体积，提升加载速度和浏览器兼容性。**

## 改造原则

1. **极简优先**：每新增一行代码都必须有充分理由，能省则省
2. **零 SPA 依赖**：彻底去除 JavaScript 路由、fetch 内容加载、History API 管理、MutationObserver 等重型机制
3. **功能不减少**：旧版所有用户可感知的功能必须保留
4. **无痛迁移**：保持与现有仓库的文件结构兼容，可直接替换文件上线
5. **零构建依赖**：去除 Node.js / Tailwind CSS 构建步骤，纯 Ruby + Jekyll 即可运行

## 架构对比

### 旧版（SPA 架构）

```
用户访问文章 URL (/posts/2025/...)
    ↓
post.html 检测到浏览器直接访问
    ↓
JavaScript 重定向到 /?post=/posts/2025/...
    ↓
home.html 加载（含全部文章 DOM + 1300 行 JS）
    ↓
JS 读取 URL 参数，fetch 文章 HTML
    ↓
DOMParser 解析 HTML，提取内容
    ↓
JS 清理冗余元素（标题、日期、分割线等）
    ↓
动态注入到 #postView 容器
    ↓
更新 History API、页面标题
```

**问题**：首次加载需要执行大量 JS、发起 fetch 请求、解析 HTML，阻塞渲染。

### 新版（纯静态架构）

```
用户访问文章 URL (/posts/2025/...)
    ↓
post.html 直接渲染完整 HTML（服务端由 Jekyll 生成）
    ↓
浏览器展示页面（零 JS 阻塞）
```

**优势**：文章页面是预生成的完整 HTML，浏览器直接渲染，无需任何 JavaScript 计算。

## 文件结构

```
├── _config.yml              # 站点配置（保持不变）
├── _layouts/
│   ├── base.html            # 基础布局（极简，约 30 行 HTML）
│   ├── home.html            # 首页（文章列表，无 JS 逻辑）
│   ├── post.html            # 文章页（直接渲染内容，非重定向）
│   └── page.html            # 静态页面（直接渲染内容，非重定向）
├── _includes/
│   ├── head.html            # <head> 元素（meta、CSS）
│   ├── sidebar.html         # 侧边栏（Logo、搜索、标签、年份、导航、开关）
│   ├── post-card.html       # 文章卡片组件
│   ├── share.html           # 分享按钮（微博、Twitter/X、复制链接）
│   └── comments.html        # Giscus 评论系统
├── assets/
│   ├── style.css            # 全站样式（纯 CSS，含深色模式，约 350 行）
│   ├── js/
│   │   └── main.js          # 全站 JS（约 150 行，详见下方）
│   └── logo.svg             # 站点 Logo
├── index.md                 # 首页
├── about.md                 # 关于页
├── 404.html                 # 404 页面
├── feed.xml                 # RSS 订阅
├── CNAME                    # 自定义域名
├── Gemfile                  # Ruby 依赖（Jekyll 4.3 + feed + SEO）
├── .ruby-version            # Ruby 版本（3.2.2）
├── .github/workflows/jekyll.yml  # GitHub Pages CI/CD
└── README.md                # 本文件
```

### 相比旧版删除的文件

- `_includes/navbar.html` — 旧版遗留的导航栏（未被使用）
- `_includes/footer.html` — 旧版遗留的页脚（未被使用，使用 Tailwind 类）
- `assets/dist-style.css` — Tailwind CSS 编译产物（14KB），已用 200 字节的 CSS Reset 替代
- `package.json` — Node.js 依赖（不再需要 Tailwind 构建）
- `tailwind.config.js` — Tailwind 配置（不再需要）

## JavaScript 体积对比

| 功能 | 旧版 (行数) | 新版 (行数) | 说明 |
|------|:-----------:|:-----------:|------|
| 深色模式 | ~60 | ~30 | 简化主题切换逻辑 |
| 移动端菜单 | ~15 | ~20 | 相当 |
| 回到顶部 | ~60 | ~10 | 去掉 SPA 容器检测 |
| URL 过滤 | ~200 | ~60 | 仅 CSS display 切换 |
| 搜索 | ~80 | 含在过滤中 | 300ms 防抖 |
| 原图切换 | ~50 | ~35 | 仅处理当前页图片 |
| SPA 路由 | ~400 | **0** | 完全移除 |
| History API | ~200 | **0** | 完全移除 |
| Fetch 内容加载 | ~100 | **0** | 完全移除 |
| DOMParser / 内容清洗 | ~80 | **0** | 完全移除 |
| MutationObserver | ~20 | **0** | 完全移除 |
| Popstate 监听 | ~60 | **0** | 完全移除 |
| 无限滚动 | ~40 | **0** | 全部文章直接展示 |
| 浮动按钮 | ~80 | **0** | 合并到 base.html HTML |
| 文章元数据 JSON | N/A (内联) | **0** | 不再需要 |
| **合计** | **~1,445** | **~155** | **减少 89%** |

## 功能对照清单

| 功能 | 旧版实现 | 新版实现 | 状态 |
|------|---------|---------|:----:|
| 文章列表 | SPA DOM 显示/隐藏 | Jekyll 静态渲染全部卡片 | ✅ |
| 文章详情 | JS fetch + DOMParser | Jekyll 直接渲染完整 HTML | ✅ |
| 标签过滤 | JS 过滤 + History API | URL 参数 + JS CSS display | ✅ |
| 年份过滤 | JS 过滤 + History API | URL 参数 + JS CSS display | ✅ |
| 搜索 | JS 实时搜索 + 防抖 | 同上 | ✅ |
| AIGC 文章分离 | JS DOM 隐藏 | Jekyll `unless` 模板过滤 | ✅ |
| AIGC 早报入口 | 侧边栏链接 | 侧边栏链接（不变） | ✅ |
| 深色模式 | CSS 变量 + localStorage | 同上 | ✅ |
| 原图切换 | JS 动态修改 src | 同上（仅当前页） | ✅ |
| Giscus 评论 | 动态创建 script | 动态创建 script | ✅ |
| 分享按钮 | 微博/Twitter/复制 | 同上 | ✅ |
| 上一篇/下一篇 | JS 加载 | HTML `<a>` 链接 | ✅ |
| 移动端响应 | 汉堡菜单 + 侧边栏 | 同上 | ✅ |
| 回到顶部 | 浮动按钮 | 同上 | ✅ |
| 图片压缩 | Weserv CDN 代理 | 同上 | ✅ |
| RSS 订阅 | feed.xml | 不变 | ✅ |
| SEO | jekyll-seo-tag | 不变 | ✅ |
| 自定义域名 | CNAME | 不变 | ✅ |
| GitHub Pages 部署 | Actions CI/CD | 不变 | ✅ |
| 无限滚动加载 | JS 滚动检测 + DOM 显示 | 全部渲染（无滚动加载） | ✅* |
| 加载遮罩 | HTML overlay + JS | 移除 | ⚡ |
| 返回首页浮动按钮 | JS 检测文章视图 | 移除（浏览器后退即可） | ✅* |

*标注说明：*
- *无限滚动*：旧版用 JS 逐步显示隐藏的 DOM 元素，新版直接渲染全部文章卡片。由于所有文章卡片在旧版也存在于 DOM 中（只是隐藏），新版实际上是去掉了多余的 JS 逻辑而非增加 DOM 开销。对于 300+ 篇文章，首屏渲染可能略慢，但省去了所有 JS 执行时间。
- *返回首页按钮*：在纯静态架构下，浏览器原生的前进/后退按钮已足够，无需额外的 JS 浮动按钮。

## 样式系统

### 去除 Tailwind CSS 的考量

旧版使用 Tailwind CSS v4 + `@tailwindcss/typography` 插件，编译后生成 `dist-style.css`（约 14KB）。但在实际使用中，站点的核心样式全部写在 `style.css`（约 425 行自定义 CSS），Tailwind 仅用于：
1. CSS Reset / Normalize（替代方案：200 字节手写 reset）
2. `.prose` 排版类（替代方案：已在 `style.css` 中手写了完整的文章排版样式）
3. `navbar.html` 和 `footer.html` 中的遗留 utility 类（替代方案：这些文件已不再使用）

因此，去除 Tailwind 后：
- **节省 14KB** CSS 体积
- **去除 Node.js 构建依赖**（不再需要 `package.json`、`tailwind.config.js`、`node_modules/`）
- **简化部署流程**（仅需 `bundle install` + `jekyll build`）
- **零功能损失**（所有需要的样式已在 `style.css` 中实现）

### CSS 架构

```
style.css
├── CSS Reset（200 字节，替代 Tailwind Preflight）
├── CSS Variables（颜色、间距、字体系统）
├── 通用组件（Toggle 开关、浮动按钮）
├── 侧边栏布局（固定 280px 左侧栏）
├── 主内容区 + 文章卡片（Grid 布局）
├── 文章详情页（排版、导航、分享）
├── 404 页面
├── 移动端适配（768px 断点）
└── 深色模式（data-theme 属性切换）
```

深色模式配色参考 GitHub Dark 主题（`#0D1117` / `#161b22` / `#21262d`），与旧版保持一致。

## 关键设计决策

### 1. 为什么保留 URL 参数过滤而非生成分页？

Jekyll 在 GitHub Pages 上不支持自定义插件，无法为每个标签和年份生成独立的静态页面。使用 URL 参数（`/?tag=科技`、`/?year=2024`）配合客户端 JS 过滤是唯一不需要自定义插件的方案。

过滤逻辑极其轻量：遍历文章卡片的 `data-*` 属性，设置 `style.display`。整个过程不到 60 行 JS，执行时间在毫秒级别。

### 2. 为什么文章列表不使用分页？

旧版虽然名义上是"无限滚动加载"，但实际上所有文章卡片在 DOM 中都已存在，JS 只是在滚动到底部时逐步显示隐藏的元素。因此，旧版的 DOM 体积与新版完全相同。

分页反而会增加复杂度（需要 `jekyll-paginate` 插件，或自定义分页逻辑），且与 URL 参数过滤不兼容（分页后过滤只能看到当前页的文章）。直接渲染全部文章是最简单、最一致的方案。

### 3. 为什么移除加载遮罩？

旧版需要加载遮罩是因为 SPA 需要时间初始化（解析文章元数据 JSON、设置事件监听、检查 URL 参数、可能还要 fetch 文章内容）。在纯静态架构下，页面由 Jekyll 预生成，浏览器直接渲染 HTML，不需要任何初始化等待时间。

### 4. 图片压缩策略

保留 Weserv CDN 代理方案。文章列表的缩略图始终使用压缩版（400×200, q=80），文章详情页的图片默认使用压缩版，用户可通过"原图"开关切换。

与旧版的区别：旧版的原图切换需要在 SPA 内部遍历动态注入的 DOM 元素，新版只需遍历当前页面已有的 `<img>` 元素，逻辑更简单。

### 5. Giscus 评论

保留 Giscus 评论系统（基于 GitHub Discussions），配置参数不变。评论使用 `specific` 映射模式，以页面 URL 作为唯一标识。

与旧版的区别：旧版在 SPA 内部动态创建 Giscus script 并需要在视图切换时清理，新版每个页面独立加载，无需清理逻辑。

## 迁移指南

### 从旧版升级

1. **替换以下文件**（新版文件直接覆盖旧版对应文件）：
   ```
   _layouts/base.html      ← 完全重写
   _layouts/home.html      ← 完全重写
   _layouts/post.html      ← 完全重写（从重定向改为直接渲染）
   _layouts/page.html      ← 完全重写（从重定向改为直接渲染）
   _includes/head.html     ← 简化（移除 Tailwind 依赖）
   _includes/sidebar.html  ← 新建（从 home.html 中提取）
   _includes/post-card.html ← 新建（从 home.html 中提取）
   _includes/share.html    ← 新建（分享按钮组件）
   _includes/comments.html ← 新建（评论组件）
   assets/style.css        ← 重写（移除 Tailwind import，添加 reset）
   assets/js/main.js       ← 新建（替代 1300 行内联 JS）
   404.html                ← 更新（使用 CSS 类替代内联样式）
   ```

2. **删除以下文件**（旧版遗留，不再需要）：
   ```
   _includes/navbar.html   ← 旧版遗留，未被使用
   _includes/footer.html   ← 旧版遗留，未被使用
   assets/dist-style.css   ← Tailwind 编译产物，已用 CSS Reset 替代
   package.json            ← Node.js 依赖，不再需要
   tailwind.config.js      ← Tailwind 配置，不再需要
   node_modules/           ← Node.js 包目录
   ```

3. **保留不变的文件**：
   ```
   _config.yml             ← 站点配置
   _posts/                 ← 所有文章（Markdown 文件）
   index.md                ← 首页
   about.md                ← 关于页
   feed.xml                ← RSS 订阅
   CNAME                   ← 自定义域名
   Gemfile                 ← Ruby 依赖
   .ruby-version           ← Ruby 版本
   .github/workflows/      ← CI/CD 配置
   assets/logo.svg         ← 站点 Logo
   favicon.ico             ← 网站图标
   ```

4. **验证**：
   ```bash
   bundle install
   bundle exec jekyll serve
   ```
   访问 `http://localhost:4000` 检查所有页面是否正常。

### 注意事项

- `_posts/` 目录中的文章无需任何修改，所有 front matter（`title`、`date`、`tags`、`image`、`author` 等）格式完全兼容
- 文章的 permalink 结构 `/posts/:year/:month/:day/:title/` 保持不变，所有现有 URL 继续有效
- Giscus 评论的 `data-term` 使用页面 URL，与旧版保持一致，现有评论不会丢失
- 深色模式和原图偏好的 `localStorage` 键名（`theme`、`useOriginalImage`）保持不变

## 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| 静态站点生成 | Jekyll 4.3 | GitHub Pages 原生支持 |
| 样式 | 纯 CSS + CSS Variables | 无预处理器，无框架 |
| JavaScript | 原生 ES5+ | 无框架，无 polyfill |
| 评论 | Giscus | GitHub Discussions 托管 |
| 图片优化 | Weserv CDN | 开源图片代理服务 |
| 字体 | Noto Sans SC (Google Fonts) | 思源黑体 |
| 部署 | GitHub Pages + Actions | 自动构建部署 |

## 许可

本主题基于航通社官网改造，仅供个人博客使用。
