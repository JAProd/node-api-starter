"use strict";
var path = require('path');
global.rootFolder = path.join(__dirname, "..");

/**
 * require the controller by its name and module.
 * 
 */
global.requireController = function (controllerName) {
    return require(path.join(global.rootFolder, 'app', 'controller', controllerName));
}

/**
 * require the service by its name and module.
 * 
 */
global.requireService = function (serviceName) {
    return require(path.join(global.rootFolder, 'app', 'service', serviceName));
}

/**
 * require the model by its name and module.
 * 
 */
global.requireModel = function (modelName) {
    return require(path.join(global.rootFolder, 'app', 'model', modelName));
}

/**
 * require the config by its name.
 * 
 */
global.requireConfig = function (configName) {
    try {
        return require(path.join(global.rootFolder, 'app', 'config', configName + '.' + process.env.NODE_ENV + '.json'));
    } catch (ex) {
        console.log("No config file found with name " + configName);
        return {};
    }
}

/**
 * require the errors by its type name.
 * 
 */
global.requireErrors = function (errorTypeName) {
    return require(path.join(global.rootFolder, 'app', 'error', errorTypeName));
}
