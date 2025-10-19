---
layout: post
title: "智联招聘基于Apache Pulsar打造企业级事件中心"
date: 2018-10-29
categories: 文章
tags: [科技]
image: https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/01.png
---

Apache Pulsar于2018年9月正式成为Apache顶级项目，ApachePulsar是一个企业级的发布订阅（pub-sub）消息系统，最初由Yahoo开发，并于2016年底开源。Pulsar在Yahoo的生产环境运行了三年多，助力Yahoo的主要应用，如Yahoo Mail、Yahoo Finance、Yahoo Sports、Flickr、Gemini广告平台和Yahoo分布式键值存储系统Sherpa。自孵化之日起，其在开源社区就备受关注，社区的开发者一起合力往Pulsar里面贡献了大量的企业级特性。这些贡献将Pulsar从最初的一个消息系统演化成集消息、存储和函数式轻量化计算的流数据平台。 Apache Pulsar，相对其他传统消息中间件系统，有着根本性的不同。这些不同可以囊括为以下几点：

在消息模型和 API 层面上，Pulsar 基于日志这个存储抽象，统一了消息队列（Queue）和流处理（Streaming）这两种经典的消息中间件应用场景。用户只需要使用一套系统，通过不同的订阅（Subscription）模式，即可支持不同的应用场景，从根本上打通了应用和服务之间的数据孤岛，从而实现真正意义上的数据”中台“。

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/01.png)

图1:Apache Pulsar对订阅模式的抽象

在架构层面上，Pulsar 使用了最前沿的将计算和存储相互分离的思路，将传统的消息中继（Broker）和消息存储（Storage）分开，从而将原有的消息中继（Broker）变成一层无状态化的服务层。将 Broker 变成无状态化之后，Broker 和存储可以相互独立扩展，同时 Broker 的失效恢复可以在极短的时间内完成，从而大大提高了服务的可用性。而且这种分层架构也让 Pulsar 可以很容易部署在 Kubernetes 这样的容器编排环境里面，最高效地使用云原生的基础架构。

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/02.png)

图2:Apache Pulsar分层架构

在存储层面上，Pulsar 使用 Apache Bookkeeper 作为其日志存储系统，将存储粒度从传统的分区粒度，拉低到了分片（Segment）粒度。一旦存储粒度被细分之后，分区不再是物理绑定的了。分区更多的是逻辑层面上的概念，一个分区可以被切分成细粒度的分片，均匀打散到整个集群中；从而极大程度上最大化了数据放置的可能性，也降低了进行集群扩容、故障恢复等操作带来的复杂性。Tiered Storage特性可以将历史数据存储在更廉价的存储设备上(阿里云OSS, AWS S3等)，保证了热数据的性能的前提下大大降低了企业存储历史数据的成本。

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/03.png)

图3:Apache Pulsar 基于Segment的分片存储

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/04.png)

图4:Apache Pulsar Tiered Storage的历史数据搬迁

智联招聘在2018年初就计划打造自己的平台级事件中心，实现事件的统一管理及存储。在这之前智联招聘使用RabbitMQ + Kafka等产品来支撑智联招聘消息系统以流式处理、批处理的支持，RabbitMQ主要支持在线业务的消息投递，Kafka主要应用在流式处理、批处理、日志处理等场景。在应用的过程中我们遇到了一些痛点：

两种产品带来的高维护成本

两套系统数据的一致性问题

数据存储分散且透明度不足

打造平台级的事件中心已经迫在眉睫，在经过大量的技术调研工作之后, Apache Pulsar的分层抽象、存储设计以及多租户、多订阅模式等特性吸引了我们。在经过充分的学习以及和Apache Pulsar团队核心人员沟通之后，最终技术选型也很圆满的告一段落，Apache Pulsar成为了我们打造平台级事件中心的首选。

多租户的特性为平台级事件中心提供了更好的事件管理方案，我们可以利用多租户特性做用户的资源隔离、权限控制等。可以通过维护一套平台级的服务来为智联招聘的全业务线服务，这大大的降低了运维的成本。接入方可以在事件平台申请自己的命名空间，这些都是对用户透明的，用户不用在为维护工作担忧。

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/05.png)

图5:Apache Pulsar 多租户Topic 管理

Queue模式和Streaming模式的统一可以很好的支持在线业务工作队列需求以及流式处理、批处理的需求，事件的发送方只需要生产一份数据就可以供多个业务方、多种工作方式使用，不用在为数据的一致性担忧，显著的降低了系统的开销以及数据的核对工作。

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/06.png)

图6:Apache Pulsar Queue模式与Streaming模式的统一

Retention机制可以很好的匹配事件回溯的需求，我们可以根据不同事件的重要程度或者在时间上的价值来评估Retention的策略，可以同时限制时间以及大小的策略在实际的应用场景也是非常的方便。

![](https://lishuhang.me/img/2018/10/29/zhi-lian-zhao-pin-ji-yu/07.png)

图7:Apache Pulsar 对消息保留以及消息过期的处理机制

Apache Pulsar自带的企业级特性跨机房复制也是可以非常好的为事件中心提供数据容灾能力的保证，我们可以通过这个特性将重要的事件保存在多个机房来提供数据的容灾能力。

TieredStorage特性为事件的冷数据存储提供了很好的支持，我们可以将那些需要长期保存的数据Offload至二级存储，比如阿里云的OSS，AWS S3等产品上。这可以大大降低冷数据的存储成本而不会影响热数据的性能，热数据我们都会使用双SSD来做Bookkeeper的Journal和Leger的存储，更好的保证了事件的写入和读取性能。

在这些特性之上，智联招聘通过对事件定义的严格控制以及配合Pulsar的Shema特性，可以做到在整个平台级的事件中心事件对用户透明性。用户可以在事件中心上查找平台上已经有的事件以及事件是如何定义的，平台也对事件的变更做出了明确的要求。这对数据产品也是非常有意义的。

平台级的事件中心可以为在线业务、流式计算、批处理甚至人工智能方向提供很好的基础能力支持，也是智联招聘2018年平台级的重要项目之一。在2018年8月份项目已经正式落地，逐步已经有业务方开始接入，截止目前事件中心每日提供5亿次事件投递服务，预计11月低接入量提升至20亿日均事件投递量。

智联招聘也在持续的为Apache Pulsar贡献新的特性比如Dead Letter Topic，Client Interceptors等很好的特性也会随着2.2.0版本的发布来服务Pulsar的用户。我们也在计划贡献Delay Messages等更多好的特性为社区服务，同时感谢streamlio在此过程中贡献的支持。