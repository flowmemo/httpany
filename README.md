# httpany
A static file server for front-end learner.

[![Travis branch](https://img.shields.io/travis/flowmemo/httpany/master.svg?style=flat-square)](https://travis-ci.org/flowmemo/httpany)
[![AppVeyor branch](https://img.shields.io/appveyor/ci/flowmemo/httpany/master.svg?style=flat-square&label=Win%20Test)](https://ci.appveyor.com/project/flowmemo/httpany)
[![Coveralls branch](https://img.shields.io/coveralls/flowmemo/httpany/master.svg?style=flat-square)](https://coveralls.io/github/flowmemo/httpany?branch=master)

## Usage
```shell
$ npm install httpany -g
$ httpany yourDirectory
"yourDirectory" is served on http://localhost:3000
options is: {"root":"/path/to/yourDirectory","index":"index.html"}
```
Access http://localhost:3000/?foo=bar then the response header will contain `foo: bar`. 

Note that you can also set status code by `status` key.

## Description
Front-end learners often need to server static files on their computer.
Sometimes `python3 -m http.server` is enough, but there are many situations where you may want the static server response a specific header(e.g CORS and Timing-Allow headers). This tool can make it easy by control http headers and status code using query string.

## License
MIT © [flowmemo](http://weibo.com/flowmemo)
