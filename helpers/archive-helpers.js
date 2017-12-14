var fs = require('fs');
var path = require('path');
var _ = require('underscore');
const http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(paths.list, 'utf8', (err, siteList) => {
    const urlList = siteList.split('\n');
    callback(urlList);
    if (err) { throw err; }
  });
};

exports.isUrlInList = function(url, callback) {
  console.log('isUrlInList called!');
  fs.readFile(paths.list, 'utf8', (err, siteList) => {
    const urlList = siteList.split('\n');
    console.log('urlList: ', urlList);
    console.log('url: ', url);
    const hasFile = urlList.includes(url.toLowerCase());
    callback(hasFile);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(paths.list, `${url}\n`, (err) => {
    if (err) { throw err; }
    callback && callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(paths.archivedSites + '/' + url, (exists) => {
    callback(exists);
  });
  
};

exports.clearUrls = function() {
  fs.writeFile(paths.list, '', (err) => {
    if (err) { throw err; }
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach( site => {
    fs.exists(paths.archivedSites + '/' + site, (exists) => {
      if (!exists) {
        console.log(`${site} doesn't exist yet!!!!`);
        http.get('http://' + site, (res) => {
          let rawData = '';
          res.setEncoding('utf8');
          res.on('data', chunk => { rawData += chunk; });
          res.on('end', () => {
            fs.writeFile(paths.archivedSites + '/' + site, rawData, (err) =>{
              if (err) { throw err; }
              console.log('The file ' + site + ' has been saved!');
              // exports.readListOfUrls((currentUrls) => {
              //   if (urls.toString() === currentUrls.toString()) { 
              //   } else {
              //     exports.downloadUrls(currentUrls);
              //   }
              // });
            });
          });
        });
      }
    });
  });
};
