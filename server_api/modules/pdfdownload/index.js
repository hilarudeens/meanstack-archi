'use strict';
var pdfdownloadAPI = require('./pdfdownload-api');
var pdfdownloadRoutes = require('./pdfdownload-routes');
module.exports = {
    api: pdfdownloadAPI,
    routes: pdfdownloadRoutes
};