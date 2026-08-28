# ISLAND_Y2K_SPACE — Jekyll 版

原动态博客迁移成的 Jekyll 静态站点。GitHub Pages 原生支持 Jekyll，push 后自动构建，无需本地环境也能部署。

## 目录结构

```
jekyll-site/
├── _config.yml          # 站点配置（标题、描述、baseurl）
├── _layouts/            # 页面布局
│   ├── default.html     # 主布局：头部 + 双侧栏 + 内容 + 底部
│   ├── post.html        # 日记详情页
│   └── page.html        # 独立页（画廊 / 留言板）
├── _includes/           # 可复用片段（头部、侧栏、底部等）
├── _posts/              # 所有日记（Markdown）
│   └── YYYY-MM-DD-标题.md
├── assets/              # 静态资源
│   ├── css/style.css
│   ├── js/              # music.js / bubbles.js
│   ├── images/          # 图片
│   ├── audio/           # 背景音乐
│   ├── font/            # 像素字体
│   └── gallery-images/  # 画廊图片
├── index.html           # 首页（自动列出最新日记）
├── diary.html           # 日记列表页
├── gallery.html         # 画廊
└── guestbook.html       # 留言板（Giscus）
```

## 如何写一篇新日记

1. 在 `_posts/` 新建文件，文件名必须带日期：
   `_posts/2026-08-28-my-new-diary.md`
2. 内容头部写 YAML front matter（标题 + 日期）：

```markdown
---
title: "我的新日记"
date: 2026-08-28
layout: post
---

正文用 Markdown 写，可以放图片、列表、引用等。
```

3. 推送到 GitHub，Pages 自动生成页面和列表。

## 如何添加画廊图片

把图片丢进 `assets/gallery-images/`，push 后画廊页会自动列出（无需改代码）。

## 本地预览（可选）

本机需要 Ruby，然后：

```bash
cd jekyll-site
gem install bundler
bundle install
bundle exec jekyll serve
```

浏览器打开 `http://localhost:4000`。

## 部署

推到 GitHub 的 `master` 分支（用户页）即可。若以后部署到子路径（如 `username.github.io/blog`），在 `_config.yml` 改：

```yaml
baseurl: "/blog"
```

## 留言板

留言板用 [Giscus](https://giscus.app/zh-CN) 集成 GitHub Discussions。评论按页面 URL 归档，所有留言集中在 `guestbook.html` 一个讨论线程。
