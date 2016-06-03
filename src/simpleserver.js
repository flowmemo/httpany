const http = require('http');

// Create an HTTP server
var srv = http.createServer( (req, res) => {
  res.writeHead(345, {'Content-Type': 'text/plain'});
  res.end('okay');
});

srv.listen(3000)