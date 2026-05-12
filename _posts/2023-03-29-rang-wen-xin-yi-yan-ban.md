---
layout: post
title: "让文心一言扮演成ChatWPS，效果如何？（2023年3月）"
date: 2023-03-29
categories: 文章
tags: [科技]
image: https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/01.jpg
---

*目前的问题随时间推移，是可以改善的。*

*文 / 书航 2023.3.29*

前几天，金山办公称在海外的 WPS 版本将会使用 GPT-4 的技术。作为国内对标微软 Office 的最主要产品，人们都预测它可能会（至少在国内）和百度的文心一言合作。

就此，他们对雷峰网说「正在和百度紧密沟通中，当然也会考虑和一些创业公司合作」。也就是说，WPS 已经确定在海外使用 GPT-4，而在国内这事还没有定。

不过，在 27 日的百度智能云活动上，文心一言在演示中已经可以植入 WPS，而且还可以嵌入另一款流行的在线文档——石墨里面。这次活动推出的文心大模型 API「文心千帆」（本文接下来会简称为「文心 API」）还演示了在金融、营销、旅游等其它细分领域的一些能力。

不谈目前还没有确定消息的官方植入，我们可以试着模拟一下让文心一言来做一些办公软件内会用到的 AI 辅助操作。

官方介绍，文心一言有「文学创作、商业文案创作、数理逻辑推算、中文理解、多模态生成」五大能力，而这些能力都可以有机结合到 Office 类办公软件最常见的三个场景中：文档、表格、幻灯片。

至少对 ChatGPT 而言，我们现在可以用严谨的自然语言，直接让它假装自己是一个尽职的 Office 插件，这就可以非常直观地看到 GPT 植入 Office 的效果。

文心能把这件事能做到什么程度呢？让我们结合「文心千帆」发布会上举的例子，用手头的测试版文心一言来试试吧。

（本文内的截图都用 AI 工具去除了水印。）

## 文心 Word

发布会上举出的一个案例是生成关于「长安逸达」车型的幻灯片。我们会在稍后讲到该案例。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/02.png)

这个演示说明文心 API 可以联网读取内容，不过我手头的文心一言不能联网。

下图我提供的网址是「长安逸达」车型的官网，我希望它写一篇关于该车型的介绍文案。但它给我返回的是来源不明的「长安欧尚A5」的介绍。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/03.png)

我想知道它是从哪里获取这些介绍信息的，它最后进入了编造模式。最后一张图说明，它肯定没有去看那个网址。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/04.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/05.png)

但是，即使它真的不知道，它试图给出的网址也都是官方的，或者相对正规的大型网站。我此前测试发现它不会贸然提供不知名的网站链接，包括在问到医疗相关的问题时，也会老实提供它认为最权威的信息。

此后我询问它的知识库更新到什么时候，它则拒绝回答。从实际情况看，它自己也不知道它到底学了些什么。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/06.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/07.png)

目前，我使用 GPT 类工具的方法主要有两种：

- 对于能联网的工具比如必应，我会打开页面或输入网址，让它读取这一资料之后再回答；

- 对于不能联网的工具比如 ChatGPT，我会逐字录入内容，让它整理，整理一段也就学习了一段。都录入完毕，再回答。

对于能联网的工具比如必应，我会打开页面或输入网址，让它读取这一资料之后再回答；

对于不能联网的工具比如 ChatGPT，我会逐字录入内容，让它整理，整理一段也就学习了一段。都录入完毕，再回答。

所以之后的测试中，我都是先录入材料，以尽量避免它提供给我不准确的内容。

接下来的两个任务也是文字编辑的常用场景。不涉及联网内容时，文心一言完成得非常不错。

一是生成一份合同模板。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/08.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/09.png)

在文心一言里我生成了两次，结果大同小异。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/10.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/11.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/12.png)

二是生成活动邀请函。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/13.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/14.png)

我用了稍微不一样的 prompt，文心一言的完成度还要比演示稍微高一点。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/15.png)

值得注意的是，在结合上下文之后，它可以代入角色来生成适合角色的内容。下面这个问题，我本来没预期它会继续以上一篇「百度智能云」的身份说话。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/16.png)

上面生成的内容，我都节选不同段落的文字扔进搜索，做了简单的查重，结果是它们并不是直接摘抄自网络上的文本，至少变换了一种方式来说。

## 文心 Excel

数据和表格对数字的准确性有非常高的要求。为确保它不用什么奇怪的数据源，我需要预先给它一些资料。

