---
layout: post
title:  在电脑上装安卓摸鱼，你要感谢一位中国工程师
author: james
categories: [ article ]
image: "/img/2021/08/0804-00.jpg"
featured: true
hidden: false
---



*中国人做了很多关键的工作。*



*文 / 书航 2021.8.4*

2000 年 10 月，一位复旦大学的老师辞去教职，走进英特尔在上海的办公室。十多年后，他带领英特尔上海团队研发出的关键技术，让我们可以用装有 x86 处理器的个人电脑，运行原本只能在 ARM 架构上跑的 Android 系统。

这一技术在市面上绝大多数的“安卓模拟器”里都能见到。2021 年，以该技术为基础，英特尔联手微软，宣布在即将问世的 Windows 11 上实现原生兼容安卓应用。

在本文中，社长将带你了解这位英特尔中国工程师的经历和创造，回顾这项沟通 Windows 与 Android 的关键技术是如何诞生的，以及在 Windows 11 里面它将怎样影响我们未来的生活。

## Windows 跑安卓的关键技术，和领衔开发的中国人

北京时间 6 月 25 日，在 Windows 11 发布会上，微软 Windows 部门负责人帕诺斯·帕奈宣布，Windows 11 将会支持在微软商店中直接下载和安装 Android 应用。此后，微软内部人士又确认用户可以自行安装 APK 格式的安装包，也就是“旁加载”安卓应用。

演示以抖音海外版（Tik Tok）作为例子，展示了无需安装额外的模拟器，Android 应用将以标准窗口模式运行，并兼容鼠标和触控手势，其运行效率也将有保证，不会卡顿。

