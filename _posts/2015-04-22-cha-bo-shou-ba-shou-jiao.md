---
layout: post
title: "#插播#手把手教你做一个“今天是周五么”的微博机器人"
date: 2015-04-22
categories: 文章
tags: [科技]
source: "https://zhuanlan.zhihu.com/p/20010247"
---

不知道我为什么要写这个的请看下面几张图片：

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/01.jpg)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/02.jpg)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/03.jpg)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/04.jpg)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/05.jpg)

好了，了解了背景资料，我们来手动做一个能实现这种功能的微博机器人：

1、登录IFTTT [Put the internet to work for you.](https://link.zhihu.com/?target=https%3A//ifttt.com/)，点击“Create a Recipe”创建一个新的触发条件；

2、点击“if this then that”当中的“this”；

3、选择“Date & Time”：

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/06.jpg)

4、选择“Every day of the week at”：

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/07.jpg)

5、选择每周五的早晨 7：45，这就是原版 @今天是周五吗 发布微博的时间：

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/08.jpg)

6、点击“that”；

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/09.jpg)

7、搜索“weibo”定位到新浪微博；

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/10.jpg)

8、选择“Publish a new post”：

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/11.jpg)

9、写上你要发出的话和可选配图。这里提供一下原版微博在每周五的萌猫图片的地址：[http://ww3.sinaimg.cn/large/4b91f9d5jw1ereocor6toj20fz0armz1.jpg](https://link.zhihu.com/?target=http%3A//ww3.sinaimg.cn/large/4b91f9d5jw1ereocor6toj20fz0armz1.jpg)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/12.jpg)

9.1、如果你没有图床，就在微博上直接上传一张，在复制图片地址后删除刚发的微博。微博删除后，上传的图片不会跟着删除。

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/13.jpg)

9.2、将中等大小的图片在新窗口打开，将网址当中的 bmiddle 改为 large，就可以快速获得原来尺寸的图片。

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/14.jpg)

10、给刚做的触发条件起个名字，点“Create Recipe”就好啦。

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/15.jpg)

其他几天的，可以依样一天做一个。这些条件可以叠加，不用担心前面的会失效。

你还可以把做好的触发条件发布（Publish）出来，比如为了大家方便，我就发布了我刚做好的这个条件。 [点这里就可以一键用在你自己的微博上了](https://link.zhihu.com/?target=https%3A//ifttt.com/recipes/282054-) 。它可以让你在每周五早晨发布一条带有萌猫图片的微博提醒大家今天是星期五。

最后再给大家三个网址充分满足你想知道今天是不是星期五的愿望：

[Is it Friday?](https://link.zhihu.com/?target=http%3A//isitfriday.org/)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/16.jpg)

[Is Today Friday?](https://link.zhihu.com/?target=http%3A//www.istodayfriday.com/)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/17.jpg)

[Is It Friday Yet?](https://link.zhihu.com/?target=http%3A//isitfridayyet.org/)

![](https://lishuhang.me/img/2015/04/22/cha-bo-shou-ba-shou-jiao/18.jpg)

不用谢。