文心一言的输入框有 1024 字符的限制，所以我提供的材料也必须很短。我找到的最简单、最基本的一段材料就是百度的财报。

在现场演示中，文心 API 首先给指定材料做了摘要。注意看营收数据有个错，把 331 亿元写成了 1331 亿元。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/17.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/18.png)

不过接下来让它写投资建议书时，它好像又把错误的数字改过来了。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/19.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/20.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/21.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/22.png)

在这一部分，我给出的任务是将百度财报的关键数据提取出来，并导出一份 Excel 表格。需要注意的是，这个任务是 ChatGPT（3.5，下同）可以轻松胜任的。

首先，我没有提供材料，直接询问百度 2022 年财报的主要信息，它可能学习了一些，但具体数字不完全准确。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/23.png)

然后，我把一篇文章贴给它，让它基于文本总结重要信息。它基本上把带数字的部分都总结出来了。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/24.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/25.png)

但当我让它基于上述信息再次抽象为表格时，它出错了。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/26.png)

此后我换了一种方式提问，得到的结果更有趣了：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/27.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/28.png)

在另一次测试中，它开始遗漏一些内容。无论我如何变换 prompt 都无法得到令人满意的结果。

> 我：请根据下列材料，将百度2022年第四季度及全年财报的主要信息列出为一个表格。你可以自己决定表格中应该包含哪些内容。（重贴一遍上文）

> 文心一言：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/29.png)

> 我：你可能混淆了2022年第四季度的数据，以及2022年全年的数据。请重新生成一次，并将第四季度数据和全年数据分开列表。

> 文心一言：（重新生成了一次跟上面一模一样的表格）

我回到上一次提问，让它把结果生成 Excel 可以读取的 CSV 文件。它照做了，但没有写在代码框里，而是直接在浏览器里渲染出来了。当然，我也无法复制粘贴并保存这个文件。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/30.png)

同样的任务在 ChatGPT 里结果是这样的，也是我预想的输出结果。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/31.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/32.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/33.png)

在这一部分，文心一言的缺陷非常明显，以目前测试的版本看，不能投入实际使用。或许针对行业训练的特定版本可能会突出改善这方面的表现。

## 文心 PPT

前一阵子，国内有个开发商做了个 PowerPoint 插件「ChatPPT」，原型的目的是根据输入框的一句指令从头生成一整个演示文档。它是可以跑起来的，但具体执行和微调方面似乎不太聪明。等到微软官宣了 Microsoft 365 Copilot，至少在演示中，效果是直接碾压的。根据必应 GPT 演示和实际的对比看，微软自家的自动做 PPT 效果应该也跟演示的区别不大，这波属于「官方逼死同人」。

这是前文提到的由 prompt 及外部网页信息相结合而生成 PPT 的一个演示。可以看到这时文心 API 可以做到自动优化排版，且寻找的模板和配图都有较强的相关性。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/34.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/35.png)

因为聊天界面只能输入和输出文字，我测试这一环节采用了一个有趣的方法，让 AI 模仿人手告诉我需要进行的每一步操作。先来看看 ChatGPT 的示范：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/36.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/37.png)

由于指令过于笼统，GPT 也犯了一些错误，但我相信用更细致的 prompt 可以指导它逐张输出幻灯片。在实际应用时，只需要将它的每一个动作如「插入一张幻灯片」「设置版式」等转变为真实的操作，就可以了。

后来我换用 GPT-4，它这回完全理解了我的意图：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/38.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/39.png)

现在轮到文心一言了。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/40.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/41.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/42.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/43.png)

文心一言没有真实理解我需要它做什么，但它基于通用的「生成PPT大纲」的任务，将我提供的文字材料转换为了PPT大纲。这其实也可以驱动WPS或PowerPoint去做幻灯片，但很显然需要更多步骤来进一步转换。

实际上，这一功能需要做的远比现在我测试的东西要多。我现在能想出来的就有：

- 为每一页幻灯片合理分配适当的文本、图片及表格的数量，以免页面上内容太多或太少

- 为幻灯片选择合适的主题、版式和动画

- 寻找，或者生成切题的配图

- 为演讲者添加每张幻灯片的备注，以及计算预估的演讲用时

为每一页幻灯片合理分配适当的文本、图片及表格的数量，以免页面上内容太多或太少

为幻灯片选择合适的主题、版式和动画

寻找，或者生成切题的配图

为演讲者添加每张幻灯片的备注，以及计算预估的演讲用时

