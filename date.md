---
title: 日期查询
layout: page
permalink: /date/
---

{% comment %} 提取所有年份并去重，按降序排列 {% endcomment %}
{% assign years = "" | split: "," %}
{% for post in site.posts %}
  {% assign filename = post.path | split: '/' | last %}
  {% assign year = filename | split: '-' | first %}
  {% unless years contains year %}
    {% assign years = years | push: year %}
  {% endunless %}
{% endfor %}
{% assign years = years | sort | reverse %}

{% comment %} 遍历每个年份 {% endcomment %}
{% for year in years %}
  <h2>{{ year }}</h2>
  <ul>
  {% comment %} 收集该年份的所有文章 {% endcomment %}
  {% assign yearly_posts = "" | split: "," %}
  {% for post in site.posts %}
    {% assign post_filename = post.path | split: '/' | last %}
    {% assign post_year = post_filename | split: '-' | first %}
    {% if post_year == year %}
      {% assign yearly_posts = yearly_posts | push: post %}
    {% endif %}
  {% endfor %}
  
  {% comment %} 按文件名中的日期降序排列 {% endcomment %}
  {% assign sorted_posts = yearly_posts | sort: "date" | reverse %}
  {% for post in sorted_posts %}
    {% assign post_filename = post.path | split: '/' | last %}
    {% assign date_str = post_filename | split: '-' | slice: 0,3 | join: "-" %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="post-date">（{{ date_str }}）</span>
    </li>
  {% endfor %}
  </ul>
{% endfor %}