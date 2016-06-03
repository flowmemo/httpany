'use strict'
// import route from 'koa-route'
// import qs from 'http'

const anyStatus = (ctx, next) => {
  console.log('anystatus')
  console.log(ctx.params)

  var status = ctx.params.status
  console.log(status === 'default')

  if (status === 'default') {
    console.log('defualt status')
    return next()
  }

  ctx.status = parseInt(status)
  console.log(next)
  return next()
}

const anyHeaders = (ctx, next) => {
  console.log(ctx.params)
  ctx.set(ctx.query)
  if (!ctx.get('Access-Control-Allow-Origin')) {
    ctx.set('Access-Control-Allow-Origin', '*')
  }
  console.log(next)
  return next()
}

const log = () => {
  // console.log('========-==========')
}
export {anyStatus, anyHeaders, log}
