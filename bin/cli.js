#!/usr/bin/env node
'use strict'
const chalk = require('chalk')
const createApp = require('..')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const info = `
  Usage:
    $ httpany <root path> [options]

  Options:
    --help, -h    Show help
    --port, -p    Listening port, default is 3000

    The following options are from koa-static:
    --maxage      Browser cache max-age in milliseconds. defaults to 0
    --hidden      Allow transfer of hidden files. defaults to false
    --index       Default file name, defaults to 'index.html'
    --defer       If true, serves after return next(), allowing any downstream middleware to respond first.
    --gzip        Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. (defaults to true)
    --extensions  Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
  
  Examples:
    $ httpany webfolder --maxage 60000 --index default.html --gzip=false
`
if (argv._.length === 0 || argv.help || argv.h) return console.log(info)
if (argv._.length > 1) throw new Error('you can only serve one root directory!')

const rootPath = argv._[0]
const port = argv.port || argv.p || 3000
const app = createApp(rootPath, argv)
app.listen(port)
console.log(chalk.green(`"${argv.root}" is served on http://localhost:${port}`))
