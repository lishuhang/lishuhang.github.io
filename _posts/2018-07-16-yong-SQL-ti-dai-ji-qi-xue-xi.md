---
image: "http://ww1.sinaimg.cn/large/4b91f9d5gy1fu3aeuceuqj20u00gwau7.jpg"
layout: post
title: 用SQL替代机器学习，这是新时代的“电风扇吹香皂盒”吗？
comments: true
categories: [ article ]
---
3750 字 / 10 分钟


本文首发于**航通社**，原创文章未经授权请勿转载。航通社 **(ID:lifeissohappy)** 微博 **@lishuhang**

7月1日，在Hacker News上面有一篇文章火起来了。作者是尼日利亚的软件工程师Celestine Omin，至于题目嘛……足够惊悚：《要啥机器学习/人工智能，用SQL就够了》（No, you don't need ML/AI. You need SQL）。

（ https://cyberomin.github.io/startup/2018/07/01/sql ml ai.html ）

![](http://ww1.sinaimg.cn/large/4b91f9d5gy1fu3aelkmzaj20h405r0tj.jpg)

Omin曾经就职于尼日利亚最大的电商网站之一Konga。在为他们优化购物流程，提升复购率的过程当中，他使用SQL解决了一些问题，而这些问题是人工智能和机器学习业界反复宣传的应用场景。

Omin说，现在人们需要那么复杂的AI来改造一切，不过有的时候，他们只是需要一项1970年代就已经被发明出来的技术。

文章在Hacker News上面的评论区还真是挺火爆的，而该文也因此被译介到国内。

（ https://zhuanlan.zhihu.com/p/38827634 ）

当人工智能已经成为一门显学的时候，如果你不跟进，也许会冒着成为“新世纪的老古董”的风险。此时怎么也入不了门的我们，可能非常需要一篇反潮流的文章来泼盆冷水，顺便给自己吃颗定心丸。而Omin的文章就承担了这样的角色。

1 | 这会是一个有理有据的“段子”吗
----------------------------

Omin说他在供职于Konga时，只是跑了一遍数据库，就筛选出所有3个月没有登录过网站的用户，给他们重新推了优惠券。另外，还跑了一遍用户购物车的商品清单，从而决定该怎样根据这些热门商品，决定推荐什么相关联的商品。

而这两个例子——对老用户精准营销和个性化推荐，都是机器学习/AI最为常用的领域之一。虽然SQL做出来的用户画像和结果远不如AI训练后精准，但似乎已经完全够用了。

Omin说用SQL查询潜在回头客的方法“比用AI和ML算法的效果厉害得多”；而基于SQL的个性化推荐，大多数营销邮件的打开率在7-10%之，做得好时打开率接近25-30%，是行业平均打开率的三倍。

有鉴于采用AI/ML的投入要高很多，而且是持续性的租用投入，两相比较，让航通社想到两个传了很久的中国段子，就是**“电风扇吹香皂盒”和“宇航员用铅笔”**。

为了方便没听说过的同学，简单复述一下：段子说，某香皂厂要挑出没装香皂的空盒子，花大价钱做了鹰眼什么的机器，然后中国的一个小工花几十块钱买了电风扇，把纸盒子吹跑了。

段子还说，NASA投入巨资开发了在失重条件下也能使用的太空自来水笔，而俄国人没用这个研发经费，只是用铅笔写字就解决了问题。

很显然，用小聪明的“0成本”方案，绝对不可能是十全十美的。对这些段子的“辟谣”指出，电风扇吹纸盒会造成生产线上盒子乱飞，而铅笔会导致石墨碎屑飞到空中。

相信段子的人，可能并没有亲身体验过超级工厂或太空严苛环境，或者没受到过相应的教育；而恰好段子提出的方案，针对小本经营的个体户非常实用，可以在大家心中产生共鸣。

与段子不同的是，说AI/ML不如SQL的Omin并非信口开河，而是基于自己的实践经验总结的。而他所服务过的，又是一国最大的电商网站。这是否意味着事情会有什么不一样呢？

2 | 爆文背后，尼日利亚电商现状几何
----------------------------

对大多数从事AI/ML的人们来说，尼日利亚是很陌生的一个市场，自身并没有切身的体会。如果贸然挑战Omin，是否会成为另一个维度上的“井底之蛙”呢？

要想看Omin所说的情况到底是不是成立，还是得根据尼日利亚的实际情况，结合他的语境去具体分析。

尼日利亚的电信基础设施和互联网业界状态，有点儿像2004-2008年的中国。绝大多数有意上网销售的卖家，都会自己购买域名和空间，建立有自己购物车的独立网店，但这类个体户的生存土壤正在消失。

随着本土作战的Konga，和由著名孵化器Rocket Internet扶持的Jumia成为尼日利亚电商平台两强，以往的小电商个体户纷纷进驻，似乎正形成一个类似淘宝和京东的竞争局面。

（ http://www.cifnews.com/article/28816 ）

![](http://ww1.sinaimg.cn/large/4b91f9d5gy1fu3ad1nfduj20u00jnwyz.jpg)

Rocket Internet希望通过Jumia，在非洲复制其在东南亚的成功经验，诞生下一个Zalora、Lamudi。

![](http://ww1.sinaimg.cn/large/4b91f9d5gy1fu3aax3rbgj20u00hlh4n.jpg)

Omin所供职的Konga拥有本土和先发优势，该网站始建于2012年，已经有了一万个左右的入驻商户，同时在全国拥有300多个线下的取货点，还拥有自己的支付平台。

然而，就是这样的一个“五脏俱全”的电商综合体，在今年3月份因为经营不善，严重亏损被……卖掉了。

去年11月，Konga裁掉了近60%的员工，今年2月被当地移动通信运营商Zinox收购，随后原 CEO Shola Adekoya 辞职。

Zinox旗下拥有一个自营电商网站Yudala，现在和Konga合并，并采用更响亮的Konga品牌（不禁让人想起京东和拍拍网）。

（http://www.cifnews.com/article/34538）

这……可能就很尴尬了。

Omin作为一个技术人员供职Konga网站，假如这位大哥先做完优化，Konga才被卖，那就说明他所做的这些优化，也没有起多大作用；

而如果是在今年3月合并之后才进行，那只能说明这个“尼日利亚最大电商网站”的基础太差，底子太薄。

在初始状态是一穷二白的情况之下，随便进行一点优化，都可能会带来非常之大的业绩提升，确实是不管走什么路，走出去了就是胜利。

实际情况可能更接近后一种。2016年Konga的活跃客户是18.4万，不足尼日利亚人口的1%。

Konga花大力气自己建立起物流配送系统和支付系统，但仍受制于尼日利亚道路基建的落后，以及网速网费的不靠谱，甚至是地方通信地址系统的标准不一……

由此导致的投入越多，亏损越大的恶性循环才是拖垮Konga的主要原因，而SQL或者AI/ML都不会起到决定性的作用。

3 | AI是锤子，而世间万物不都是钉子
----------------------------

在Hacker News对Omin文章设置的评论区中，可以看到相当多的人对他吐槽AI/ML的暗讽语气有意见，争着指出AI的特殊用途，或者作者可能的思维误区。

![](http://ww1.sinaimg.cn/large/4b91f9d5gy1fu3aait7u1j20r60ggtqx.jpg)

（ https://news.ycombinator.com/item?id=17433752 ）

大家认为，这样“取巧”的做法肯定只是适用于从0到1的小本经营，做一个MVP（最小可用产品）来验证商业模式。然而如果从1到100的过程当中，事情肯定就没这么简单了。

一种说法是，跟SQL简单粗暴的运算规则相比，AI的模糊和混沌可以更精致，更细腻，更润物无声，让用户察觉不到。

例如一个可能被中国消费者注意到的问题：如果你已经买过了一台汽车，你再给他推广同类型的汽车，这广告可能是他们最不想看到的。他们想看到的可能是汽车零配件。

再比如优惠券的问题。Omin给那些沉寂了一段时间的客户，推送的都是统一面额的优惠券。那么对于有些人来说，有可能你不用给他们推一个7折的优惠券，而是只推一个95折的优惠券，他们就会回来购买了——所以统一推送等于浪费钱财。

另一种说法涉及用户规模问题。就像任何人都可以根据初步知识和简单编程，搭建一个支持最多5到10个人同时在群里聊天的软件。但是如果你把这个用户量扩大到10亿，那么全世界恐怕只有微信和Facebook才能做到。

只有了解了Konga的背景，我们才能知道SQL确实可以适用于这个仅有数十万注册用户的电商网站。

实际上，这篇文章最大的作用，在于它批判了一种“唯人工智能论”或者说“人工智能万能论”。

航通社在《赌球2018：有了AI又怎样》中认为：

> “任何算法的背后，都是设计者意志的体现。只要AI完成了人们交给它的任务，就算是符合预期。AI可以将以往需要大量人力做的统计，数学运算，概率计算等等工作，浓缩在1秒内完成，这就是它的价值。”

把AI替换成SQL，这种描述其实也是完全适用的。SQL也可以将查询数据库和返回结果的过程缩短在很短时间内。而且用来形容Access，甚至Excel都是可以的。这几种从上到下的“消费降级”自然是可以满足不同层级数据量相应需求的最佳方案。

如果一家大公司已经到了大规模应用AI/ML的程度，但公司因为多年积累，也同时有一些传统的“电风扇吹香皂盒”式土味解决方案（不只是SQL），那么从今后的维护友好度来讲，全面升级或重构旧系统，将一切问题都交给AI处理是理所当然的。

但对于一家在尼日利亚的规模较小的电商公司来说，如果他花大价钱去迁移到AI，那么这等于去拥抱一种该国都没有多少人了解的技术，而高造价和一定的风险，都让切换到新系统的成本大大提升，也就是费力不讨好了。

我们当然有理由假设任何一家采用SQL的公司，都有实力成长为不得不用AI的大型企业。但至少在此之前，AI可能并不适合所有情况。

所以一些布道者们把AI视为一把锤子，然后觉得这个世界上的每一个问题长得都像钉子，这样的思维确实应该调整。

* * *

  

AI虽不算万能，但做的事情还是越来越多：  
- [谷歌助手点餐，微软小娜下单：AI 横行的未来世界里，没有人类什么事](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650659709&idx=1&sn=2d3ff9f4b4d8e3a19fdc361d464cb817&chksm=be96927189e11b672b353382942f1c380128642dbab8292306f64d12e4a3119b9ee62ace1a6d&scene=21#wechat_redirect)  
- [颤抖吧人类！AI 正占领中日播音主持人行业](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650659058&idx=1&sn=d3c2e0f824a31e89f11147ab934d98d6&chksm=be9691fe89e118e87f90cf03a4aa08a1cf71c535bd9bb12bd2f1f1343955e21b182cd36bf3f4&scene=21#wechat_redirect)  
- [Facebook 错把越战老照片当“儿童色情”，AI 编辑笑话百出难担重任](http://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650658636&idx=4&sn=8a3f066df56b11248657836fdc7c872f&scene=21#wechat_redirect)



[微信](https://mp.weixin.qq.com/s?__biz=MjM5Mjg1ODIxMQ==&mid=2650659870&idx=1&sn=20204e0f8f1106bb001e2a5334f328e7)