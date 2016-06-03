
const request = require('supertest')
// const Koa = require('koa')
// const app = new Koa()
const app = require('../lib/app').default

/*
request(app.callback())
  .get('/')
  .expect(404)
  .end(function (err, res) {
    if (err) throw err;
  })
*/
request(app.callback())
  .get('/')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err
  })

