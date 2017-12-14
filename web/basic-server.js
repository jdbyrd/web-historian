var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var htmlFetcher = require('../workers/htmlFetcher');
var cron = require('node-cron');
 


// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

//setInterval(htmlFetcher, 1000);
cron.schedule('30 * * * * *', function() {
  htmlFetcher();
});

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

