"use strict";
// check environment ===========================================================
if (process.env.NODE_ENV === undefined)
    process.env.NODE_ENV = "development";
console.log("Starting app in " + process.env.NODE_ENV + ' mode.');

// require wrapper =============================================================
require('./core/require-wrapper');

// database set up =============================================================
let mongoose = require('mongoose');
let mongoConfig = requireConfig('mongo');
mongoose.connect(mongoConfig.url);
mongoose.Promise = require('bluebird');

// init all mongoose models ====================================================
const fs = require('fs');
let models_path = __dirname + '/app/model'
fs.readdirSync(models_path).forEach(function (file) {
    requireModel(file)
})

// server set up ===============================================================
let appFilters = null;
try {
    appFilters = require("./app/filter/setup");
} catch (e) {
    console.log("No app filter setup found");
}
let restify = require('restify');
let serverConfig = requireConfig("server");
let server = restify.createServer();
//app preAuth filters
if (appFilters) {
    appFilters.preAuthenticationFilters.forEach(function (filter) {
        server.use(filter);
    })
}
let authenticationMiddleware = require("./core/authentication");
server.use(authenticationMiddleware);
//app postAuth filters
if (appFilters) {
    appFilters.postAuthenticationFilters.forEach(function (filter) {
        server.use(filter);
    })
}
server.on('ResourceDoesNotExist', function (req, res, err, cb) {
    console.log("le sexe en barre");
    return cb();
});


// routes ======================================================================
require('./app/routes')(server);

// listen ======================================================================
server.listen(serverConfig.port || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});