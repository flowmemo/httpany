'use strict'
import Koa from 'koa'
import {anyStatus, anyHeaders, log} from './querystring'
const app = new Koa()

log()
app.use(anyStatus)

app.use(anyHeaders)
app.use(async (ctx, next) => {
  console.log('/////////////////////')
  ctx.body = 'Hello Koa'
  return next()
})


app.listen(3000)
