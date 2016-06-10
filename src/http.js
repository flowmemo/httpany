'use strict'

const anyStatus = (ctx, next) => {
  const status = ctx.params.status
  if (status === 'default') {
    return next()
  }

  ctx.status = parseInt(status)
  return next()
}

const anyHeaders = (ctx, next) => {
  ctx.set(ctx.query)
  if (!ctx.get('Access-Control-Allow-Origin')) {
    ctx.set('Access-Control-Allow-Origin', '*')
  }
  return next()
}

export {anyStatus, anyHeaders}
