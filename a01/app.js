const http = require('http');

const routes = require('./routes')

const port = 5000;
console.log(`Server will listen on port: ${port}`)
http.createServer(routes).listen(port);