而这些都在微软 Copilot 的演示中预告了，并且实现起来恐怕也没那么难。

## 还有两个任务

最后，我给文心一言测试了演示中提到的另外两个任务。

一是为产品介绍生成一段直播间文案。在现场和在文心一言里，它的表现分别如下：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/44.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/45.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/46.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/47.png)

我额外加了一个指令：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/48.png)

你觉得怎么样？

演示过程此后调用虚拟人，把生成的文案慷慨激昂地念了出来。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/49.png)

二是让它制定一段行程规划，这里可以嵌入旅游产品的购买链接。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/50.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/51.png)

这段内容经过查重，并不来源于目前网络上已有的内容。不过有趣的是，当你跟我一样一字不差地输入同一个问题时，你会看到文心一言给出的回答和我图片里的一模一样。而且它就像我之前提到的一样，并不是消耗 token 那种一个字一个字蹦出来的，而是思考了一会儿，就快速贴过来的一样。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/52.png)

其实这也并非个例，在之前它「你画我猜」模式期间，它对很多成语生成的图片可能是完全重复的。它在作图后举的例子是「帮我画一枝晶莹剔透的牡丹花」，多试几次会发现它画出的花也可能是重复的。

我对此的理解是：在回答一些问题时，它确实是采取老实生成的做法。但是，当同一个问题已经有确定答案，并且没有受到挑战、不需要修改的时候，它就会直接调用以往已经生成过的答案。

这种方法当然没问题，对于现在有限的算力而言也是比较好的选择。我观察到，微软自从拨出大量 Azure 算力支援 OpenAI 以来，其必应搜索和 Edge 浏览器的翻译功能似乎有一次「降级」，准确率比此前降低了一些，维持在勉强能看的程度。地主家也没有余粮，「拆东墙补西墙」是算力紧张时的正常操作。

目前在「文心一言」的官网上，也给出了算力紧张，生成可能较慢的提示；而且，如果网页闲置时间超过2分钟，就会冻结页面，需要刷新一次才能继续使用。这一切都显示了大模型的使用需要算力作为代价，有时需要一些取巧的做法让系统能正常运行。

接下来，系统替换了行程规划中的一处景点，不过这次替换没有附加旅游产品。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/53.png)

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/54.png)

在文心一言中，生成的结果稍微简略一些。

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/55.png)

## 结论

在文心 API 发布会上展出的这些案例，可以非常有效地测试文心一言是否可以在多项日常任务中用于生产环境。

ChatGPT（3.5）可以非常高质量和稳定地完成几乎所有任务。而文心一言的测试结果如下：

- 凭简略的 prompt 生成文档或文档模板（优秀）

- 持续根据给定的身份、语气或风格生成内容（优秀）

- 总结给定段落的含义（一般）

- 联网查找和使用信息（未开放）

- 整理、理解和应用财报等内容中的数字（差）

凭简略的 prompt 生成文档或文档模板（优秀）

持续根据给定的身份、语气或风格生成内容（优秀）

总结给定段落的含义（一般）

联网查找和使用信息（未开放）

整理、理解和应用财报等内容中的数字（差）

上述测试应该可以证明文心是一个真的大语言模型，而不是改头换面的常规搜索。目前的问题看起来源于语料和训练量不够，随时间推移，是可以改善的。根据发布会上的演示效果，经过行业合作伙伴的专项训练之后，文心 API 在更多特定场景中或许会有更好的表现。

不过，作为文心一言的用户，我热切期待着这些专有场景的训练结果可以尽早同步到文心一言当中。以及，百度这些年来在不同的地方，用不同的方法实现了各不相同的 AI 辅助，比如这个最早 2020 年就有的「AI 搜索智能精选」：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/56.png)

这里的现有内容，以及使用文心生成的结果，如果哪个质量更好，就可以替代另外一个。

就像必应 GPT 那样，在合适的场合，它会在回答中给出常规搜索提供的小插件：

![](https://lishuhang.me/img/2023/03/29/rang-wen-xin-yi-yan-ban/57.png)

如果你提问的是一个数学题，它直接蹦一个计算器出来的体验肯定更好（当然目前市面上还没有产品是这样实现的）。

如果文心日后涌现的能力更强，它可以也应该反哺搜索等更多场景，由此将百度散落各处的 AI 能力汇总起来，才能发挥出最大的效应。

*题图：文心一言创作。*

*prompt：请画一张电脑办公的图片，写实3D风格，超高精度，8K，细节表现，高画质*