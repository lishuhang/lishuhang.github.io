---
layout: post
title: "航通社的朋友们 _ 教程：从零开始搭建 Discourse 论坛"
date: 2019-03-31
categories: 文章
tags: [科技]
image: https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/01.jpg
---

👆点航通社，先关注，再加星⭐

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/01.jpg)

本文首发于航通社，原创文章未经授权禁止转载

航通社微信：lifeissohappy 微博：@航通社

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/05.jpg)

航通社（微信公众号：lifeissohappy）有一个微信群，名字就叫“航通社的朋友们”。以下这篇教程就来自群内同学 TrickleHub 撰写，引言部分经过航通社编辑。

欢迎大家加入读者群（限时免费）并把你的原创稿件踊跃投递给我们，每周日我们会发布群周报，同时刊登大家的优秀作品。

加入读者群的方法请见文章底部。

为什么选择 Discourse

提到论坛，常用中文的读者一定会想到 Discuz!，phpwind 这两个论坛系统。更早的 PHPbb、动网论坛（DVbbs）等也是老网民的美好回忆。

然而，自从 Discuz! 和 phpwind 分别被腾讯和阿里收购后，其版本更新已经陷于停滞，从技术和安全性角度看，都已经远远不适合现在的互联网的需求。而且，鉴于商业软件可能带来的版权隐患，也有必要寻找一些开源的论坛框架方案。

此时，相对于 Flarum、NodeBB 等对手，Discourse 的优势有以下这些：

（1）多功能，高度可定制：可以按需做成论坛式和 Wiki 式，也包含邮件列表、写博客等功能。

（2）繁荣的社区：完善的多语言、全球化支持，有活跃的官方和民间社区，提供插件、魔改等多方面的义务咨询。本文作者从 0 基础开始自学建站过程，其中得到了英文社区跨越时差的很多帮助。

（3）强引导和设计感：优雅简单大方的界面，完备的新手引导过程，有助于营造一个良好的社区氛围。

相应的，Discourse 的缺点是基于 Ruby on Rails，所以很吃服务器资源（但如果是云主机无所谓）。

以采用 AWS 为例，从购买主机、域名到建站的全过程

由于微信编辑器无法启用所有微信站外链接，以下涉及到网址的地方，请在灰字部分复制网址，粘贴到浏览器打开。

1、注册一个 AWS 账号

AWS（亚马逊提供的云服务，用于主机托管）：https://aws.amazon.com/cn/注册：https://portal.aws.amazon.com/billing/signup#/start

提示: 激活 AWS 服务可能耗时较长，我绑定的信用卡完成 1 美金的授权之后 23 小时 55 分钟后才完全激活

2、注册一个 NameSilo 账号

NameSilo（注册域名的服务，比国内供应商选择更多，相对也更便宜）：https://new.namesilo.com/注册：https://new.namesilo.com/create-account

3、在 NameSilo 上搜索并选择一个你喜欢的域名，在支付页面完成支付

搜索：https://new.namesilo.com/domain-search支付页面：https://new.namesilo.com/billing

提示: 支持使用支付宝支付，但是需要填写支付宝邮箱账号；如果之前没有绑定邮箱，可以参考支付宝提供的支持文档

支持文档：https://cshall.alipay.com/lab/help_detail.htm?help_id=211761

4、前往 AWS EC2 控制台，创建实例EC2 控制台：https://console.aws.amazon.com/ec2/v2/home

a. 选择最新版本的 Ubuntu Server LTS 即可

b. 因为 AWS 注册成功后提供 12 个月每月免费使用 Linux、RHEL 或 SLES t2.micro 实例 750 小时，那在这里就选择 t2.micro 实例免费：https://aws.amazon.com/cn/free/?awsf.Free%20Tier%20Types=productcategories%23compute

c. 点击审核和启动，会自动跳转至审核，在这里需要修改一下“存储”选项，因为它默认的 8GiB 太小了，事实上 Discourse 要求的最低配置 10GiB 也不够，我目前使用的是 16GiB要求：https://github.com/discourse/discourse/blob/master/docs/INSTALL.md

d. 修改完成后，点击启动，它会提示你创建一个密钥对，按照它的提示去做就可以了，不过需要注意的是：务必保存好它提供的私有密钥文件(*.pem 文件)，因为这个文件仅能下载一次

e. 自动跳转至启动状态页面，页面中有一个如何连接至您的 Linux 实例的链接，在新建标签页中打开它如何连接至您的 Linux 实例：https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/AccessingInstances.html

5、因为我使用的是 Windows 系统，选择了使用 PuTTY 从 Windows 连接到 Linux 实例，这里只需要看使用 PuTTYgen 转换您的私有密钥和启动 PuTTY 会话即可使用 PuTTY 从 Windows 连接到 Linux 实例：https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/putty.html

