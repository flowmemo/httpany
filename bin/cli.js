#!/usr/bin/env node
'use strict'
const chalk = require('chalk')
const createApp = require('..')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const info = `
  Usage
    $ httpany <root path> [options]

  Options
    --port, -p Listening port, default is 3000
    --help, -h Show help

    The following options are from koa-static:
    --maxage Browser cache max-age in milliseconds. defaults to 0
    --hidden Allow transfer of hidden files. defaults to false
    --index Default file name, defaults to 'ipndex.html'
    --defer If true, serves after return next(), allowing any downstream middleware to respond first.
    --gzip Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.

  Examples
    $ httpany webfolder --maxage 60000 --index index.html --gzip=false
`
if (argv._.length === 0 || argv.help || argv.h) return console.log(info)
if (argv._.length > 1) throw Error('you can only serve one root directory!')
const rootPath = argv._[0]
const port = argv.port || argv.p || 3000
const app = createApp(rootPath, argv)
app.listen(port)
console.log(chalk.green(`"${argv.root}" is served on http://localhost:${port}`))
console.log(`options is: ${JSON.stringify(argv)}`)
