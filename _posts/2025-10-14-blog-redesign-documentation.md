---
layout: post
title: "航通社官网 2025.10 更新日志"
date: 2025-10-14
categories: 文章
tags: [科技]
image: https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/01.png
​---

*2025年10月，使用Manus完成更新*

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/01.png)

*文 / 书航 2025.10.14*

*本文同时参加 [#BuiltwithManus 案例征集活动](https://events.manus.im/zh-cn/campaign/free-tokens)。*

10·1假期期间，我用Manus对网站进行了完全重构，将其升级为现代化的单页应用（SPA），同时保持Jekyll的静态生成优势和SEO友好。

我的感想是：

> 比如我这次改博客，我没有限定很多东西，都是它自己找解法，当然代价是狂烧token。就像围棋的神之一手，ai解决问题的思路有时候翻看记录，是我完全预料不到的，而且可以找到我忽视的问题。如果说理想的智能体能把任务从1做到100，我觉得博客翻新任务堪称“从5到70”。

## 任务概述

2015年，我把个人专栏命名为“航通社”并注册 https://lishuhang.me 域名，同时将之前持有的 https://lishuhang.com 域名重定向到这里。专栏一开始采用WordPress，2019年迁移到GitHub Pages。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/02.png)

2017年4月

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/03.jpg)

2019年2月

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/04.png)

2020年4月

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/05.png)

2021年6月，一度切换到Docsify，虽然排版美观，但缺失了很多功能

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/06.png)

2023年4月

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/07.png)

2024年7月，这时还原到Jekyll，但是手搓模板极其煎熬，很有挫败感，加上工作忙，很长时间都没有维护。

采用Jekyll的好处显而易见，它使我只需要文本编辑器就可以撰写内容，网站结构也简单了很多。而且，我不用再担心除了域名之外的其它任何费用。不过，一开始我并没解决图床的问题，很多之前的配图丢失了。

在2023年ChatGPT这波AIGC浪潮之前，我一直花很多时间手动同步内容——将在公众号首发的文章放在本地编辑器，并手动修改内容版式，耗费大量时间。今年春节期间，我使用DeepSeek第一次进行了以自动化为方向的官网改版，主要是：

- 制作Python脚本，将另存到本地的公众号正文页转换为md文章，同时下载图片，手动上传到另一个GitHub仓库；
- 今年开始每天更新的AI早报单独设立一个栏目更新；
- 美化网站样式外观。

我不会写代码，以上这些工作都是我在没有AI编程的时候，无法自己完成的。即使有了更好的大模型，我在下指令以及修改Bug的时候也需要多次下令，比较痛苦。这与模型能力也有关系。不过，这次更新还是大大提升了网站加载速度、美观性以及我的人工更新效率。

10月份本次改造之后，网站代码更简洁，单页应用的资源消耗更少，有更好的本地缓存，在无CDN前提下，在中国大陆的加载速度提升。

通过精心设计的架构和统一的代码规范，系统具有良好的可维护性和可扩展性。改造过程中始终遵循"代码复用"和"逻辑集中"的原则，所有关键功能都有清晰的实现模式，便于后续维护。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/09.png)

许愿+抽卡现场

Manus的GitHub连接器能力使得我授权之后，它就可以自己推送更新。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/10.png)

同时，由公众号网页HTML转MD的脚本也同步升级，并符合新版的规范；为存量文章写了批量修改分类等front matter的脚本，以供后续有空进一步调整。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/11.png)

半自动的网站更新指南（局部）

以下内容由Manus撰写，并经过我的调整。

## 改造目标

- **视觉统一**：简洁设计风格，两栏布局，左侧固定导航栏，右侧动态内容区。
- **功能完善**：保留博客核心功能的同时，增强用户体验，包括搜索、筛选、深色模式、评论系统等。

- **性能优化**：使用图片CDN服务优化加载速度，支持原图开关，平衡质量与性能。

- **内容管理**：将AIGC早报从主列表分离，建立独立入口，保持主博客内容的专注性。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/12.png)

改造的核心思路是在保持Jekyll静态生成的基础上，通过JavaScript实现单页应用体验。这种混合架构的优势在于：

- **SEO友好**：每篇文章仍然有独立的URL和完整的HTML页面，搜索引擎可以正常抓取。
- **用户体验**：在博客内部导航时，通过JavaScript动态加载内容，无需刷新页面，提供流畅的浏览体验。

- **渐进增强**：即使JavaScript被禁用，用户仍然可以通过传统的页面跳转访问所有内容。

为了实现单一代码源的维护，我们采用了重定向机制。当用户直接访问文章URL时，post.html布局会通过JavaScript重定向到主页，并通过URL参数传递文章路径。主页检测到参数后，在右侧内容区加载文章详情，然后将URL更新回文章的真实路径。这样确保了：

- **代码复用**：文章详情视图只需在home.html中维护一份代码，post.html只是简单的重定向页面。

- **自动同步**：对文章详情页的任何修改都会自动应用到所有访问方式。

- **URL一致性**：最终用户看到的URL仍然是文章的permalink格式，不影响分享和收藏。

## 技术实现

系统维护了几个关键的全局状态变量。allPosts数组存储所有文章的元数据（不包括AIGC早报），filteredPosts数组存储当前筛选条件下的文章，currentFilter对象记录当前的筛选类型和值，displayedCount记录当前显示的文章数量用于无限滚动。

系统有三个主要视图：文章列表视图（postsView）、文章详情视图（postView）和静态页面视图（pageView）。视图切换通过显示隐藏对应的DOM元素实现，切换时会同步更新URL、浏览器标题和History API状态，确保浏览器前进后退按钮正常工作。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/13.png)

