'use strict'

import test from 'ava'
import fetch from 'node-fetch'
import http from 'http'
const app = require('../lib/app').default

const PORT = 3000
// app.listen(PORT)
const url = `http://localhost:${PORT}/any`
test('default response', async t => {
  const res = await fetch(url + '/default')
  t.is(res.status, 200)
  t.is(res.headers.get('Access-Control-Allow-Origin'), '*')
})

test('set statusCode 2xx, 4xx, 5xx', async t => {
  const codes = []
  const initial = new Set(['2', '4', '5'])

  for (let code in http.STATUS_CODES) {
    if (initial.has(code[0])) codes.push(code)
  }

  t.plan(codes.length)
  for (let code of codes) {
    let res = await fetch(url + `/${code}`)
    t.is(res.status, +code)
  }
})

test('set statusCode 1xx, 3xx', async t => {

})

