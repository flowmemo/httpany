'use strict'
import route from 'koa-route'
import qs from 'http'


const anyStatus = route.get('/any/:status', (ctx, status, next) => {
  console.log(status)
  ctx.status = parseInt(status)
  return next()
})


const anyHeaders = async (ctx, next) => {
  ctx.set(ctx.query)
  if (!ctx.get('Access-Control-Allow-Origin')) {
    ctx.set('Access-Control-Allow-Origin', '*')
  }
  return next()
}


const log = () => {
  console.log('==================')
}
export {anyStatus, anyHeaders, log}
