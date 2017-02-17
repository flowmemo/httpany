# httpany
> **English**|[中文](https://github.com/flowmemo/httpany/blob/master/README.zh-cn.md)  

A static file server for front-end learner.

[![Travis branch](https://img.shields.io/travis/flowmemo/httpany/master.svg?style=flat-square)](https://travis-ci.org/flowmemo/httpany)
[![AppVeyor branch](https://img.shields.io/appveyor/ci/flowmemo/httpany/master.svg?style=flat-square&label=Win%20Test)](https://ci.appveyor.com/project/flowmemo/httpany/branch/master)
[![Coveralls branch](https://img.shields.io/coveralls/flowmemo/httpany/master.svg?style=flat-square)](https://coveralls.io/github/flowmemo/httpany?branch=master)

## Description
Front-end learners often need to serve static files on their computer.
Sometimes `python3 -m http.server` is enough, but there are many situations where you may want the static server response a specific header(e.g. CORS and Timing-Allow headers).  

This tool can make it easy to control http headers and status code by using query string.

## Example
```shell
$ npm install httpany -g
$ httpany yourDirectory
# "yourDirectory" is served on http://localhost:3000
#  options is: {"root":"/path/to/yourDirectory","index":"index.html"}
```
Access http://localhost:3000/?foo=bar then the response header will contain `foo: bar`.  
Access http://localhost:3000/?status=302&location=https://github.com/flowmemo then your browser will be redirected to my GitHub profile.

Note that you can also set status code by `status` key.

## Usage
```shell
$ httpany <root path> [options]
```
### Options
```
--help, -h    Show help
--port, -p    Listening port, default is 3000

The following options are from koa-static:
--maxage      Browser cache max-age in milliseconds. defaults to 0
--hidden      Allow transfer of hidden files. defaults to false
--index       Default file name, defaults to 'index.html'
--defer       If true, serves after return next(), allowing any downstream middleware to respond first.
--gzip        Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. (defaults to true)
--extensions  Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
```

## Note
`Access-Control-Allow-Origin` is set to `*` by default. You can disable it by setting this field to `null`.

## License
MIT © [flowmemo](http://weibo.com/flowmemo)