使用 PuTTYgen 转换您的私有密钥：https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/putty.html#putty-private-key

启动 PuTTY 会话：https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/putty.html#putty-ssh

6、按照 30 分钟内在云上部署 Discourse(Set up Discourse in the cloud in under 30 minutes) 这个说明文档去做就行。

这里直接跳转至 Install Docker / Git，照着说明文档一步一步操作即可，一直操作到 Edit Discourse Configuration 这一步。

30 分钟内在云上部署 Discourse：https://github.com/discourse/discourse/blob/master/docs/INSTALL-cloud.mdInstall Docker / Git：https://github.com/discourse/discourse/blob/master/docs/INSTALL-cloud.md#install-docker--gitEdit Discourse Configuration：https://github.com/discourse/discourse/blob/master/docs/INSTALL-cloud.md#edit-discourse-configuration

在这里解释一下 Edit Discourse Configuration 这一步中 Answer the following questions when prompted: 后要求你输入的一部分内容应该如何填写：

a. Email address for admin account(s)? [me@example.com,you@example.com]: 这一项，需要输入的是管理员的邮箱账号（后续步骤中会需要验证邮箱，请务必确保邮箱真实有效），至少输入一个，可以输入多个，（如果输入多个邮箱）用 , 分隔

b.

SMTP server address? [smtp.example.com]:

SMTP port? [587]:

SMTP user name? [user@example.com]:

SMTP password? [pa$$word]:

这四项，需要填写的分别是用于向所有用户（包括版主和管理员）发送包括但不限于摘要/确认并激活账户/系统提醒的邮箱的 SMTP 服务的服务器地址、端口、用户名和密码

如果你不是特别在意邮箱是否以你的域名结尾，填写一个你注册的支持 SMTP 服务的邮箱信息即可，至于如何填写，请参考邮件服务商提供的参考文档

这里以 Gmail 为例：在 Gmail 帮助中心搜索 SMTP，点击展示的第一个结果帮助中心：https://support.google.com/mail

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/03.png)

按照网页中给出的步骤一步一步操作就可以了。

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/04.png)

c. 建议填写 Let's Encrypt account email? (ENTER to skip) [me@example.com]: 这一项，以支持 HTTPS

7.前往 AWS EC2 的安全组面板。

安全组面板：https://console.aws.amazon.com/ec2/v2/home#SecurityGroups

选择要修改的安全组（一般情况下，你需要选择的是组名为 launch-wizard-1 的安全组），选择 入站，点击编辑，在弹出的对话框中，选择添加规则，在类型下拉菜单中选择HTTP，再次选择添加规则，并在类型下拉菜单中选择HTTPS，点击保存

8.前往 NameSilo 的 DNS 管理页面（需要先访问域名管理页面，选择要管理的域名，随后跳转至 DNS 管理页面）和 AWS EC2 的实例面板。

域名管理：https://new.namesilo.com/account_domains.php实例面板：https://console.aws.amazon.com/ec2/v2/home#Instances

在 DNS 管理页面的 Select the resource record type you want to create: 选择 A，随即跳转至一个新的页面。在这个页面中：

a. HOSTNAME 一栏，填写你在《30 分钟内在云上部署 Discourse》中 Edit Discourse Configuration 步骤中的 Hostname for your Discourse? [discourse.example.com]: 填写的类似 discourse 的部分，

b. IPV4 ADDRESS 填写 AWS EC2 的实例面板中选择实例后显示的 IPv4 公有 IP，然后点击 SUBMIT 即可。

9、稍等片刻。

访问你在《30 分钟内在云上部署 Discourse》中 Edit Discourse Configuration 步骤中的 Hostname for your Discourse? [discourse.example.com]: 填写的那个网址，效果应该是题图这样的。

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/05.jpg)

那么，恭喜你成功安装了 Discourse！

TrickleHub 有另一个教程讲了中国用户可能在使用 AWS EC2建站时遇到的其它问题，点击 阅读原文 可以查看。

本文由“航通社的朋友们”群内同学 TrickleHub 撰写，引言部分经过航通社编辑。如果你觉得本文有帮助，可以通过扫码支持作者：

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/06.png)

“航通社的朋友们”这个群目前是免费加入的。

如果你感兴趣，可以在微信搜索 hangtongshe 添加航通社助理，添加时请务必在附言中说明你想进群。

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/07.gif)

![](https://lishuhang.me/img/2019/03/31/hang-tong-she-de-peng-you/08.jpg)

欢迎随手转发到朋友圈。寻求转载授权，请关注微信公众号航通社 (ID:lifeissohappy) ，并在后台留言输入关键字转载。转载时请保留版权信息。

和 3000+ 个小伙伴一起点 在看 👇