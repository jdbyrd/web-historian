var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {

  let basePath = '';
  
  if (asset === 'index.html' || asset === 'loading.html') {
    basePath = archive.paths.siteAssets;
  } else {
    basePath = archive.paths.archivedSites;
  }

  let assetPath = path.join(basePath, asset);

  fs.readFile(assetPath, (err, data) => {
    callback(err, data);
  });
  
};


