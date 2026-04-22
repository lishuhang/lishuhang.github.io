---
layout: post
title: "为什么Windows 10图标丑？这是我的改进方案"
date: 2015-05-25
categories: 文章
tags: [科技]
source: "https://zhuanlan.zhihu.com/p/20043499"
---

大家都说Windows 10图标丑。我也这么觉得。不过我觉得，如果要把图标改得顺眼点，也没那么麻烦，只要找到问题出在哪里，简单调整后的图标就会好很多。

造成图标难看的根本原因是风格不协调。很多Android手机ROM采用自己的风格，但图标没有都重绘，有些必须用默认风格，就显得很突兀。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/01.jpg)

苹果在Yosemite扁平化的过程中特意强调他们注意到了这个问题。因此，Yosemite内置应用图标保留了一定程度的3D风格，看起来像是线框图标变成了鼓起来的贴纸。这样，原来的3D图标就不显得突兀。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/02.jpg)

Windows 10 PC图标最大的问题是有些图标是单色线框，一看就不是3D而是2D，而大多数桌面应用仍采用3D图标。因此，需要把2D图标用统一的视角转换为3D。

同时，Windows 10还存在两套界面（PC和Metro）并存的问题，因此同一个应用需要设计两套图标，以适应不同条件下的应用。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/03.jpg)

根据现有的图标方案，在PC下的图标都有向左倾斜45°和向下45°俯视的视角；而Metro界面（或者Modern，随你大小便啦）的图标是正视视角。因此所有的图标都应该设计3D侧视和正视两种形态，以实现不同界面下都呈现基本一致的视觉效果。

正视视角的Metro版图标还适用于低分辨率的情形，此时不能呈现太多细节。比如16x16的小图标。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/04.jpg)

比如首先是“我的电脑”。新版改为“这台PC”，不过因为Windows 10不限于PC，建议根据设备不同而自动显示PC、笔记本、平板、手机等图标，而名称就改为“本机”（This Device）。

左侧是PC图标，右侧是Metro图标（请自行脑补给左侧图标上色，右侧图标则维持单色线条），下同。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/05.jpg)

被吐槽最多的是回收站，有两个问题：1是自2000开始垃圾桶就改成了圆角，为啥要改回9x的方角呢？其他图标如驱动器图标也并没有完全排斥圆角。2是中间的回收符号太粗，Win 10的统一风格都是细线（参照X图标）。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/06.jpg)

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/07.jpg)

在整个界面中最常见的文件夹图标被Win7给带歪了，明明就是PC版图标侧视，Metro版正视这么简单，但搞得视角错乱到一塌糊涂，当然给人的感觉是乱糟糟的。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/08.jpg)

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/09.jpg)

各种存储设备的视角也要保持一致。视频文件和光盘是正视，硬盘、存储卡和DV等都是侧视，看着当然会显得十分不规整。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/10.jpg)

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/11.jpg)

控制面板图标也是同理。这里在原版中不协调的是“重命名”，是正视视图。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/12.jpg)

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/13.jpg)

警告图标和提示既然都扁平化了，那就请不要当它们是盾牌和球，而是一块平面装饰板。（实际上我们就是这样在Hololens里面看Metro色块的）

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/14.jpg)

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/15.jpg)

最后要说的是商标。没错，商标也要切换视角，在线商店的Metro图标就是侧视视角，应该改成正视。最后提到的是，Metro App在PC资源管理器显示的时候，同样需要改为侧视视图，参照在Hololens里面的效果。

![](https://lishuhang.me/img/2015/05/25/wei-shen-me-windows-10-tu/16.jpg)

相信这样修改后，Windows的图标一定会顺眼不少。总体原则是：1）主要图标PC视角为左转45°侧视，Metro视角为正视；2）单色线条图标在PC和Hololens下需要加框并像一块画板一样左转45°；3）所有图标都最好同时设计两种版本，如果做不到，缺省设计Metro版本，在PC直接转换视角。

我不是专家，这样调整后的效果还需要读者做出评判。

[cnBeta](https://link.zhihu.com/?target=http%3A//www.cnbeta.com/articles/396515%3Fforce%3D1)