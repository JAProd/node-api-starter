"use strict";
var path = require('path');
global.rootFolder = path.join(__dirname, "..");

/**
 * require the controller by its name and module. If the package is not defined, it will get the controller from the base app.
 * 
 */
global.requireController = function (controllerName, moduleName) {
    if (moduleName === undefined) {
        return require(path.join(global.rootFolder, 'app', 'controllers', controllerName));
    } else {
        return require(path.join(global.rootFolder, 'modules', moduleName, 'controllers', controllerName));
    }
}

/**
 * require the service by its name and module. If the package is not defined, it will get the service from the base app.
 * 
 */
global.requireService = function (serviceName, moduleName) {
    if (moduleName === undefined) {
        return require(path.join(global.rootFolder, 'app', 'services', serviceName));
    } else {
        return require(path.join(global.rootFolder, 'modules', moduleName, 'services', serviceName));
    }
}

/**
 * require the model by its name and module. If the package is not defined, it will get the model from the base app.
 * 
 */
global.requireModel = function (modelName, moduleName) {
    if (moduleName === undefined) {
        return require(path.join(global.rootFolder, 'app', 'models', modelName));
    } else {
        return require(path.join(global.rootFolder, 'modules', moduleName, 'models', modelName));
    }
}

/**
 * require the config by its name. If the package is not defined, it will get the config from the base app.
 * 
 */
global.requireConfig = function (configName, moduleName) {
    try {
        if (moduleName === undefined) {
            return require(path.join(global.rootFolder, 'app', 'config', configName + '.' + process.env.NODE_ENV + '.json'));
        } else {
            return require(path.join(global.rootFolder, 'app', 'config', moduleName, configName + '.' + process.env.NODE_ENV + '.json'));
        }
    } catch (ex) {
        console.log("No config file found with name " + configName);
        return {};
    }
}
