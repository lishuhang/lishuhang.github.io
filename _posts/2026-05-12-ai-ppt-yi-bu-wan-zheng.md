---
layout: post
title: "AI PPT：一部完整编年史"
date: 2026-05-12
categories: 文章
tags: [科技]
image: https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/01.png
---

*从只写教程不动手，到可编辑的PPTX文件，这三年我们经历了什么*

*文 / 书航 2026.5.12*

三年前社长近距离接触了文心一言初代产品的发布会，见证了一开始没人相信百度是真的，直到它开放测试权限，股价从跌到涨的戏剧性过山车过程。

当时，文心一言及其企业级产品将做PPT视为核心生产力内容。只不过，第一版文心一言做PPT的时候，它只吐了个大纲，就蹲下了。

社长写这个AI PPT的评测稿子的时候，因为找到新工作，就存在草稿箱里没发出来，没想到这一存，就是三年。

这三年，社长是一点重新动它的心思也没有，因为后来的工作里很少用到PPT及对外汇报。就如同大家感受的一样，对大多数人，AI最大的用途是编程，写作文章/文档，以及生成图片或视频。

近几天，还是因为手搓了一个帮自己码字的Skill，社长才终于有勇气面对积压的选题，重新回顾AI PPT这个领域。

三年后，百度终究靠着文库及GenFlow把AI PPT这个品类做到了月活破亿。用大模型做PPT这事如今至少有5-6个流派，Kimi、ChatGPT、智谱等都可以直接给你生成.pptx格式的文件。

所以说，现在做PPT，真的不用自己动手了吗？

## 2023年4月：文心一言只吐了个大纲

2023年3月底，社长拿到文心一言的邀请测试资格。那会儿金山办公刚宣布海外版WPS要接GPT-4，国内版传闻可能跟百度合作，百度也在3月27日的智能云活动上，演示了文心千帆API生成PPT的能力，以及文心一言植入WPS和石墨文档。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/02.png)

社长好奇这种“中国版Copilot”到底行不行，就直接上手，让它模拟办公助手，在文档、表格、幻灯片三个场景跑了一遍。

*（具体的内容请参考公众号“航通社”今天随本文一同推送的第二篇文章：《**让文心一言扮演成ChatWPS，效果如何？（2023年3月）**》）*

文字部分还不错。让它起草合同模板、活动邀请函，甚至指定用“百度智能云”口吻写，结构完整、语气得体，连续几次生成结果自然流畅，查重后确认没直接抄。如果只是日常文案起草，它当时就够用了。

表格就完全露怯了。社长拿百度自己的2022年财报当材料，让它提取关键数字、整理成表。它一会儿混淆季度和全年数据，一会儿直接重复上一轮的错误，怎么调提示词都没用。同一任务扔给ChatGPT 3.5，对方干净利落吐出准确表格，差距大到让人有点尴尬。

PPT任务更说明问题。发布会里文心千帆API能根据“长安逸达”车型信息自动排版配图，看起来很炫，但那是API版，可以联网。社长手上的测试版不能联网，只能让它输出“手动操作步骤”来模拟。文心一言顶多给个大纲，每页放什么内容、怎么布局，统统没有。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/03.png)

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/04.png)

换成GPT-4，它也是一样只能输出手动操作步骤，不过相对更细致，能描述每页的版式、内容分配、插入图片的位置，接近实际可执行了。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/05.png)

社长当时的判断是，文心一言确实是一个真的大语言模型，架构没问题，语料和训练量拖了后腿，属于“思而不学则殆”的状态。发布会里那些行业定制版的截图似乎效果好不少，社长当时想，如果这些能力尽快回流到通用版，文心完全有可能后来居上。

那时候最乐观的预测也没想到，三年后人们解决这个问题的方式跟当时预期的完全不同，包括超出了百度自己的预期。

## 模板、代码和Agent各有各的走法

当前AI制作演示文稿发展出了三条不同的技术路线。

一是基于PPT格式及模板，让大模型填充内容匹配预置模板的路线，采用旧式低代码结合盘活AI时代之前的海量模板库资源，可靠性高。AiPPT.cn、Slidesgo、WPS AI都属于此类。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/06.png)

此后也有厂家使用中间件，包括python转pptx的代码，Marp这个Markdown转PPTX库，或其它自定义转换方式，先做成Markdown格式的标记语言指定幻灯片元素及其摆放位置，然后二次转换为pptx格式。当前大语言模型的聊天机器人或Agent，各种Claw类工具的输出pptx功能多属于此类。此外也有AutoPresent、SlideCoder、FlashDocs API、LandPPT等。

例如在我试用[归藏老师的PPT Skills](https://mp.weixin.qq.com/s?__biz=MzU0MDk3NTUxMA==&mid=2247496799&idx=1&sn=db767c5f51aa66dda3d6f45aac516b98&scene=21#wechat_redirect)并要求Agent输出可编辑的PPTX时，过程是这样的：

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/07.png)

二是不生成传统PPTX，输出HTML在线演示页，交互性更强。此类业界翘楚是Gamma，还包含另一家现已关闭的Tome。

