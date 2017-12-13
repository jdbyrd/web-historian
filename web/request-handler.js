var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
const fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('serving request on ' + req.method + 'for url ' + req.url);
  
  if (req.method === 'GET') {
    httpHelp.serveAssets(res, 'index.html');

  } else if (req.method === 'POST') {
    // check if url exists in sites.txt
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const userInput = body.slice(4);
      console.log('userInput: ', userInput);
      console.log('sites.txt: ', archive.paths.list);
      fs.readFile(archive.paths.list, 'utf8', (err, data) => {
        if (err) { throw err; }
        console.log('data: ', data);
        // const dataParsed = data.toString();
        // console.log('dataParsed: ', dataParsed);
      });
      
    });
    
    // if so, render that url
    
    // if not, render loading.html & add to queue
    
  
  }
  
};
