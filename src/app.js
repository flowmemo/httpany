'use strict'
import Koa from 'koa'
import {anyStatus, anyHeaders, log} from './http'
import Router from 'koa-router'
var app = new Koa()

var router = new Router({
  prefix: '/any'
})
router.get('/:status', anyHeaders)
router.get('/:status', anyStatus)

log()
app
  .use(router.routes())
  .use(router.allowedMethods())

app
  .use(async (ctx, next) => {
    console.log('/////////////////////')
    ctx.body = JSON.stringify(ctx.request, null, 2)
    return next()
  })

app.listen(3000)

export default app