如果这样算的话，使用文字模型能力输出图配文的整页SVG格式矢量图，或者干脆用Nano Banana、GPT-image-2等直出不可编辑的位图图片，也都属于此类，核心区别是并非传统PowerPoint或Keynote可编辑的。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/08.jpg)

三是直接“黑”入编辑工具或自己做一个编辑器，最后仍可微调结果并输出pptx格式文件。最典型的比如微软Copilot、WPS灵犀、百度GenFlow等，大模型在权限允许情况下，可以直接操控原生PPT对象。这也包括Lovart这种可以模拟psd的图层机制，且将元素分开用生图模型指令微调，以保持画布其他部分不动，“指哪打哪”的。

以Kimi的PPT生成为例，其“香蕉模式”实质就是接入Nano Banana模型，为每一页出图以后，当需要调整时，会询问是否用重新生成的页面替换原页面还是新建一页，每次都会有轻微的变动。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/09.jpg)

此时我们就可以梳理一下转折点到底发生在过去三年中的哪一年了。

最先跑出来的是低代码模板。社长试用过[2023年8月上线的AiPPT.cn](https://m.36kr.com/p/2795361784050564)，并且对话过[爱设计&AiPPT.cn市场负责人蒋依林](https://podcasts.apple.com/us/podcast/%E5%AF%B9%E8%AF%9Dai%E5%88%9B%E4%B8%9A%E8%80%85-%E8%81%8A%E8%81%8A-ai-ppt/id1737153194?i=1000658119515)。它们主打“一句话一分钟一键生成PPT”，其实际操作过程是将模板类型，字体字号等做成内部可用的伪代码，大模型可以生成这种伪代码，一键导入后即可读取。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/10.jpg)

如果你也用过问卷星做问卷一定知道是什么意思，就是当你用语义描述问卷题型如单选、多选的时候，一键导入即可节省原本圈圈点点的过程。这个极其简单的实现保证了产出的高可靠性，同时盘活了存量PPT模板资源，[3个月月活突破百万](https://www.geekpark.net/news/344599)。

[百度文库AI PPT于8月31日随文心一言公测同步上线](https://finance.sina.com.cn/tech/roll/2023-09-01/doc-imzkekvi5675680.shtml)，开放12小时内使用量超100万。[WPS AI在同年11月4日开启公测](https://www.pingwest.com/a/297101)。这条路可靠性高，模板经过设计师打磨，排版不会出格。但是天花板也很低，因为你只能在它提供的那些模板里选。

当然，如果不限制在PowerPoint以及Keynote生态中，只是达到一个演示的目的，假如你之前就是带着PDF而不是PPT上台的，那干脆放弃PPTX，直接输出HTML在线演示页就很适合此类用户。2020年创立的Gamma是这条路线的代表，[2023年3月上线AI集成后，9个月拿下1000万用户](https://www.jpmorgan.com/insights/technology/artificial-intelligence/gammas-startup-journey-the-future-of-presentations-with-ai)，增速凶猛。到[2025年4月](https://www.upstartsmedia.com/p/gamma-ai-startup-profits)，5000万用户、ARR 5000万美元，全公司仅约30名员工。[同年11月](https://techcrunch.com/2025/11/10/ai-powerpoint-killer-gamma-hits-2-1b-valuation-100m-arr-founder-says)估值21亿美元、ARR突破1亿美元、团队扩展至52人。跟它几乎同时走同样道路的Tome，则发展的不太顺利，现在已经关闭了。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/11.jpg)

Gamma的哲学是，演示文稿最终是给人看的，PowerPoint只是载体，HTML天然比PPTX更灵活，动画、交互、嵌入都更自由。当然，代价在国内尤为明显：可以不用Office的PPT做演示的人一般本来就没有做演示的需求，你当公司统一模板里的logo设计、页眉页脚是不存在的吗？

到2025年，上述不同技术路线终于开始殊途同归地解决那个听上去最理所当然，实现起来却最曲折的诉求——让大模型直接生成可用的PPTX文件，乃至修改它。

微软Copilot这边，[2023年11月1日正式开放商用](https://www.microsoft.com/en-us/microsoft-365/blog/2023/09/21/announcing-microsoft-365-copilot-general-availability-and-microsoft-365-chat)，30美元/用户/月。但是在漫长的岁月里（大模型界是“天上一日，地下一年”，两年多可不长吗？）它只是Office的一个侧边栏面板，号称深度嵌入PowerPoint客户端，直接操控原生PPT对象，却从未真正成功过。在此期间其他模型如智谱和Claude也在做侧边栏插件，但除了Excel之外，PowerPoint的更改始终是一大难题。微软有Office的完整控制权，进展却比预期更慢。[直到今年4月22日，借助Claude模型的支持，Copilot Agent能力才在PowerPoint中正式落地](https://www.microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available)。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/12.png)

[Claude 3.5 Sonnet在2024年6月推出Artifacts功能](https://www.anthropic.com/news/claude-3-5-sonnet)，可以生成HTML/SVG交互式演示，开了个口子，但离真正的PPTX还差一步。[2025年1月，UC Berkeley等机构的AutoPresent论文](https://arxiv.org/html/2501.00912v1)提出工具增强代码生成方法，构建SLIDESLIB库（基于python-pptx），让LLM生成Python代码再执行输出PPTX，该论文被CVPR 2025收录。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/13.png)

到2025年8月，[ChatGPT通过Agent功能原生生成.pptx文件](https://24slides.com/presentbetter/create-powerpoint-with-chatgpt)。当时仅限标题加项目符号的内容型幻灯片，还不能加入富文本内容。两个月后，谷歌[Gemini可直接生成完整的Google Slides演示文稿](https://workspaceupdates.googleblog.com/2025/10/generate-presentations-in-gemini-app.html)，在主流的商用大模型中最早实现自然语言的端到端演示文稿生成。此时也出现了python-pptx之外的另一种中间格式[Marp](https://marp.app)，用Markdown写演示文稿再转PPTX/PDF/HTML，成为大模型和PPTX之间的桥梁。

同年，多亏了Manus，智能体风潮席卷几乎所有玩家。智能体做PPT的核心要点是一个大任务拆成多个子任务并行操作。[百度推出GenFlow](https://m.36kr.com/p/3265235532807938)，[昆仑万维发布天工超级智能体](https://m.36kr.com/p/3303196779796996)，[WPS推出灵犀3.0](http://www.news.cn/finance/20250728/64d6e8901aa74e7ebc6942049d353b16/c.html)，[谷歌NotebookLM上线Slide Deck功能](https://www.xda-developers.com/heres-everything-google-added-to-notebooklm-in-november-2025)，都支持从上传文档自动生成幻灯片，并支持逐页编辑。大纲、排版、配图、数据图表各交给专门的子Agent，再汇合交付。但生成到什么样，还是比较看运气，而且因为中间步骤多，“一步错，步步错”的问题也让用户头痛不已。

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/14.jpg)

今年上半年，这个领域的竞争焦点，主要也集中于解决生成完了不能直接用、直接改的困局。[商汤办公小浣熊的宣传口号就是“页页可改”](https://finance.sina.com.cn/jjxw/2026-03-02/doc-inhpqvaq5350994.shtml)。也有玩家把其它领域的可编辑经验搬回到演示上，比如[Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)既然可以做交互式网页或App设计，迁移到演示文稿制作也不在话下。

总体来说，大模型改PPT跟改图乃至改视频一样，并不是有意识的知道哪里错了要改哪里，而是或多或少地全部重绘一个区域。这个区域画的圈越小，修改就越精细化，仅此而已。

目前看，最稳妥的方式应该就是用Marp类中间件或模型厂商自研的途径，从做好的H5网页转化到PPT格式。很可能也正是因为想通了这个问题，AI PPT的可编辑性问题在过去半年得到了很好的解决。

Skill就是结构化的系统提示词，得益于模型能力的进步，每个人vibe开发一个自己的skill来固化工作流都比较简单。以某个Hermes skill为例，核心思路是用SVG作为中间层，先完成画布、页数、受众、风格、配色、图标、字体、图片等8项确认，再按每页的SlideIntent规划叙事和布局，由AI逐页生成SVG，经过图标嵌入、图片裁剪、文字修复、质量检查后，转成可编辑的原生PPTX。这里，SVG就是到PPTX之前的中间格式。

[另一个作者使用Dokie生成](https://mp.weixin.qq.com/s?__biz=MzkwNDcwNzk5NQ==&mid=2247484397&idx=1&sn=d215de8ea6537dfa7dfc68cc9fff055e&scene=21#wechat_redirect)SVG格式幻灯片单页效果如下：

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/15.png)

可以看出在配图方面都是用小图标，在嵌入位图方面仍然需要其他调整。

还有人主打用优秀的编码模型如gpt-5.5或GLM-5.1先生成HTML作为中间格式，再用各家skill比如Minimax的那个，像素级复制成PPT。核心就是让AI先在它最擅长的格式里做到最好，再转换到你需要交付的格式。

这种方法每次修改其实只修改SVG或网页这种版本，而PPT是每次都重新导出一遍。怎么说呢，管你这那的，能用不就得了。

## 改AI的PPT比自己做还累？

随着AI PPT从炫技到落地，带来了一个意外的连锁反应：这个过程筛选出来了那些真的需要PPT的人。正如在讲到Gamma时社长提到的那样，PPTX这个格式包含的意味远大于给人做演示本身，还得用公司模板，还得说明内容逻辑，等等。

就在前几天，V2EX论坛有帖子讨论：“[真的有人用AI做PPT吗？](https://v2ex.com/t/1211441)”发帖人说，虽然这种应用已经很多了，但考虑到公司有模板，AI的可用性不太强，还是老老实实一页一页做。

> 核心问题就是80%的成品的修改工作量，和自己直接手搓的（工作量）哪个更大。

真用的人认为，改AI的东西，有时候比从零开始更痛苦，因为你要先理解AI为什么这么做，再推翻它的逻辑，再重新排。而如果你不指定每页的逻辑，让AI根据原始材料自己跑，那大概率会得到“把内容均匀分配到每一页”。

> 我也没碰到好用的，都是一股AI味，看起来就是AI生成内容然后选择一个合适的模板往里填，压根没考虑这段内容要怎么展示更合适。

当然，里面也有“你觉得做的不好是因为提示词不到位”这种反思派。社长也基本是这一路人，觉得现阶段只要AI做的东西修改量到达一个大致的临界点，哪怕慢于人力也应该追求炼化AI，因为磨刀不误砍柴工，炼好了利在千秋。

正是这样的反驳，凸显出我们这种人可能不是PPT的核心使用者。

很多时候Human-in-the-loop的人没法跑出循环，不是说你不盯着AI它就给你删库跑路。只不过是你作为一个监工的身份下，越是旁观别人工作，“视奸”它的终端和屏幕，你想打断它插入自己意见的冲动，就越强烈。

放心不下，还不是因为在乎？这个PPT要想播放到某个场合，恐怕还得在PC和Mac上多做测试，必要时候把附带的文件都拷到同一个文件夹，还得做PDF，PPT双格式保险……那这必然是课程作业、工作汇报、融资方案、学术演讲等等，如此不容有失的场合。

> 我们老板对一个人的汇报，从入职开始基本上就3次机会，3次以上没满意就会雪藏或者开掉，拿AI真糊弄不了老板。重要的你的口述和思想。写一大堆卵用没有！

结构、排版、配图、动画，这些体力活AI干得又快又好。剩下那20%是认知负荷最高的，真正费脑子的事情。

不论我们对AI PPT原本的期望如何，现在它总算走到了这一步。今年开始，你也确实可以把带你公司logo的模板喂入工具来做你的草稿了，输出也可以是PPTX格式了，里面的内容也可以编辑了。

但在里面写点什么，还得是咱们自己来拿主意。

本文还有很多旁枝没有提及，难免挂一漏万，大家也可以看看下面这个表格，来了解AI PPT完整的进化史。

## 附表：AI PPT编年史（2026.5）

### 2023年前：前传

| 日期        | 事件                                                         |
| ----------- | ------------------------------------------------------------ |
| 2013.02     | [python-pptx首个非Alpha版发布](https://python-pptx.readthedocs.io/en/latest/community/updates.html)——Python库，可通过代码创建/修改 .pptx文件，奠定“LLM→代码→PPTX”路线基础 |
| 2015        | [Beautiful.AI创立](https://www.prnewswire.com/news-releases/beautifulai-launches-the-first-ai-powered-presentation-design-tool-300594048.html)——首个“AI驱动演示文稿设计”工具，自动排版 + 智能模板（Smart Slides） |
| 2016.07     | [Marp（经典版）由Yuki Hattori发布](https://tech.speee.jp/entry/2016/07/14/204951)——首个用Markdown写演示文稿的桌面工具，支持导出PDF/HTML |
| 2018.02     | [Beautiful.AI在SaaStr大会正式发布](https://www.prnewswire.com/news-releases/beautifulai-launches-the-first-ai-powered-presentation-design-tool-300594048.html) |
| 2018        | [Marp Next（Marpit框架 + Marp CLI）发布](https://marp.app)——支持Markdown→PDF/PPTX/HTML，开放生态 |
| 2020        | [Gamma由前Optimizely员工Grant Lee、James Fox、Jon Noronha创立](https://www.bensbites.com/p/gammas-rise-to-50-million-users)，愿景为重新发明演示文稿 |
| 2020        | [Tome由Keith Peiris和Henri Liriano创立](https://www.businessinsider.com/tome-ceo-keith-peiris-built-popular-ai-productivity-tool-2023-4)，AI驱动的“讲故事+演示文稿”工具，首个生成式AI PPT产品雏形 |
| 2021.08     | [Gamma私测版上线](https://techcrunch.com/2021/10/28/gamma-brings-in-7m-to-bring-the-slide-deck-into-the-21st-century) |
| 2021.10     | [Gamma完成700万美元种子轮融资，Accel领投](https://techcrunch.com/2021/10/28/gamma-brings-in-7m-to-bring-the-slide-deck-into-the-21st-century) |
| 2022.09     | [Tome走出隐身模式半年后，迅速突破100万用户](https://news.greylock.com/tome-becomes-fastest-productivity-tool-to-reach-1-million-users-raises-43m-series-b-5ec2f5e458a2)，开创“AI生成演示文稿”赛道 |
| 2022下半年 | [Gamma决定“All in”生成式AI](https://www.upstartsmedia.com/p/gamma-ai-startup-profits) |
| 2022.12     | “世界首个文本转PowerPoint工具”[ChatBCG上线](https://analyticsindiamag.com/ai-news-updates/meet-chatgpt-of-presentations-chatbcg)，后更名ChatBA |

### 2023：AI PPT随ChatGPT爆发

| 日期       | 事件                                                         |
| ---------- | ------------------------------------------------------------ |
| 2023.03.04 | ChatPPT（必优科技）上线，是国内第一款AI生成PPT工具，[比微软宣布Copilot早12天](https://baike.baidu.com/item/ChatPPT/63491734)，基于自研“Wernicke+LLM”双模型 |
| 2023.03.16 | [微软宣布Microsoft 365 Copilot](https://blogs.microsoft.com/blog/2023/03/16/introducing-microsoft-365-copilot-your-copilot-for-work)——含PowerPoint中的Copilot，可用自然语言创建演示文稿 |
| 2023.03.16 | [文心一言开启邀请制测试](https://baike.baidu.com/en/item/ERNIE%20Bot/16840)，李彦宏发布会展示AI能力 |
| 2023.03.21 | [Slidesgo AI Presentation Maker上线](https://www.freepik.com/blog/ai-presentation-maker)——从文本提示生成演示文稿，依托Freepik设计资产 |
| 2023.03.23 | [ChatGPT Plugins推出](https://openai.com/index/chatgpt-plugins)——含第三方PPT插件（如SlidesGPT），可通过插件生成演示文稿 |
| 2023.03.23 | [Canva Magic Design发布](https://techcrunch.com/2023/03/22/canva-new-features-including-suite-of-ai-powered-tools)，1.25亿用户获得AI驱动的设计与演示文稿生成能力 |
| 2023.03.23 | [Tome发布全球首个即时文档转PPT功能](https://www.globenewswire.com/news-release/2023/03/23/2633218/0/en/tome-launches-first-instant-document-to-presentation-feature-to-millions-triples-user-base-since-february-series-b.html)，用户数达数百万 |
| 2023.03    | [Gamma AI集成上线，9个月内获1000万用户](https://www.jpmorgan.com/insights/technology/artificial-intelligence/gammas-startup-journey-the-future-of-presentations-with-ai)，增长爆发 |
| 2023.03.27 | “文心千帆”大模型平台亮相，[闭门沟通会演示三分钟制作PPT](https://www.21jingji.com/article/20230327/herald/56a30df414ac4393f3f14ffe043582e3.html)（与金山WPS结合），这是百度首次公开演示AI生成PPT能力 |
| 2023.04    | [百度文库宣布接入“文心一言”](https://finance.sina.com.cn/tech/roll/2023-09-01/doc-imzkekvi5675680.shtml)，开启用户内测，称创作文档仅需15秒 |
| 2023.04.18 | [WPS AI首次对外亮相](https://www.tmtpost.com/6805899.html)  |
| 2023.05.09 | 微软推出 [Copilot邀请制付费预览](https://blogs.microsoft.com/blog/2023/05/09/introducing-the-microsoft-365-copilot-early-access-program)，600家初始企业用户 |
| 2023.05.11 | Google I/O 2023推出 [Duet AI for Workspace](https://workspace.google.com/blog/product-announcements/duet-ai)，含AI生成图片用于幻灯片 |
| 2023.05.26 | [ChatPPT上线商业Plus版](https://chatppt.cn/faq/guidebook/product/%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D.html) |
| 2023.07.06 | [WPS AI正式推出](https://www.zhirenai.com/ai-tools/266)，是中国协同办公赛道首个类ChatGPT应用 |
| 2023.07.07 | [Presentations.AI公测上线](https://www.presentations.ai/blog/the-fastest-growing-productivity-app-of-all-time) |
| 2023.07.19 | [Tome用户突破1000万](https://www.semafor.com/article/07/19/2023/tome-an-ai-powered-slideshow-tool-catches-fire-with-gen-z) |
| 2023.07.25 | 钉钉公布12条产品线接入大模型，[白板上线“对话一键生成PPT”](https://www.pingwest.com/a/285815)，支持更改主题风格、单页美化、生成演讲稿 |
| 2023.08    | [像素绽放旗下AiPPT.cn正式上线](https://m.36kr.com/p/2795361784050564)，主打“一句话一分钟一键生成PPT” |
| 2023.08.31 | 百度文心一言向公众开放，百度文库全面重构为“一站式智能文档平台”，[“AI做PPT”功能同步上线](https://finance.sina.com.cn/tech/roll/2023-09-01/doc-imzkekvi5675680.shtml)，开放12小时内使用量超100万 |
| 2023.09.01 | [百度文库“一句话生成PPT”和“Word转PPT”功能上线](https://office.pconline.com.cn/1655/16557544.html)，支持语音指令操作 |
| 2023.09.08 | 万兴科技发布[面向泛知识领域的AI演示新品“万兴智演”](http://www.zqrb.cn/gscy/gongsi/2023-09-08/A1694176693548.html)，集成AIGC能力 + 行业课程模板 + 动画特效 |
| 2023.09.23 | [Presentations.AI 84天用户突破100万](https://www.presentations.ai/blog/the-fastest-growing-productivity-app-of-all-time)，号称史上增长最快生产力应用 |
| 2023.10.04 | [Canva Magic Studio发布](https://www.canva.com/newsroom/news/magic-studio)，含Magic Design for Presentations、Magic Write、Magic Edit等 |
| 2023.10.17 | 百度世界2023大会上，[文库发布PPT智能生成与编辑等AI功能](https://www.pingwest.com/a/289288)，宣布AI用户突破千万，累计生成PPT超200万，生成内容超2000万 |
| 2023.11    | [AiPPT.cn上线3个月月活突破百万](https://www.geekpark.net/news/344599) |
| 2023.11.01 | [Copilot for Microsoft 365企业版发布](https://www.microsoft.com/en-us/microsoft-365/blog/2023/09/21/announcing-microsoft-365-copilot-general-availability-and-microsoft-365-chat)，每用户每月30美元，含PowerPoint中AI创建演示文稿 |
| 2023.11.04 | [WPS AI功能面向全体用户开放](https://www.pingwest.com/a/297101)，含PPT生成 |
| 2023.11.14 | [Pitch 2.0发布](https://pitch.com/blog/introducing-pitch-2-0)，从提示词生成个性化演示文稿 |
| 2023.12.23 | [讯飞智文1.0免费发布](https://www.ithome.com/0/741/591.htm)，称其为业内首个以国产大模型为底座的中文AI PPT生成工具 |

### 2024：从“能生成”到“能编辑”

| 日期       | 事件                                                         |
| ---------- | ------------------------------------------------------------ |
| 2024.01.10 | [OpenAI GPT Store上线](https://openai.com/index/introducing-the-gpt-store)，含“Slide Maker”等PPT生成工具 |
| 2024.01.15 | [微软推出Copilot Pro消费者版](https://www.theverge.com/2024/1/15/24038711/microsoft-copilot-pro-office-ai-apps)，每月20美元，非企业用户可用AI创建演示文稿 |
| 2024.01.26 | [夸克App上线“AI PPT”独立产品](https://www.impact-i.com/2024-01-26/211762109.html)，依托自研千亿参数大模型，输入主题几十秒生成PPT |
| 2024.02    | [iSlide-PPT合成算法](https://m.36kr.com/p/3242400578594053)通过国家网信办第四批深度合成算法备案 |
| 2024.02.21 | Google Duet AI更名为 [Gemini for Workspace](https://9to5google.com/2024/02/21/google-workspace-gemini) |
| 2024.04.16 | [Tome裁员20%（约12名员工）](https://www.semafor.com/article/04/16/2024/ai-startup-tome-lays-off-staff-to-focus-on-revenue)，重组聚焦营收和企业客户 |
| 2024.05    | [AiPPT.cn完成B1轮融资](https://m.36kr.com/p/2794101990048901)，视觉中国领投，星连资本和36氪跟投，4年内4轮融资 |
| 2024.05.15 | [Gamma完成1200万美元A轮融资](https://www.accel.com/noteworthies/our-series-a-in-gamma)，Accel领投 |
| 2024.06    | 极光数据报告：[百度文库智能PPT市场份额已达80%](http://jjckb.xinhuanet.com/20240805/2cad67b80d754dbbad3676e680dffcf7/c.html)，行业用户规模近千万量级 |
| 2024.06.24 | Gemini侧边栏进入Docs/Sheets/Slides/Drive，[可在Slides中生成单张幻灯片](https://workspaceupdates.googleblog.com/2024/06/gemini-in-side-panel-of-google-docs-sheets-slides-drive.html) |
| 2024.06    | [钉钉文档AI PPT上线](https://alidocs.dingtalk.com/i/p/Y7kmbokZp3pgGLq2/docs/r1R7q3QmWe7MDdl5snjjqZ7aJxkXOEP2)，一句话生成真 .pptx格式，支持思维导图调整大纲 |
| 2024.07.03 | 讯飞星火V4.0发布“个人空间”，[支持上传文档一键生成PPT](http://cn.chinadaily.com.cn/a/202407/03/WS6685232ea3107cd55d269c21.html) |
| 2024.07.05 | [WPS AI 2.0在WAIC发布](https://cn.chinadaily.com.cn/a/202407/05/WS6687d605a3107cd55d26a236.html)，新增AI写作、阅读、数据、设计四大助手 |
| 2024.07    | MindShow在WAIC发布AI文档助手 + [AI PPT Agent功能](https://mindshowcn.com)，后者是业内首次提出PPT智能体的概念 |
| 2024.08.12 | [讯飞智文2.0发布](https://m.ithome.com/html/787804.htm)，引入PPT文本生成大模型 + AI PPT编排创作引擎 + PPT在线编辑模组 |
| 2024.08    | [百度文库智能PPT功能新增](https://finance.sina.com.cn/tech/roll/2024-08-15/doc-incisvuh1756037.shtml)智能排版、多文档融会贯通、PPT图表生成及数据生成图表分析 |
| 2024.09    | [美图设计室LivePPT上线](https://finance.sina.com.cn/tech/roll/2024-09-10/doc-incnsiqm2462934.shtml) |
| 2024.10    | [Tome宣布转型](https://deckary.com/blog/tome-review)，不再以演示文稿工具为主 |
| 2024.10.03 | OpenAI发布 [ChatGPT Canvas](https://openai.com/index/introducing-canvas) 写作和编码新界面，不过不直接支持PPT生成 |
| 2024.10.25 | [人民创投联合AiPPT.cn发布“AiPPT政企版”](http://finance.people.com.cn/n1/2024/1029/c1004-40349705.html) |
| 2024.11.19 | [Copilot in PowerPoint新增](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/whats-new-in-microsoft-365-copilot-in-powerpoint-at-ignite-2024/4298971) Narrative Builder（基于文件生成叙事结构）、组织品牌幻灯片模板、PPT翻译40+ 语言 |
| 2024.11    | [SlideSpawn论文发表](https://arxiv.org/abs/2411.17719)，自动从研究论文PDF生成演示文稿 |
| 2024.11    | [AiPPT.com全球单月访问量突破900万](https://www.geekpark.net/news/344599)，国内AI PPT细分市场排名第一 |
| 2024.12    | [百度文库AI月活用户超7000万](http://www.eeo.com.cn/2024/1210/701846.shtml) |
| 2024.12    | [WPS AI设计助手升级](https://finance.sina.com.cn/roll/2024-12-06/doc-incyphkq8808546.shtml)，AI生图、精准生成PPT框架、更多模板、自主上传 |
| 2024.12.24 | [像素绽放完成B2轮融资](https://finance.sina.com.cn/tech/roll/2024-12-25/doc-ineasmtm0648050.shtml)，北京市人工智能产业投资基金领投 |

### 2025：智能体时代

| 日期       | 事件                                                         |
| ---------- | ------------------------------------------------------------ |
| 2025.01    | [AutoPresent论文发布](https://arxiv.org/html/2501.00912v1)，提出大模型生成Python代码→执行→输出PPTX，CVPR 2025收录 |
| 2025.01    | [PPTAgent论文发布](https://arxiv.org/abs/2501.03936)，提出两阶段编辑式方法，先分析参考PPT结构和内容模式，再起草大纲生成幻灯片。EMNLP 2025收录 |
| 2025.02    | [FlashDocs API公测开发者API](https://www.producthunt.com/products/flashdocs-api)，一次调用即可将Markdown/JSON/LLM输出转为PowerPoint或Google Slides |
| 2025.02    | [AiPPT.com全球单月访问量接近1400万](https://www.pingwest.com/a/302971) |
| 2025.03    | [Tome更名为Lightfield做AI原生CRM](https://www.linkedin.com/posts/keithpeiris_we-killed-a-product-used-by-25m-people-activity-7358215782591291393-RN1O)，演示文稿工具正式关闭 |
| 2025.04    | [百度文库、网盘联合推出通用智能体GenFlow 1.0](https://m.36kr.com/p/3265235532807938)，文库AI月活用户近1亿 |
| 2025.04    | [Gamma用户达5000万](https://www.upstartsmedia.com/p/gamma-ai-startup-profits)，ARR达5000万美元，仅约30名员工 |
| 2025.05.16 | [Talk-to-Your-Slides论文发布](https://arxiv.org/html/2505.11604v1)，智能体通过COM通信直接操纵正在运行的PowerPoint软件 |
| 2025.05.22 | [昆仑万维发布天工超级智能体](https://m.36kr.com/p/3303196779796996)，支持一键生成文档、PPT、表格、网页、播客，并可在手机生成 |
| 2025.05    | [Plus AI for PowerPoint插件发布](https://plusai.com/blog/announcing-plus-ai-for-powerpoint) |
| 2025.06    | [百度文库智能PPT月访问量超3400万](http://jjckb.xinhuanet.com/20250630/b3fcce301a604e1baaf1f5ffb0878954/c.html) |
| 2025.07.27 | [WPS AI 3.0发布并定名“灵犀”](http://www.news.cn/finance/20250728/64d6e8901aa74e7ebc6942049d353b16/c.html)，支持自然语言对话生成PPT、同屏交互、PPT生成演讲稿/视频 |
| 2025.07    | [AiPPT完成B3轮融资](https://www.sohu.com/a/917171133_439726)，亦庄国投领投，国科投资、英诺天使基金等跟投 |
| 2025.08    | [ChatGPT可通过智能体功能原生生成 .pptx文件](https://24slides.com/presentbetter/create-powerpoint-with-chatgpt)，但仅是标题 + 项目符号，设计有限 |
| 2025.08.18 | [百度发布GenFlow 2.0](http://www.news.cn/tech/20250819/ea5511c9216a41deaf2f21f90cc9370d/c.html)，支持100+ 专家智能体并行，3分钟内可并行完成PPT + 研报等5项多模态任务 |
| 2025.09.15 | [Gamma 3.0发布](https://gamma.app/insights/introducing-gamma-3-0)，推出“世界首个AI设计伙伴”Gamma Agent、API访问、Studio Mode |
| 2025.10.28 | [Gemini可直接生成完整Google Slides演示文稿](https://workspaceupdates.googleblog.com/2025/10/generate-presentations-in-gemini-app.html)，含主题和布局，这是谷歌首次实现端到端AI演示文稿生成 |
| 2025.10.21 | [Claude Artifacts支持MCP + 持久化存储](https://claude.com/blog/build-artifacts)，可调用Claude自身推理、存储数据、调用外部服务，可生成完整交互式HTML演示 |
| 2025.11    | [NotebookLM Slide Deck功能上线](https://www.xda-developers.com/heres-everything-google-added-to-notebooklm-in-november-2025)，可从上传的文档/视频自动生成幻灯片，支持逐页编辑 |
| 2025.11.10 | [Gamma完成6800万美元B轮融资](https://techcrunch.com/2025/11/10/ai-powerpoint-killer-gamma-hits-2-1b-valuation-100m-arr-founder-says)，估值21亿美元，a16z领投；ARR突破1亿美元，有52名员工 |
| 2025.11.13 | [百度发布GenFlow 3.0](https://www.qbitai.com/2025/11/352188.html)，推出Office Agent、GenX Agent两大智能体，活跃用户超2000万；支持PPT/Excel/Word多类子Agent并行生成 |
| 2025.11    | [Presentations.AI用户达1000万](https://finance.yahoo.com/news/presentations-ai-becomes-worlds-most-140000836.html) |
| 2025.11.29 | [LandPPT开源PPT生成平台发布](https://cloud.tencent.com/developer/article/2595983)，支持多种AI模型 + 深度研究 + 智能配图 |
| 2025       | [Beautiful.AI 3.0发布](https://www.beautiful.ai/presentation-maker)，完整文本转演示文稿AI生成器 |
| 2025       | [SlideCoder论文发表](https://aclanthology.org/2025.emnlp-main.458)，布局感知 + 检索增强的分层幻灯片生成框架，EMNLP 2025收录 |
| 2025.12.16 | [商汤发布小浣熊3.0](https://www.sensetime.com/cn/news-detail/51170316?categoryId=72)，一键生成高质量PPT，含大纲、版式、图表、插图 |
| 2025.12    | [WPS AI免费解锁AI生成PPT](https://news.aibase.com/tw/news/14027)、AI风格克隆等四项功能 |

### 2026：交付质量竞争

| 日期       | 事件                                                         |
| ---------- | ------------------------------------------------------------ |
| 2026.01    | [百度文库与百度网盘合并](https://www.baijing.cn/newsflashes_txzq/18010)为“个人超级智能事业群” |
| 2026.01.06 | [讯飞智文升级构建“写、练、演”一体化表达链路](https://m.tech.china.com/hea/articles/20260106/202601061793160.html)，新增演讲力功能 |
| 2026.02.05 | [Claude in PowerPoint研究预览发布](https://medium.com/product-powerhouse/claude-ai-powerpoint-integration-complete-analysis-of-anthropics-presentation-strategy-for-2026-0ef44ae99b13)，可在PowerPoint中作为插件AI生成和编辑幻灯片，支持模板识别和品牌一致性 |
| 2026.03.02 | [商汤办公小浣熊推出“可编辑”AI PPT](https://finance.sina.com.cn/jjxw/2026-03-02/doc-inhpqvaq5350994.shtml)，实现“一键生成，页页可改”，新增“创意模式”支持指定模板/参考图生成 |
| 2026.03    | [NotebookLM Slide Deck支持PPTX导出](https://www.xda-developers.com/notebooklms-slide-decks-finally-got-two-features-it-desperately-needed) |
| 2026.03    | 飞书aily升级内置OpenClaw，原生整合企业数据，[PPT生成作为核心能力发布](https://www.53ai.com/news/Openclaw/2026031969025.html) |
| 2026.03.10 | [Gemini Slides可生成完全可编辑的单张幻灯片](https://blog.google/products-and-platforms/products/workspace/gemini-workspace-updates-march-2026)，匹配现有品牌风格 |
| 2026.03.17 | [Gamma发布AI原生视觉创建工具Imagine](https://www.businesswire.com/news/home/20260317085752/en/Gamma-Launches-Gamma-Imagine-to-Bring-AI-Native-Design-to-the-Masses)，用于品牌专属资产和图像生成 |
| 2026.04.01 | [Google Slides幻灯片生成大升级](https://workspaceupdates.googleblog.com/2026/04/enerate-beautiful-and-editable-slides-with-ease-in-Google-Slides.html)：动态布局、品牌匹配、完全可编辑 |
| 2026.04.17 | [Claude Design发布](https://www.anthropic.com/news/claude-design-anthropic-labs)，成为独立AI演示文稿设计工具 |
| 2026.04.22 | [Copilot Agent能力在Word/Excel/PowerPoint正式上线](https://www.microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available)，可执行多步骤原生操作 |
| 2026.04.27 | [百度GenFlow 4.0发布](https://www.qbitai.com/2026/04/410738.html)，Office Agent支持PPT/Excel/Word三子智能体并行调用，月活破1亿，月任务交付2亿次 |
| 2026.05.07 | [像素绽放完成C轮融资](https://eu.36kr.com/zh/p/3797787228151048)，国科投资与商汤国香资本联合领投，AiPPT.com全球用户超3000万 |
| 2026.05.07 | [腾讯Hy3 preview上线](https://www.shobserver.com/staticsg/res/html/web/newsDetail.html?id=1108619&sid=11)，腾讯文档AI PPT功能生成成功率提升20% |
| 2026.05    | [讯飞智文Vision Agent（Beta）上线](https://hub.baai.ac.cn/view/54485)，支持PPT四步生成 + 可干预编辑 |
| 2026.05.08 | [百度千帆平台“百度文库智能PPT组件”上线开发者API](https://cloud.baidu.com/doc/qianfan/s/4mjcnolh6)，支持基于大纲及上传资源快速生成完整PPT |
| 2026.05    | [商汤办公小浣熊接入SenseNova U1模型](https://www.shobserver.com/staticsg/res/html/web/newsDetail.html?id=1109120&sid=11)，新增“一图读懂”信息图生成功能 |


![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/16.png)

![](https://lishuhang.me/img/2026/05/12/ai-ppt-yi-bu-wan-zheng/17.jpg)

上面两张图片分别是2023年用文心一言，和刚刚使用GPT-image-2，使用同款提示词制作的。提示词是：请画一张电脑办公的图片，写实3D风格，超高精度，8K，细节表现，高画质