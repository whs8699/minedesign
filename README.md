## minedesign component library

一直很想自己写个组件库（奈何太菜），最终在不断查阅文档、阅读Ant Design源码（虽然看不懂，hhh）后，
总算是磕磕绊绊写出了一点，当然跟antd差距还是特别特别大的！希望通过以后的学习不断完善它！


### 安装最后已经发布的组件库来试试

~~~javascript
npm install minedesign --save
~~~

### 使用

~~~javascript
// 加载样式
import 'minedesign/dist/index.css'
// 引入组件
import { Button } from 'minedesign'
~~~

### 项目描述

* typescript with React Hooks
* 使用 react-testing-library 完成单元测试
* 使用 storybook 本地调试和生成文档页面
* 使用 react-doc-gen 自动生成文档
* 使用第三方库扩充组件 (react-fontawesome, react-transition-group)
* 支持 tree-shaking 并通过 sideEffects 实现按需加载

### 一些本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~