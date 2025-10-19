---
layout: post
title: "SlowQuitApps：解决Mac程序误按Cmd+Q退出的问题"
date: 2016-07-19
categories: 文章
tags: [科技]
image: https://lishuhang.me/img/2016/07/19/slowquitapps-jie-jue-mac-cheng-xu/01.png
---

我们都知道在Chrome浏览器当中，如果按一次退出组合键Cmd+Q的时候会害怕按错，可以在设置中选择按两次Cmd+Q之后再退出。但是Mac Safari本身并没有这样的功能。

之前的一个解决方案是把Safari的退出快捷键，在系统偏好设置当中单独修改为另外一个键，这样习惯性的按Cmd+Q这个键的时候就会发现不起作用，得思考一下之后再退出。但这也不是长久之计。

终于我发现了这款神器：SlowQuitApps。这是一个没有界面的应用，下载这个应用之后双击即会提示是否在系统登录时自动开启，此后就静默运行。这个时候，不管你在任何一个程序当中摁下Cmd+Q退出组合键，都会在屏幕上显示一个黑色的倒计时，持续1秒，只有Cmd不松开，持续到这个计时器走满，才会执行退出命令。这样的话，即使是其他应用也都可以如法炮制，防止一旦误操作马上退出的问题。

如果嫌1秒太短还可以自己修改延迟时间：进入终端后输入

就是延迟5秒（修改的单位是ms）。

虽然这个功能非常赞，但是为了单一的特定功能非得要用一个小插件来解决问题，这也是水果家风格啦。想想iOS吸收了那么多越狱插件的精华，希望在下一版系统更新当中，也可以把这个小功能加进去。

> 微信公众号 lifeissohappy知乎专栏 https://zhuanlan.zhihu.com/lishuhang新浪微博 @lishuhang

微信公众号 lifeissohappy

知乎专栏 https://zhuanlan.zhihu.com/lishuhang

新浪微博 @lishuhang