这次兼容 Android 应用，微软是跟英特尔合作，采用了英特尔名为“Bridge”的新技术。会后，[英特尔很快就出了一篇新闻稿](https://newsroom.intel.cn/news-releases/intel-bridge-technology-unleash-windows-11-experience/)，来更详细的解释 Bridge 的内涵。

> “英特尔 Bridge 技术是一种运行时后期编译器（runtime post-compiler），能够让移动应用在基于 x86 的设备上以‘原生应用’形态运行，包括在 Windows 上运行。通过将领先的 CPU 核心、图形显卡技术、人工智能加速器、图形处理器等组件集成到单个经过验证的解决方案中，英特尔的多架构 XPU 策略可为合适的工作负载提供合适的引擎。”

说白了，这个 Bridge 就是起到了“安卓模拟器”或“虚拟机”的作用，但因为原生运行的缘故，效率会更高。而且摄像头、网络、传感器等都可以直接调用本机硬件，避免卡顿或者兼容性问题。

英特尔 Bridge 与华为“方舟编译器”以及苹果为 M1 芯片准备的“Rosetta 2”性质相同，但与 Rosetta 2 的编译方向相反，后者是从 x86 编译到 ARM 架构。

Windows 11 是第一个采用英特尔 Bridge 技术的产品，但未来 Bridge 会扩展到 Windows 之外。至于 AMD 用户也不用担心，微软表示 [Bridge 技术在所有的 x86 处理器上都适用](https://cn.engadget.com/intel-bridge-windows-11-android-apps-082012029.html)。

Bridge 并非从天而降，诸多开发者一看到就觉得十分眼熟。这让他们想起了英特尔 Houdini 技术，那是将原本基于 ARM 架构开发的 Android 操作系统移植到 x86 架构的关键部件。

Houdini 于 2014 年推出，是英特尔尝试踏足移动处理器领域，寻求 x86 手机处理器与安卓融合的产物。当时它局限于安卓应用在 x86 平台的运行，而现在的 Bridge 则强调其他平台向 x86 平台的迁移。

![](/img/2021/08/0804-01.jpg)

更值得一提的是，Houdini 是英特尔中国团队独立开发的。它从项目发起，概念验证，原型到最后的产品化，都由英特尔位于上海的研发团队完成。

引领 Houdini 项目开发的灵魂人物是李剑慧博士，他是英特尔架构、图形和软件事业部的首席工程师，负责领导深度学习框架集成和工作负载优化工作。如[英特尔官网介绍](https://www.intel.cn/content/www/cn/zh/artificial-intelligence/posts/intel-facebook-boost-bfloat16.html)：

> “他曾是二进制翻译和 JIT 编译器方面的软件开发人员，领导开发了 Houdini。李剑慧毕业于复旦大学，获得了计算机科学博士学位。他在二进制翻译和实际应用优化方面[拥有 21 项美国专利](https://patents.justia.com/inventor/jianhui-li)。”

李剑慧早年是复旦大学并行处理研究所讲师，2000 年 10 月加盟英特尔软件解决方案事业部，一直在上海 SSG 研发团队工作，为 IA-32 & 执行层产品核心开发人员。

[资料显示](https://www.mixuai.com/20150119/716006.html)，Houdini 技术成功解决了英特尔安卓平台上的应用程序兼容性问题，也让李剑慧获得了“英特尔成就奖”。

初到英特尔，李剑慧接到的第一个项目是“二进制编译”，负责质检、软件性能开发和调试等基础工作，也到客户公司驻场。为帮助 SAP 做 Java 编译器，李剑慧在 SAP 总部“驻扎”了两个多月，“SAP 的工作人员都以为我是他们的人了。”

这段经历让他从项目小组的普通工程师提升为项目经理。此后的 2005-2008 年，他进入 XML 项目和开发团队，并据此进一步发展为软件架构师。李剑慧向各大软件厂商输送软件开发的管理技术，与本土的相关的软件园项目的合作伙伴分享团队建设、项目管理方面的技术。

2010 年英特尔中国 25 周年时，他也获得了“英特尔年度最佳员工奖”。[官方形容](http://vic.sina.com.cn/news/27/2011/0126/28208.html)他是“热衷于培养人才的软件经理，大家都亲切地称他为‘李老师’。”

李剑慧提到，一次自己提交月度报告因不够详尽受到上司批评，这件小事对他的思维方式产生了很大影响。他意识到，工作的重要性不在于花了多长时间，而在于其结果会产生怎样的影响，这也就是英特尔倡导的“结果导向”价值观。

而做出 Houdini 并在全球范围采用，无疑是诸多“结果导向”中至关重要的一项成果，让李剑慧走到英特尔“首席工程师”的位置上。根据 LinkedIn 信息，他现在常驻位于圣何塞的英特尔总部。

![](/img/2021/08/0804-02.jpg)

*李剑慧在 [GitHub](https://github.com/Jianhui-Li) 的头像*

## 英特尔当初为什么要研发 Houdini

在我们注意不到的地方，Houdini 可能已经悄然派上了用场。[有人提到](https://www.zhihu.com/question/467264037/answer/1967747846)，“实际各个版本的安卓模拟器里都有 Houdini，只是不是官方渠道得到的。”

但用于模拟器并非英特尔开发 Houdini 的本意。事实上，名为 libhoudini.so 的模块存在于每一台搭载英特尔 x86 处理器的 Android 手机里，负责把 ARM 原生库动态翻译成 x86 指令集，来实现兼容运行。

……等等？还有英特尔芯片的安卓手机？

当然有，但这是一个悲剧。英特尔自 21 世纪初就着手为移动设备制造 CPU，但它最终卖掉了与手机相关的业务，[蹉跎了十多年光阴](https://www.pcworld.com/article/3065894/how-intel-knocked-itself-out-of-the-smartphone-chip-market.html)。

2000 年代初，在当时的 CEO 巴雷特（Craig Barrett）领导下，英特尔开始制定制造手机芯片等的移动战略。当时，英特尔为功能手机开发基于 ARM 架构的 StrongARM 处理器，与德州仪器的 OMAP 处理器竞争。

![](/img/2021/08/0804-03.jpg)

在 2005 年，巴雷特坚称英特尔的移动芯片很受手机制造商的欢迎。但其继任者欧德宁（Paul Otellini）认为，英特尔的核心业务是个人电脑市场，需要砍掉不重要的分支，以对付来自 AMD 的竞争压力。

2006 年欧德宁上任后的“两板斧”，一是大力促成了苹果从 PowerPC 转投英特尔阵营，二是以 6 亿美元的价格将 StrongARM 资产出售给美满（Marvell）公司。

后来，iPhone 和 iPad 的发售改变了英特尔对智能手机的看法。特别是 iPad 在 2010 年发布后，开始损害个人电脑的销量，而这些设备不使用 x86 芯片。

英特尔开始仓促修改最初为“上网本”设计的低功耗处理器凌动（Atom），以打造新的上网终端“移动互联网设备”（MID）。但这玩意儿仍然是 PC 思维，想要脱离鼠标键盘，纯用手操作仍有难度。

![](/img/2021/08/0804-04.jpg)

由于 2006-08 年高速移动互联网仍未普及，资费高昂，英特尔无法感知智能手机市场的增长。有分析师认为“个人电脑就是英特尔的世界观”。

2010 年，英特尔做出 Moorestown 芯片，但对智能手机来说太耗电了；此后出了改款 Medfield，首款搭载的智能手机是 2012 年 1 月发布的[联想 K800](https://www.163.com/tech/article/7NFPUIH3000915BD.html)，随后是在印度发布的 Xolo X900 与法国电信的贴牌机。

![](/img/2021/08/0804-05.jpg)

这些手机运行着 Android 系统，但在此之前英特尔又走了一段弯路。为了躲开 Android，英特尔先是搞了基于 Linux 的 Moblin，2010 年与诺基亚 Maemo 合并为 Meego；这个系统此后又转到三星手里变成了 Tizen。直到 2011 年，英特尔才下定决心选择安卓，但为时已晚。

与此同时，英特尔对小型设备芯片的开发重心放在了低功耗上面，而不是改善性能。这本来是因为 ARM 主打低能耗，但局部改善并不能追上根本性的能效比差异，只是稍微延长了此后“超极本”的续航时间。

到 2014 年，接替欧德宁的科兹安尼克（Brian Krzanich）决定投入巨额补贴实现凌动出货 4000 万片的目标。当年英特尔共出货 4600 万片凌动芯片，主要投向平板电脑市场，但导致了巨额亏损。科兹安尼克决定不再为 x86 手机重复补贴政策。这基本标志着英特尔在智能手机芯片市场的全面溃败。

随着手机芯片制程工艺日益进取，跟 ARM+台积电的组合相比，英特尔毫无还手之力。与此同时，各档次芯片的成本和售价也进入了下降区间。2019 年，英特尔最后将 5G 调制解调器业务卖给了苹果，从而彻底退出了手机芯片市场。[根据 Recode 的报道](http://recode.net/2016/05/02/intel-10-billion-on-mobile-before-giving-up/)，英特尔在移动设备芯片制造领域投入 100 亿美元（截止 2016 年），结果一无所获。

在此之前，它的最后一款 x86 安卓手机产品在 2018 年 MWC 上亮相，定位于低端机型，面向拉美及非洲销售。在 MWC 现场，[数码编辑顶着展台工作人员的压力](https://www.anandtech.com/show/12592/intels-last-atom-in-smartphones-a-2018-benchmark)，坚持了 20 分钟才勉强完成了一个性能测试，同时把机器变成了暖手宝。

![](/img/2021/08/0804-06.jpg)

![](/img/2021/08/0804-07.jpg)

综合来看，对 PC 的路径依赖，在切换到手机芯片赛道、选择 Android 操作系统等关键决策上的反复和短视，以及优化策略上的举棋不定，共同造就了英特尔 x86 手机芯片战略的破产。

由于英特尔在 2010 年代初最终决定切换到兼容 Android，这就意味着必须解决 ARM 指令集到 x86 芯片的转译问题，Houdini 就是在这个背景下开始研发的。在 2010 年的采访中提到，那时李剑慧“又回过头来继续做二进制编译项目”，推测此时他们的工作已经很接近研发 Houdini 的范围了。

## 从模拟器走向原生兼容

原本为 Android x86 版本研发的 Houdini 并未因为该版系统的低覆盖率而被雪藏，随着 5G 推进，Houdini 被用于日渐成熟的云游戏和 AI 领域。

[2018 年](https://baijiahao.baidu.com/s?id=1619466771320585374)“英特尔与腾讯公司合作，利用英特尔至强服务器的芯片处理能力，配合英特尔 Iris Pro 核心显卡独有的云端渲染与视频转码技术，以及 Houdini 指令翻译软件包，能够实现用户在使用 App 的过程中实时解码，严格控制云游戏保持低延迟的流畅表现，有效提升用户体验。”

另外，Houdini“可以在基于人工智能的平台上透明地运行 Android ARM 应用，带来出色的用户体验”。

不过就像上面提到的那样，Houdini 事实上应用最广泛的地方是 PC 安卓模拟器，市面上绝大部分的模拟器都是基于 VirtualBox + Android x86 + Houdini 方案。

![](/img/2021/08/0804-08.jpg)

虽然安卓应用当中有专属的美团、抖音等消费和娱乐工具，以及 Protake、扫描全能王等生产力工具，但社长觉得大部分人装安卓模拟器的最主要用途还是……游戏。

由于电脑具备大屏键鼠操控优势，难免对在线对战游戏的公平性产生影响。所以，不少游戏会用一些技术手段判断是否处于模拟器中运行。其中一个简便易行的办法就是查看系统目录是否带有 libhoudini.so 这个文件。国外有些“比较正经的”模拟器比如 Genymotion 都会保留该文件，而国内开发的模拟器品种，有的会为了对抗反作弊措施而设法隐藏该文件。

[在技术论坛上有人提到](https://segmentfault.com/a/1190000014999805)，某些优秀模拟器会让游戏获取的设备信息显示为 arm 而不是 x86，还会分配一个虚假的 ARM 处理器型号信息，欺骗游戏认为自己运行在一个 ARM 环境中。

为此，游戏开发者不得不长期采集使用电量、WIFI信号、蜂窝信号、陀螺仪等动态变化特征，才能判断是否运行在模拟器中。“如某 FPS 手游，新玩家进入后，分配到的游戏区不是模拟器专用游戏区，而当进入第二局游戏的时候，就被分配到了模拟器专区。”

——这也许就是为什么包括大型游戏在内，很多安卓应用都想方设法收集那些尽可能多的，看起来也许用不上的个人信息。

可以预计，基于英特尔 Bridge 的 Windows 11 安卓子系统，在给游戏和其它应用输送设备信息时会“诚实”地显示处于 PC 环境。

然而，多屏协同已经是肉眼可见的未来趋势，华为在官宣“鸿蒙”时已经演示了将小屏安卓游戏投射到同一家庭的平板上，以继续“作弊”的功能。

与此同时，安卓应用自身也在不断优化，为触屏、键鼠、折叠屏等多种使用环境的随意切换创造条件。举个例子，讯飞输入法最近的一次更新，让外接蓝牙键盘以后的表现，就像是电脑上的输入法一样，也可以使用 ctrl+c 和 ctrl+v 快捷键。

![](/img/2021/08/0804-09.jpg)

更不用说，以微软 XBOX Game Pass、谷歌 Stadia、英伟达 GeForce Now 为代表的新一代流式传输的“云游戏”，正随着 5G 和高速家庭宽带的普及而具备基础的可用性，将同一种游戏体验带到从手机、平板、PC 到电视的所有屏幕，甚至多次尝试“入侵”苹果封闭的应用商店生态。

2020 年 9 月，苹果宣布改变其 App Store 规则，允许游戏流媒体服务上架，不过附加要求每一款在云游戏平台内玩的游戏，本身也应该单独提交苹果商店审核。这是诸多云游戏厂商苦心争取的结果，而手握 XBOX Game Pass 的微软自身就是其中最大的游说者之一。

所以，原本人们会担心安卓完全为触屏设计的界面在电脑桌面水土不服，现在这个问题也在解决中。可能这也是 Windows 11 选在当下兼容安卓应用的一个原因。

## 谷歌宣布替代 APK 安装包是针对微软吗？

另一边，安卓自身也在不断演化。APK 包为基础的海量应用生态是安卓一手创造的，所以谷歌其实也并不想坐等微软或别的对手发展到足以形成威胁的程度。

几乎在 Windows 11 发布的同一时间，谷歌 Play 商店决定，将应用分发格式从 APK 安装包逐步过渡到谷歌自有的 AAB 格式。这是谷歌挟统治地位以令诸侯，对微软染指 APK 应用生态的反制吗？

当然，一种政策的部署自然需要其时间，这个 AAB 绝不是一夜之间开发完成的，而是已经推行了很久。它的本来目的是为了优化安装过程，减少下载应用消耗的流量和存储空间。

2018 年，谷歌推出了一种分发安卓应用程序的新方法，称为安卓应用程序捆绑包（Android app bundles, AAB）。它不表现为一个后缀名为 AAB 的单独安装包，而是按照处理器型号、屏幕大小、分辨率、内核版本等不同，按需拣选和下载组件，在安装的当时现场“组装”为一个临时的安装包。

常规的 APK 文件包含用于每一种可能的屏幕尺寸和处理器架构的资源文件，但 AAB 使得 Play 商店保存在手机上的安装包，只有适合这台手机的特定架构、屏幕大小的资源文件。

![](/img/2021/08/0804-10.jpg)

这种按需下载资源，再组装起来的方法有如下好处：

- AAB 平均比 APK 小 15%，因此下载速度更快。
- AAB 需要 Play 应用签名，使用谷歌的安全基础设施保护应用签名的完整性。
- 对于不同设备需要提供定制版本的情形，Play 功能交付使开发人员能够自定义某些设备上下载应用时，会传送哪些功能模块。
- 另一个仅限 AAB 的功能是，对于游戏内贴图、动画等应用内的大型资产，用户同样可以只获得适合其设备、屏幕尺寸的版本，而不会浪费空间或带宽。

[有国内报道显示](https://www.cnbeta.com/articles/tech/1125729.htm)，华为在鸿蒙 2.0 系统中对一些应用做了专门优化，其优化逻辑可能也是减少用于兼容其它机型的资源文件。“有知乎用户发现，2.0.0.053 版本的鸿蒙系统，内置了三个鸿蒙 App，包括央视影音、优酷和新浪新闻。而鸿蒙版央视影音只有 1.35MB，比安卓版本要小很多。”

在谷歌宣布 AAB 逐步替代 APK 上架商店之前，一些流行的应用——包括 Netflix、Chrome 等——早已采用了这项新技术，使得它们无法上传到 APKMirror、APKPure 这样的第三方应用商店（也不能上传到华为的 AppGallery）。

经过一年多的开发，APKMirror 提供了一个可以组装 AAB 安装包的第三方应用安装器 [APKMirror Installer](https://www.androidpolice.com/2020/03/24/apkmirror-installer-for-android-now-in-public-beta-lets-you-install-app-bundles-and-apks/) 。它如同一个文件管理器，由用户选择文件手动安装，所以可以不违反谷歌 Play 商店的准则。

从 8 月开始，谷歌 Play 商店已经要求开发者发布更新时使用较新的 AAB 格式。谷歌解释说，现在有超过 100 万个应用使用 AAB，包括 Play 排名前 1000 位的应用和游戏中的大多数，如 Adobe、Duolingo、Gameloft、Netflix、Twitter 等厂家。

资深微软分析师 [Paul Thurrott 认为](https://www.thurrott.com/dev/252614/google-is-replacing-android-apk-with-aab)，谷歌改用 AAB 显然是针对包含亚马逊 Fire 在内的所有其他安卓商店，而不是 Windows；但是，宣布 Windows 11 能支持 APK 包，可能会加速谷歌推动 AAB 的决定。

当然，总体上谷歌的改动无伤大雅。毕竟，APK 是最知名的安卓应用安装格式，并且已经存在了很长时间。APK 是所有安卓及魔改版系统都兼容的最大公约数，加上存量众多的中国“特供版”安卓应用商店，未来这一格式被替代的可能性微乎其微。

## 今后的应用就不再有“电脑版”了？

微软纳入疲弱的亚马逊 Fire 商店，以上架受信任的安卓应用。但鉴于 Win11 可以旁加载安卓应用，即使不想上架商店，开发者也可以提供 APK 包作为让 Windows 用户直接体验的手段。

不过，旁加载应用的一个问题是为盗版、破解版大开方便之门，而另一个问题是安全——目前的机制下，Linux 和 Android 子系统相当于运行在 Hyper-V 平台上的“虚拟机”，但不同于真正的虚拟机，它们跟主系统并没有彻底隔离。如果用户的安全意识不足，为安卓应用开放了过多权限，就有风险存在。以往有些勒索病毒可以穿透虚拟机，感染存储在主机上的文档。

这样一来，微软需要认真地考虑在中国区跟哪个安卓应用市场合作——说不准是应用宝？可以想见，Windows 11 可以更进一步吸引更多海外 App 跟中国一样，抛弃对谷歌 GMS 的依赖。

Windows 11 直接兼容安卓应用也许会引起很多连锁反应，其中最夸张的一种猜测是，有的开发者可能会就此转向只开发一次 iOS 和安卓应用，放弃对 PC 原生版的开发。

从上古 Java 到 Flash，再到 Electron、React、Flatter 等框架，“写一次就到处运行”的信仰之火从不熄灭，但只是越发微弱。开发者逐渐体验到，在一个平台上，如果能原生运行相关的应用，其效率一定是更高的。

现代跨平台开发的主要方式是 HTML，也包括小程序等各种变种，在封装之后加入了本地缓存能力而成。但网页的显示效率取决于手机/电脑上的 WebView 控件，它往往要吃掉很多资源，而且导致卡顿。

轻芒创始人王俊煜曾对航通社提到，轻芒杂志 App 的首页作为一个无限滚动的页面，原本是选用原生与网页的混合模式开发，但效率非常低，所以最后改成了纯原生样式。而 Windows 11 当中的微软商店[也进行了类似的修改](https://www.cnbeta.com/articles/tech/1148501.htm)，从 Win10 时代的 HTML/CSS 编写改成了微软原生的 XAML 语言，所以页面滚动更顺滑了。

所以，随着 Mac 支持 iOS 应用，Windows 支持安卓应用，开发者是否会逐渐放弃开发 PC/Mac 版本？

这是否会成为一个趋势，还要看 Bridge 的具体运行效果如何，是还会卡顿，还是如丝般顺滑。这也要看未来安卓手机、平板、折叠屏设备的多点开花，是否呼唤着开发者适配不同大小的屏幕和不同的输入方式。

现有的跨平台开发技术，大多面临着要选兼容性，还是选效率和稳定性的难题。可以想见，如果开发者没必要二选一，他们大多数人会做何选择。

这也可能是又一次像是渐进式网页应用（PWA）的失败尝试，毕竟从现在看它也有很多可能导致失败的隐患。但它万一成了，对未来应用生态的影响，可能远超出我们现在的想象。

[微软 CEO 纳德拉认为](https://www.theverge.com/22549385/microsoft-satya-nadella-interview-windows-11-decoder)，兼容安卓应用对于原本专研安卓开发的人是重大利好。

> “通过将安卓应用曝光在超过十亿的用户群中，为构建安卓应用的人创造更多机会，我认为开发者和用户都会从中受益。”
>
> “在微软，我们为 iOS、安卓、Windows 构建应用。这是我们面临的根本挑战之一。我们正在努力确保开发人员可以利用尽可能多的通用代码库和云，但同时，又在每个平台上是原生的。”
>

由中国工程师李剑慧领衔，英特尔中国团队研发的 Houdini 是 Windows 11 实现其兼容安卓应用愿景的基础。不过这并非中国人对跨平台、跨架构兼容所做的唯一贡献。

[航通社之前的文章提到过](https://mp.weixin.qq.com/s/i1yGqvjtX2cObNIsZXV1DA)，深度-统信软件对 UOS/Deepin 下的 Wine 做了大量细致的工作，使得分支 Deepin-wine 对部分国产软件的兼容适配程度大为提高。

今年 6 月 20 日，麒麟软件有限公司发布优麒麟 20.04 LTS Pro 版本，首次宣布支持移动兼容环境，也就是[在优麒麟桌面上运行 Android 应用](https://www.cnbeta.com/articles/tech/1149477.htm)。此前 UOS 在 ARM 架构机器上的版本可以运行少部分 Android 应用，因为不需转译。而优麒麟的“麒麟移动运行环境”KMRE 与此还有不同。

![](/img/2021/08/0804-11.jpg)

官方介绍称，“KMRE 不是虚拟机，而是真正地将 Linux 和 Android 操作系统‘合二为一’，通过共用内核，直接使用硬件，同时支持 ARM 和 x86 设备和多种 CPU、GPU，更有效解决了显示性能损耗、多窗口运行、桌面共享、文件互通等问题。”

KMRE 是 Google Arc 之外在 Linux 上运行安卓应用的另一选择，不再依赖于闭源的 Chrome，针对开源驱动的显卡，能够直接访问硬件，做到零性能损失。

在 Linux 上运行 Android 版的腾讯会议时， KMRE 可以将电脑上的文档，乃至整个 Linux 桌面共享给其他参会者。针对大型 Android 游戏，还实现了模拟多触，支持技能键、方向键的设置，让用户可以用鼠标和键盘操作游戏。

这样的高度融合需要适配众多的处理器和显卡，在适配工作量大的情况下，为保证产品质量，安卓应用暂时只能通过软件商店下载，而今后会开放安装本地 APK 包。

这几年，“国产操作系统”或者其它在 Windows、安卓、苹果之外的选择，正变得越来越实际可用。不论是专为替代系统研发的应用软件，还是让新系统兼容现有的应用生态，全世界都不是毫无作为，而其中中国人所做的贡献，显得尤为突出。

世界上没有永远盛开的花，当初某些标准占据了统治地位，并不意味着永远如此。曾几何时，当我们讨论起国内所谓自主知识产权的操作系统，说到最困难的部分也就是如何搭建应用生态。而借力安卓，并且借助安卓在 PC 的大范围使用，优化其针对键盘/鼠标的交互，使其成为电脑上人们常用的应用形态，长远也会帮助国产系统绕过 Windows 和 macOS 两座坚固的壁垒。

**📕 参考资料**

- https://newsroom.intel.cn/news-releases/intel-bridge-technology-unleash-windows-11-experience/
- https://cn.engadget.com/intel-bridge-windows-11-android-apps-082012029.html
- https://www.intel.cn/content/www/cn/zh/artificial-intelligence/posts/intel-facebook-boost-bfloat16.html
- https://patents.justia.com/inventor/jianhui-li
- https://www.mixuai.com/20150119/716006.html
- http://vic.sina.com.cn/news/27/2011/0126/28208.html
- https://github.com/Jianhui-Li)
- https://www.zhihu.com/question/467264037/answer/1967747846
- https://www.pcworld.com/article/3065894/how-intel-knocked-itself-out-of-the-smartphone-chip-market.html
- https://www.163.com/tech/article/7NFPUIH3000915BD.html
- http://recode.net/2016/05/02/intel-10-billion-on-mobile-before-giving-up/
- https://www.anandtech.com/show/12592/intels-last-atom-in-smartphones-a-2018-benchmark
- https://baijiahao.baidu.com/s?id=1619466771320585374
- https://segmentfault.com/a/1190000014999805
- https://www.cnbeta.com/articles/tech/1125729.htm
- https://www.androidpolice.com/2020/03/24/apkmirror-installer-for-android-now-in-public-beta-lets-you-install-app-bundles-and-apks/
- https://www.thurrott.com/dev/252614/google-is-replacing-android-apk-with-aab
- https://www.cnbeta.com/articles/tech/1148501.htm
- https://www.theverge.com/22549385/microsoft-satya-nadella-interview-windows-11-decoder
- https://mp.weixin.qq.com/s/i1yGqvjtX2cObNIsZXV1DA
- https://www.cnbeta.com/articles/tech/1149477.htm

**👉 延伸阅读**

- [我们永远也够不着的“下一代 Windows”](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650662444&idx=1&sn=a4e431bbf9645848e5c90891ae995d80&chksm=be96af2089e12636566629481742007dd94d0ef19431fef95c4cf6ed5a670183987d7659d1f2&scene=21#wechat_redirect)
- [说说鸿蒙和“万物互联”](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650662459&idx=1&sn=1028d31ea1db99ebc258c77e63a1c00c&chksm=be96af3789e1262192a0b2cd167e12492448760755d14558227e0e5a797ada82945bcc90b73f&scene=21#wechat_redirect)
- [政府采购迟迟不敢上 Win10，死守 Win7 为哪般](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650661359&idx=1&sn=01f38e5aaa8cb9de2c5be0f31b1c9a25&chksm=be96a8e389e121f5fc3770c1bf9673a16f6eb149b8f220c416b928bf88bbcf2b68140a046cd4&scene=21#wechat_redirect)
- [不可能的任务：Windows 10 走向 10 亿装机量之路](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650658602&idx=1&sn=e84beb2138d9c98065de7b9a1ac91faa&chksm=be969e2689e117307fc05116e491754770a0c8a7bdffbcaf28440e5bf952965bae2773832988&scene=21#wechat_redirect)
- [Windows Phone 要起死回生？那得先弄死所有的“手机”](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650658889&idx=1&sn=96e98bafcffcddc1c5b5cd5551be50f7&chksm=be96914589e11853e5924fee982c8f876e8e1ede8317a7e3ea487ad674a4cd65e7c1fe96677a&scene=21#wechat_redirect)
- [围墙剥落，“鸿蒙”初开](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650660633&idx=1&sn=98dd1c9546c8930ca9159a6f7a01fe88&chksm=be96961589e11f033d1630395395a946283ab87cf0825767fca20a7f0c0c5fb1671b444926c0&scene=21#wechat_redirect)
- [国产 PC 操作系统终于要熬出头了？](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650660811&idx=1&sn=81d13dca7caf7b6f49bd369d1cd9bd82&chksm=be9696c789e11fd1d6ddf19215b153b1353b34159ad90fffc3f0f2fd7a341fa3504299539800&scene=21#wechat_redirect)
- [说说“联想反对预装国产操作系统”这件事](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650659744&idx=1&sn=063d1143ac2860e34a6a408959609142&chksm=be9692ac89e11bba39f9e879fb1211122d116f601e7368e51af98c76208de74f5dfe9f9686c8&scene=21#wechat_redirect)
- [什么？韩国人开发了全兼容 Win7 的自主操作系统？](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650661292&idx=1&sn=e3e1739aff98fcdfe355b949b7831bda&chksm=be96a8a089e121b6ee1baff05ebbc84055550b943d2c6fd8d986ecccba38abb006ebe7541ca5&scene=21#wechat_redirect)