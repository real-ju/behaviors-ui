# 更新流程

说明：/packages/behaviors-ui 为组件库源文件， /docs 为文档源文件，/src 为组件演示网站源文件

- /packages/behaviors-ui 中 npm publish 更新 npm 包
- npm run docs:build，编译文档，输出在/docs/.vitepress/dist
- npm run build，编译组件演示网站，输出在/dist/build/h5
- 切换分支到 docs-web
- 删除除了 /example 文件夹和 .gitignore 其他所有文件
- 把/docs/.vitepress/dist 里面的文件复制到根目录
- 把/dist/build/h5 里面的文件复制到/example 文件夹中
