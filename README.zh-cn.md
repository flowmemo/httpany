# httpany
>  [English](https://github.com/flowmemo/httpany/blob/master/README.md)|**中文**  

方便前端学习者使用的静态文件服务器

[![Travis branch](https://img.shields.io/travis/flowmemo/httpany/master.svg?style=flat-square)](https://travis-ci.org/flowmemo/httpany)
[![AppVeyor branch](https://img.shields.io/appveyor/ci/flowmemo/httpany/master.svg?style=flat-square&label=Win%20Test)](https://ci.appveyor.com/project/flowmemo/httpany/branch/master)
[![Coveralls branch](https://img.shields.io/coveralls/flowmemo/httpany/master.svg?style=flat-square)](https://coveralls.io/github/flowmemo/httpany?branch=master)

## 介绍
前端学习者经常需要在电脑上托管静态文件.
有时候一句 `python3 -m http.server` 就足够了, 但是很多情况下你会想让服务器返回特定的http header(例如CORS和Timing-Allow).  

这个工具可以让你通过querystring来控制服务器响应的http header和状态码.

## 示例
```shell
$ npm install httpany -g
$ httpany yourDirectory
# "yourDirectory" is served on http://localhost:3000
# options is: {"root":"/path/to/yourDirectory","index":"index.html"}
```
访问 http://localhost:3000/?foo=bar , http响应的header中会包含 `foo: bar`.  
访问 http://localhost:3000/?status=302&location=//weibo.com/flowmemo , 会返回一个302页面跳转到我的微博.

你也可以在querystring中设置status来控制响应的http状态码.

## 用法
```shell
$ httpany <路径> [参数]
```

### 参数
--port, -p 监听端口，默认是3000  
--help, -h 显示帮助  

下面的参数来自koa-static:  
--maxage Browser cache max-age in milliseconds. defaults to 0  
--hidden Allow transfer of hidden files. defaults to false  
--index Default file name, defaults to 'ipndex.html'  
--defer If true, serves after return next(), allowing any downstream middleware to respond first.  
--gzip Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.  

## 注意
`Access-Control-Allow-Origin` 默认设置为`*`. 你可以把此项设置为`null`来禁用它.

## 许可
MIT © [flowmemo](http://weibo.com/flowmemo)
