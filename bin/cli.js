#!/usr/bin/env node
'use strict'
const meow = require('meow')
const chalk = require('chalk')
const createApp = require('..')

const cli = meow(`
    Usage
      $ httpany <root path> 
    
    Options
      --port, -p Listening port, default is 3000

      The following options are from koa-static
      --maxage Browser cache max-age in milliseconds. defaults to 0
      --hidden Allow transfer of hidden files. defaults to false
      --index Default file name, defaults to 'ipndex.html'
      --defer If true, serves after return next(), allowing any downstream middleware to respond first.
      --gzip Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.

    Examples
      $ httpany webfolder --maxage 60000 --index index.html --gzip=false
`)
if (cli.input.length === 0) cli.showHelp()
if (cli.input.length > 1) throw Error('you can only serve one root directory!')
const rootPath = cli.input[0]
const port = cli.flags.port || cli.flags.p || 3000
const app = createApp(rootPath, cli.flags)
app.listen(port)
console.log(chalk.green(`"${rootPath}" is served on http://localhost:${port}`))
console.log(`options is: ${JSON.stringify(cli.flags)}`)
