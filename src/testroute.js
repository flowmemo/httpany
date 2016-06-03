var Koa = require('koa')
var app = new Koa()
var Router = require('koa-router')
var router = new Router({
  prefix: '/any'
})

router.get('/', function (ctx, next) {
  ctx.body = 'hello worls'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
