---
abbrlink: ''
categories:
- hexo
date: '2024-03-11T00:52:59+08:00'
tags:
- hexo
title: Hexo使用教程
updated: '2024-09-14T12:52:44.262+08:00'
---
# hexo使用教程

## 1. 发布文章

1.新建文章
&emsp;&emsp;使用如下命令来新建文章：

```shell
hexo new [layout] \<title\> 
```

&ensp;&ensp;&ensp;&ensp;其中layout是文章的布局，默认为post，可以先不写。title 是文章的标题，也是文件的名字，存储在source/_posts下。在编写文章的shi'hshih ，有时候会遇见无法缩进的问题，可以使用如下字符进行缩进：

```markdown
不换行空格: \ 或\ 
半角空格: \ 或\ 
全角空格: \ 或\ 
```

&emsp;&emsp;写好文章后，输入如下命令进行发布：

```shell
hexo g && hexo d #发布
```
