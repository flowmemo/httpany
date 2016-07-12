'use strict'
const koa = require('koa')
const httpAny = require('koa-httpany')
const koaStatic = require('koa-static')
function createApp (root, opts) {
  const app = koa()
  app
    .use(httpAny.anyHeader)
    .use(httpAny.anyStatus)
    .use(koaStatic(root, opts))
    .use(function * (next) {
      // do not change original status
      // "If response.status has not been set, Koa will automatically set the status to 200 or 204."
      let ctx = this
      const originStatus = ctx.status
      ctx.body = JSON.stringify(ctx, null, 2)
      ctx.body += '\n'
      ctx.status = originStatus
      return yield next
    })

  return app
}
module.exports = createApp
