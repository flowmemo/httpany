'use strict'

function anyStatus (ctx, next) {
  const status = ctx.params.status
  if (status === 'default') {
    return next()
  }
  try {
    ctx.status = parseInt(status)
  } catch (err) {
    console.log(err)
    ctx.status = 501
  }
  return next()
}

function anyHeaders (ctx, next) {
  try {
    ctx.set(ctx.query)
  } catch (err) {
    console.log(err)
    ctx.status = 501
  }
  if (!ctx.get('Access-Control-Allow-Origin')) {
    ctx.set('Access-Control-Allow-Origin', '*')
  }
  return next()
}

export {anyStatus, anyHeaders}
