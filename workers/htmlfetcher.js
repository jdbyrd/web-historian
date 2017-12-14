// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
// check sites.txt for urls
// check that all of above are in /sites
// if not, then go fetch html for missing urls and add to /sites
const fs = require('fs');
const http = require('http');
var archive = require('../helpers/archive-helpers');

module.exports = function() {
  
  archive.readListOfUrls((urlList) => {
    archive.downloadUrls(urlList);
    archive.clearUrls();
  });
  
  
  // fs.readFile(paths.list, 'utf8', (err, siteList) => {
  //   const siteArray = siteList.split('\n');
  //   console.log('siteArray: ', siteArray);

  //   if (err) { throw err; }
  // });
};


