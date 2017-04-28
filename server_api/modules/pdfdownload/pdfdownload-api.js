'use strict';
var fs = require('fs');
var ejs = require('ejs');
var tmp = require('tmp');
var async = require('async');
var wkhtmltopdf = require('wkhtmltopdf');
var templateMap = require('./template-map');
var catalogModel = require('./../catalog').model;

var API = module.exports = {};
/**
 * Function to download catalog as pdf on the fly
 * 
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
API.downloadNow = function (req, res, next) {
    // STEP 1: Get data from database.
    // STEP 2: Generate HTML with content
    // STEP 3: Create temporary file and write HTML into temporary file
    // STEP 4: Create PDF file and stream it

    var catalogListData, html, htmlFilePath, pdfFilePath;
    var params = req.query;
    // STEP 1: Get data from database.
    var getData = function (cb) {
        var type = Object.prototype.toString.call(params.id);
        var filter = type === '[object Array]' ? {_id: {$in: params.id}} : {_id: params.id};
        var query = catalogModel.find(filter);
        query.lean().exec(function (err, data) {
            if (err) {
                return cb(err);
            }
            catalogListData = data;
            return cb(null);
        });
    };
    // STEP 2: Generate HTML with content
    var getHtml = function (cb) {
        console.log(templateMap['CATALOG_DOWLOAD']);
        fs.readFile(templateMap['CATALOG_DOWLOAD'], 'utf8', function (err, fileStr) {
            if (err) {
                return cb(err);
            }
            html = ejs.render(fileStr, {data: catalogListData});
            return cb(null);
        });
    };
    // STEP 3: Create temporary file and write HTML into temporary file.
    var setTempHtmlFile = function (cb) {
        tmp.file(function _tempFileCreated(err, path, fd, cleanupCallback) {
            if (err) {
                return cb(err);
            }
            fs.writeFile(fd, html, function (err) {
                if (err) {
                    return cb(err);
                }
                htmlFilePath = path;
                return cb(null);
            });
            //// console.log('File: ', path);
            // console.log('Filedescriptor: ', fd);
            // If we don't need the file anymore we could manually call the cleanupCallback
            // But that is not necessary if we didn't pass the keep option because the library
            // will clean after itself.
            // cleanupCallback();
        });
    };
    // STEP 4: Create PDF file and stream it
    var streamPdf = function (cb) {
        res.set({
            'Content-Disposition': 'attachment; filename=research-paper-titles.pdf',
            'Content-Type': 'application/octet-stream',
            'Content-Description': 'File Transfer',
            'Content-Transfer-Encoding': 'Binary'
        });
        wkhtmltopdf(fs.createReadStream(htmlFilePath)).pipe(res);
        cb();
    };
    async.series([getData, getHtml, setTempHtmlFile, streamPdf], function (err) {
        if (err) {
            return next(err);
        }
    });
};