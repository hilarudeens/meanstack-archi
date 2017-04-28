'use strict';
var catalogModel = require('./catalog-model');
var catalogAPI = require('./catalog-api');
var catalogRoutes = require('./catalog-routes');
module.exports = {
    model: catalogModel,
    api: catalogAPI,
    routes: catalogRoutes
};