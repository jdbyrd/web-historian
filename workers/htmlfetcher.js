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
    // console.log('nonsplice siteArray: ', data.split(','));
    const siteArray = data.split(',');
    console.log('siteArray: ', siteArray);
    siteArray.forEach( site => {
      fs.exists(archive.paths.archivedSites + '/' + site, (exists) => {
        if (!exists) {
          console.log(`${site} doesn't exist yet!!!!`);
          http.get('http://' + data, (res) => {
            let rawData = '';
            res.setEncoding('utf8');
            res.on('data', chunk => { rawData += chunk; });
            res.on('end', () => {
              console.log('rawData: ', rawData);
              fs.writeFile(archive.paths.archivedSites + '/' + data.slice(0, -1), rawData, (err) =>{
                if (err) { throw err; }
                console.log('The file ' + data + ' has been saved!');
              });
            });
          });
        }
      });
    });
    if (err) { throw err; }
  });
};


