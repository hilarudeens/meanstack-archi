'use strict';
var catalogAPI = require('./catalog-api');
var express = require('express');
var router = express.Router();

// GET catalog list
// API /api/catalog/list
router.get('/list', catalogAPI.list);

module.exports = router;


