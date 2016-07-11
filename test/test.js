'use strict'

import test from 'ava'
import fetch from 'node-fetch'
import http from 'http'
import querystring from 'querystring'
const createApp = require('..').createApp
const app = createApp('./fixtures', {})
const PORT = 3000
app.listen(PORT)
const baseUrl = `http://localhost:${PORT}/`
test('default response', async t => {
  const qs = querystring.stringify({ status: 'default' })
  let p1 = fetch(baseUrl)
  let p2 = fetch(baseUrl + '?' + qs)
  const res1 = await p1
  const res2 = await p2
  t.is(res1.status, 200)
  t.is(res2.status, 200)
  t.is(res1.headers.get('Access-Control-Allow-Origin'), '*')
  t.is(res2.headers.get('Access-Control-Allow-Origin'), '*')
  t.is(res1.headers.get('status'), null)
  t.is(res2.headers.get('status'), null)
})

test('set statusCode 2xx, 4xx, 5xx', async t => {
  const codes = []
  const initial = new Set(['2', '4', '5'])

  for (let code in http.STATUS_CODES) {
    if (initial.has(code[0])) codes.push(code)
  }

  t.plan(codes.length)
  for (let code of codes) {
    const qs = querystring.stringify({ status: code })
    let res = await fetch(baseUrl + '?' + qs)
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
    const qs = querystring.stringify({ status: code, location: '/' + code })

    http.get(baseUrl + '?' + qs + '', res => {
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
  const res = await fetch(baseUrl + '?' + qs)
  t.is(res.headers.get('Custom-Headers'), 'test1')
  t.is(res.headers.get('Test-Headers'), 'test2')
})

test('invalid status code', async t => {
  const qs = querystring.stringify({ status: 999 })
  const res = await fetch(baseUrl + '?' + qs)
  t.is(res.status, 501)
})

test('invalid header', async t => {
  const qs = querystring.stringify({ 'statufd?/=-fs': 'fsasdf/fd]ds\fds1325!@#$%^&*)=?' })
  const res = await fetch(baseUrl + '?' + qs)
  t.is(res.status, 501)
})

test('get index.html', async t => {
  const res = await fetch(baseUrl)
  const text = await res.text()
  t.is(text, 'This is index.html')
})

test('get nowhere.html', async t => {
  const res = await fetch(baseUrl + 'nowhere.html')
  t.is(res.status, 404)
})
