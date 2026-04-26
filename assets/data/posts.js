---
layout: null
permalink: /assets/data/posts.js
---
window.__POSTS__=[];window.__TI__={};window.__YI__={};
{% assign idx = 0 %}
{% for post in site.posts %}
{% unless post.tags contains 'AIGC' %}
window.__POSTS__.push({u:{{post.url|relative_url|jsonify}},t:{{post.title|jsonify}},d:{{post.date|date:'%Y-%m-%d'|jsonify}},y:{{post.date|date:'%Y'|jsonify}},m:{{post.date|date:'%m'|jsonify}},g:{{post.tags|join:','|jsonify}},e:{{post.excerpt|strip_html|normalize_whitespace|truncatewords:30|jsonify}},i:{%if post.image%}{{post.image|absolute_url|jsonify}}{%else%}null{%endif%}});
{% for t in post.tags %}(window.__TI__['{{ t }}']||(window.__TI__['{{ t }}']=[])).push({{ idx }});{% endfor %}
(window.__YI__['{{ post.date | date: "%Y" }}']||(window.__YI__['{{ post.date | date: "%Y" }}']=[])).push({{ idx }});
{% assign idx = idx | plus: 1 %}
{% endunless %}
{% endfor %}
