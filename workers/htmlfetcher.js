// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// check sites.txt for urls
// check that all of above are in /sites
// if not, then go fetch html for missing urls and add to /sites
const fs = require('fs');
const http = require('http');
var archive = require('../helpers/archive-helpers');

module.exports = () => {
  
  fs.readFile(archive.paths.list, 'utf8', (err, data) => {
    
    // array of sites.txt entries
    const siteArray = data.replace( /\n/g, ',' ).split(',');
    
    siteArray.forEach( site => {
      fs.exists(archive.paths.archivedSites + '/' + site, (exists) => {
        if (!exists) {
          console.log(`${site} doesn't exist yet`);
          http.get('http://' + data, (res) => {
            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', chunk => { rawData += chunk; });
            res.on('end', () => {
              console.log('rawData: ', rawData );
              fs.writeFile(archive.paths.archivedSites + '/' + data, rawData, (err) =>{
                if (err) { throw err; }
                console.log('The file ' + data + ' has been saved!');
              });
            });
          });
        }
      });
    });
    const hasFile = dataArray.includes(userInput.toLowerCase());
    
    if (err) { throw err; }
  });
};


