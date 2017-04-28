'use strict';
var pdfdownloadAPI = require('./pdfdownload-api');
var express = require('express');
var router = express.Router();
// GET download file.
// API /api/catalog/download-now
router.get('/download-now', pdfdownloadAPI.downloadNow);
module.exports = router;