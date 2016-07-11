'use strict'
import Koa from 'koa'
import * as httpAny from 'koa-httpany'
import koaStatic from 'koa-static'
function createApp (root, opts) {
  const app = new Koa()
  app
    .use(httpAny.anyHeader)
    .use(httpAny.anyStatus)
    .use(koaStatic(root, opts))
    .use((ctx, next) => {
      // do not change original status
      // "If response.status has not been set, Koa will automatically set the status to 200 or 204."
      const originStatus = ctx.status
      ctx.body = JSON.stringify(ctx, null, 2)
      ctx.body += '\n'
      ctx.status = originStatus
      return next()
    })

  return app
}
export { createApp }