文章筛选/搜索系统支持按标签、年份和关键词搜索三种方式。所有筛选函数都遵循统一的模式：首先检测并切换视图状态，确保在列表视图下操作；然后执行筛选逻辑，更新filteredPosts数组；接着清除其他筛选状态，避免冲突；最后更新URL、标题和浏览器历史记录。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/14.png)

从一个筛选页切换到另一个筛选页时，系统会先检测当前是否在文章页或页面视图，如果是则先返回列表视图，然后再应用新的筛选条件。这避免了视图状态混乱导致的崩溃问题。所有筛选函数末尾都调用closeMobileSidebar，确保移动端用户体验流畅。

搜索框可实时搜索文章标题和摘要，使用300ms防抖处理避免频繁触发。搜索针对所有文章进行，不受当前显示文章数量限制。搜索结果即时显示，并更新URL参数，支持浏览器前进后退。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/15.png)

为了避免代码重复，创建了统一的标题管理函数。getPageTitle函数根据页面类型和值生成标题，主页标题，筛选页，文章页均有固定的Title格式。updatePageTitle函数封装document.title的设置，所有需要更新标题的地方都调用这个函数。

这种设计将原来分散在14处的标题设置代码统一到两个函数中，减少了约40行重复代码，确保了标题格式的一致性。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/16.png)

主博客列表自动过滤掉所有带AIGC标签的文章，在collectAllPosts函数中直接在DOM层面隐藏这些文章。搜索框下方添加了"每日AIGC早报"专门入口，点击后进入AIGC标签汇总页，该页面会重新收集包括AIGC在内的所有文章。后续将加入更多的专栏分区。

## 外观

博客参考了[Chakra UI的设计语言](https://www.chakra-ui.com/playground)，采用两栏布局，左侧边栏固定280px宽度，包含Logo、搜索框、标签云、年份导航、功能开关和版权信息。右侧主内容区自适应宽度，根据当前状态显示文章列表、文章详情或静态页面。移动端（768px以下）自动切换为单栏布局配合汉堡菜单，侧边栏从左侧滑出，带有半透明遮罩层。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/17.png)

文章详情页底部提供分享按钮，底部显示上一篇和下一篇的导航链接，点击后在右侧栏内加载对应文章，无需刷新页面。页面右下角有返回顶部和/或返回首页的悬浮按钮。

深色模式默认跟随系统设置，用户手动切换后会保存选择。切换时评论系统的主题也会自动同步，使用CSS变量和data-theme属性实现全局主题切换。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/18.png)

使用颜色尽可能简单，确保视觉简洁统一。Accent Color #347df8 为航通社品牌色。

文章列表支持无限滚动加载，初始显示12篇文章，滚动到距离底部200px时自动加载更多。所有文章的元数据在页面加载时通过JSON注入，无需额外请求。滚动加载只是显示隐藏DOM元素，性能优秀。

文章列表的缩略图统一使用[Weserv开源图片CDN服务](https://images.weserv.nl/)处理（400x200尺寸，80%质量），确保快速加载。文章详情页的题图和内容图片根据原图开关状态显示，默认使用weserv处理后的图片，用户可以选择查看原图。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/19.png)

原图开关状态保存在localStorage中，下次访问自动恢复。切换开关时，文章详情页的图片会实时更新，使用data-original属性保存原始图片URL，切换时替换src属性。

集成了[Giscus评论系统](https://giscus.app/zh-CN)，基于GitHub Discussions实现。每篇文章使用specific映射方式，以文章URL作为唯一标识，确保每篇文章有独立的评论区。评论系统支持GitHub OAuth登录，数据存储在仓库的Discussions中，完全免费且易于管理。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/20.png)

## 维护建议

代码结构极简，所有核心逻辑都在home.html中，包括状态管理、视图切换、筛选系统等。post.html和page.html只是简单的重定向页面，不包含业务逻辑。修改文章详情页或页面视图时，只需修改home.html中的对应函数。

如果需要添加新的筛选条件，参考handleTagClick或handleYearClick的实现模式。如果需要修改标题格式，只需修改getPageTitle函数。如果需要调整配色，修改unified-styles.css和dark-mode.css中的CSS变量。

浏览器控制台会输出关键的初始化信息，如"Loaded metadata for X posts"和"Blog initialized with X posts"。如果筛选或视图切换出现问题，检查currentFilter和filteredPosts的值。如果URL或标题不正确，检查History API的pushState调用。

![](https://lishuhang.me/img/2025/10/28/hang-tong-she-guan-wang-202510/21.png)

所有文章的元数据在页面加载时一次性注入，避免了重复请求。文章内容通过fetch按需加载，减少初始加载时间。图片使用weserv CDN处理，大幅减少带宽消耗。无限滚动只是显示隐藏DOM元素，不涉及DOM创建，性能优秀。

## 已知限制

**SEO**：虽然每篇文章都有独立的URL和HTML页面，但通过JavaScript加载的内容可能不会被所有搜索引擎完全索引。建议定期检查Google Search Console，确保重要内容被正确抓取。

**浏览器兼容性**：系统使用了现代JavaScript特性（如fetch、History API、CSS变量等），需要较新的浏览器支持。

**内容更新**：文章元数据在页面加载时注入，如果发布新文章，用户需要刷新页面才能看到。考虑添加"检查更新"功能，或使用Service Worker实现后台更新。

*（Manus撰写的部分结束）*

后续优化官网的todo包括：

- 增加featured通栏及更多栏目
- 匹配浏览器PWA标准，并提供安装为PWA的选项
- 制作一个简洁版，兼容性IE5.0，在测试user-agent兼容性不能完全加载新版内容时，自动fallback到简版
- 更完善的更新机制，如检测公众号更新并同步等
- 汇总2015年之前的内容
