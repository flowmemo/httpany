'use strict'
import Koa from 'koa'
import {anyStatus, anyHeaders} from './http'
import Router from 'koa-router'
const app = new Koa()

const router = new Router({
  prefix: '/any'
})
router.get('/:status', anyHeaders)
router.get('/:status', anyStatus)

app
  .use(router.routes())
  .use(router.allowedMethods())

app
  .use(async (ctx, next) => {
    ctx.body = JSON.stringify(ctx, null, 2)
    ctx.body += '\n\n'
    return next()
  })
app.listen(3000)
console.log('listen on port 3000')
console.log('serve on http://localhost:3000')

export default app
