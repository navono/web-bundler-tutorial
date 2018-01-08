# Webpack-survive-tutorial

Content from [survivijs](https://survivejs.com/webpack/introduction/)


## `Webpack`是什么？
`Webpack`是个模块打包器（module bundler）。

## `Webpack`是如何做到的？
在底层，`Webpack`通过遍历源代码，使用源代码中的模块关系，构造出了一个`有向依赖图`（`dependency graph`）。然后使用这个依赖图和其他配置信息产生bundle文件。

配置信息包括：
- loaders
  作用在模块层
- plugins
  依赖于`Webpack`提供的钩子（hook）
- 配置
  描述如何将依赖图的assets进行转换，以及如何产生输出
- HMR


## Developing
安装：
```js
yarn add webpack -D
```

简单的运行`Webpack`，比如：
```js
node_modules/.bin/webpack app/index.js build/index.js
```

或者在`package.json`中添加脚本：
```js
script: {
  "build": "webpack app/index.js build/index.js"
}
```
因为`npm run`会自动添加`node_modules/.bin/`路径到环境变量中，所以可以直接使用`webpack`命令行工具。

同时可以使用`webpack.config.js`来配置`webpack`的运行参数。主要有四点：
- entry
- ouput
- rules
- plugin

`webpack`可以使用`--config`来指定配置文件的路径。如果不指定，则默认与`package.json`同层。

---
在开发工程中，自动化是个非常重要的特性。`Webpack`可以通过`Watch`模式或者`webpack-dev-server`来实现。
```js
webpack --watch
```
可以监控文件的状态，如果文件发生了变更，那么`Webpack`会自动重新打包。

`webpack-dev-server`实现了`Watch`的功能，同时还实现了一些更酷的特性。`webpack-dev-server`是一个开发服务器，运行的所有文件都存在内存中。它配合`webpack`的`HMR`可以实现浏览器的自动刷新。如果是使用`React`，那么配合`react-hot-loader`可以实现组件的热替换，同时组态的状态保持不变。
具体的可以参考`webpack-dev-server`目录中的例子。


`webpack-dev-server`在我们每次修改源文件时，可以自动打包然后更新到内存的服务器中。但是对于配置文件`webpack.config.js`的修改，每次都要在命令行中重启`webpack-dev-server`。可以通过`nodemon`来解决。
首先安装：
```js
yarn add nodemon -D
```
在`package.json`中的脚本中加入：
```js
"scripts": {
  "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server\"",
  "build": "webpack"
},
```

`webpack-dev-server`的其他`options`可以参考[DevServer](https://webpack.js.org/configuration/dev-server/)



## Styling

## Loading

## Building

## Optimizing

## Output

## Techniques

## Extending