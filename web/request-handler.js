var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
const fs = require('fs');
// require more modules/folders here!
exports.handleRequest = function (req, res) {
  console.log('serving request on ' + req.method + 'for url ' + req.url);
  
  if (req.method === 'GET') {
    // console.log('current url: ', req.url);
    if (req.url === '/') {
      httpHelp.serveAssets(res, 'index.html', (err, data) => {
        res.writeHead(200, httpHelp.defaultHeaders);
        res.end(data);
      });
    } else {
      httpHelp.serveAssets(res, req.url, (err, data) => {
        if (err) {
          res.writeHead(404, httpHelp.defaultHeaders);
          res.end();
        } else {
          res.writeHead(200, httpHelp.defaultHeaders);
          res.end(data);
        }
      });
    }

  } else if (req.method === 'POST') {
    // check if url exists in sites.txt
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const userInput = body.slice(4);
      console.log('userInput: ', userInput);
      archive.isUrlInList( userInput, (hasFile) => {
        console.log('hasFile: ', hasFile);
        if (hasFile) {
          httpHelp.serveAssets(res, userInput, (err, data) => {
            
            res.writeHead(200, httpHelp.defaultHeaders);
            res.end(data.toString());
          });
        } else {
          httpHelp.serveAssets(res, 'loading.html', (err, data) => {
            console.log('loading server assets: ', data);
            if (err) { throw err; }
            archive.addUrlToList(userInput, () => {
              res.writeHead(302, httpHelp.defaultHeaders);
              res.end(data.toString());
            });
          });
        }
      });
    });
  }
};