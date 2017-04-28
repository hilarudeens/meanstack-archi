'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt-nodejs');
// Catalog Collection Schema for BOOKCLUB
var CatalogSchema = new Schema({
    title: {type: String},
    author: Array,
    year: {type: String},
    description: {type: String}
});
var Catalog = module.exports = mongoose.model('Catalog', CatalogSchema);