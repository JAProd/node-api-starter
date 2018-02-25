"use strict";
// check environment ===========================================================
if (process.env.NODE_ENV === undefined)
    process.env.NODE_ENV = "development";
console.log("Starting app in " + process.env.NODE_ENV + ' mode.');

// require wrapper =============================================================
require('./core/require-wrapper');

// database set up =============================================================
var mongoose = require('mongoose');
var mongoConfig = requireConfig('mongo');
mongoose.connect(mongoConfig.url);
mongoose.Promise = require('bluebird');

// server set up ===============================================================
var restify = require('restify');
var serverConfig = requireConfig("server");
var server = restify.createServer();
var authenticationMiddleware = require("./core/authentication");
server.use(authenticationMiddleware);

// routes ======================================================================
require('./app/routes')(server);

// listen ======================================================================
server.listen(serverConfig.port || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});