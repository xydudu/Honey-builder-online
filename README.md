Honey-builder-online [![Build Status](https://secure.travis-ci.org/xydudu/Honey-builder-online.png?branch=master)](https://travis-ci.org/xydudu/Honey-builder-online)
====================

Honey builder online system, only work with Honey


### TODO

- [ ✓ ] 测试框架准备

- [ ✓ ] 读项目文件夹，取得文件列表
- [ ✓ ] 分析文件
    
    - [ ✓ ] 取配置（path and project name）
    - [ ✓ ] 取到模块名数组
    - [ ✓ ] 取到模块所在URL数组
    - [ ✓ ] 页面中存在多个 honey.go 的情况，如何处理

- [ ✓ ] 合并相应模块
    
    - [ ✓ ] 取得模块源码
    - [  ] 404 情况
    - [ ✓ ] 压缩模块源码

- [ ✓ ] 替换页面相应代码
    - [ ✓ ] 只存在一个honey.go
    - [ ✓ ] 页面中存在多个 honey.go 的情况
    - [  ] 已parsed的情况，重复parsed问题

- [  ] 识别已合并页
- [  ] 还原已合并页

- [  ] 融合各步骤，实现合并命令 honey('a.php')

- [ ] 更新文件，上线



---

> 为什么不本地打包呢，唉。。。
