'use strict'
var requests = []
var responds = []
var http = require('http')
var server = http.createServer(function (req, res) {
  requests.push(req)
  responds.push(res)
  console.log('push req and res')
})
server.listen(9001)