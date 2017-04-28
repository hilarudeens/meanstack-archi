'use strict';
var CatalogModel = require('./catalog-model');
var API = module.exports = {};
/**
 * Function to list the catalog items
 * 
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
API.list = function (req, res, next) {
    var query = CatalogModel.find();
    // selecting the `name` and `occupation` fields
    // query.select('name occupation');
    // execute the query at a later time
    query.exec(function (err, catalogs) {
        if (err) {
            return next(err);
        }
        res.send({
            status: 'SUCCESS',
            data: catalogs
        });
    });
};