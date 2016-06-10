'use strict'

import test from 'ava'
import fetch from 'node-fetch'
import http from 'http'
import querystring from 'querystring'
require('../lib/app')

const PORT = 3000
// app.listen(PORT)
const baseUrl = `http://localhost:${PORT}/any`
test('default response', async t => {
  const res = await fetch(baseUrl + '/default')
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
    let res = await fetch(baseUrl + `/${code}`)
    t.is(res.status, +code)
  }
})

test.cb('set statusCode 3xx', t => {
  const codes = []
  const initial = new Set(['3'])

  for (let code in http.STATUS_CODES) {
    if (initial.has(code[0])) codes.push(code)
  }

  t.plan(codes.length)
  let count = 0
  for (let code of codes) {
    http.get(baseUrl + `/${code}`, (res) => {
      t.is(res.statusCode, +code)
      count++
      if (count === codes.length) {
        t.end()
      }
    })
  }
})

test('set custom headers', async t => {
  const headers = {
    'Custom-Headers': 'test1',
    'Test-Headers': 'test2'
  }
  const qs = querystring.stringify(headers)
  const res = await fetch(baseUrl + '/default?' + qs)
  t.is(res.headers.get('Custom-Headers'), 'test1')
  t.is(res.headers.get('Test-Headers'), 'test2')
})
