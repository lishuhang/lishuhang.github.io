# 航通社博客 - 精简版

这是航通社博客系统的精简版本，保留了核心功能，移除了不必要的组件。

## 功能特性

- ✅ Jekyll静态博客系统
- ✅ Tailwind CSS响应式设计
- ✅ 深色/浅色模式切换
- ✅ 文章列表展示（首页显示最新12篇）
- ✅ 文章详情页
- ✅ 标签显示
- ✅ 文章导航（上一篇/下一篇）
- ✅ 关于页面
- ✅ RSS订阅
- ✅ SEO优化

## 已移除功能

- ❌ AIGC日报专栏
- ❌ 照片集锦
- ❌ 标签归档页
- ❌ 日期查询页
- ❌ 作品页
- ❌ Disqus评论系统
- ❌ 社交分享按钮
- ❌ 返回顶部按钮
- ❌ 缩略图服务（wsrv.nl）
- ❌ Google Analytics
- ❌ 滚动加载更多

## 目录结构

```
blog-minimal/
├── _config.yml          # Jekyll配置
├── _includes/           # 页面组件
│   ├── head.html
│   ├── navbar.html
│   └── footer.html
├── _layouts/            # 页面布局
│   ├── base.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── _posts/              # 博客文章（需自行添加）
├── assets/              # 静态资源
│   ├── css/
│   ├── logo.svg
│   └── logo_top.svg
├── Gemfile              # Ruby依赖
├── package.json         # Node依赖
├── tailwind.config.js   # Tailwind配置
├── index.md             # 首页
├── about.md             # 关于页
└── README.md            # 说明文档
```

## 安装和使用

### 1. 安装依赖

```bash
# 安装Ruby依赖
bundle install

# 安装Node依赖
npm install
```

### 2. 构建CSS

```bash
# 构建Tailwind CSS
npx tailwindcss -i ./assets/css/main.css -o ./assets/dist-style.css --watch
```

### 3. 运行本地服务器

```bash
bundle exec jekyll serve
```

访问 http://localhost:4000 查看博客。

### 4. 添加文章

在 `_posts/` 目录下创建Markdown文件，文件名格式为 `YYYY-MM-DD-title.md`，例如：

```markdown
---
layout: post
title: "我的第一篇文章"
date: 2025-10-14
tags: [科技, AI]
image: /assets/images/post-image.jpg
---

文章正文内容...
```

## 部署到GitHub Pages

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为发布源
4. 等待构建完成

## 主题来源

基于 [Wind](https://github.com/a-chacon/wind/) 主题精简而来。

## 许可证

MIT License

