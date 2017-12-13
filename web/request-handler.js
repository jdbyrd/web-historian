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
      fs.readFile(archive.paths.list, 'utf8', (err, data) => {
        if (err) { throw err; }
        console.log('data: ', data);
        const dataArray = data.replace( /\n/g, ',' ).split(',');
        console.log('dataArray: ', dataArray);
        // if so, render that url
        const hasFile = dataArray.includes(userInput.toLowerCase());
        if (hasFile) {
          console.log('We have the file: ', userInput);
          fs.readFile((archive.paths.archivedSites + '/' + userInput), (err, data) => {
            console.log('here is the current data from that file: ', data);
            res.writeHead(200, httpHelp.defaultHeaders);
            res.end(data);
            
          });
        } else {
          console.log('We don\'t have the file: ', userInput);
          fs.readFile(path.join(archive.paths.siteAssets, 'loading.html'), (err, data) => {
            res.writeHead(200, httpHelp.defaultHeaders);
            res.end(data);
          });
          fs.appendFile(archive.paths.list, `${userInput},`, (err) => {
            if (err) { throw err; }
            console.log(`${userInput} saved to site.txt!`);
          });
        }
        // if not, render loading.html & add to queue
        
      });
      
    });
    
    
  
  }
  
};
