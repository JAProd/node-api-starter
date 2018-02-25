"use strict";
const jwt = require('jsonwebtoken');
var errs = require('restify-errors');
var keycloakConf = requireConfig("keycloak");
const KeyCloakCerts = require('get-keycloak-public-key');
const keyCloakCerts = new KeyCloakCerts(keycloakConf.url, keycloakConf.client);

module.exports = async (req, res, next) => {
    // Check the Authorization header 
    if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer '))) {
      // Authorization header is missing 
      return next(new errs.UnauthorizedError());
    }
    // Get the token from the Authorization header, skip 'Bearer ' prefix 
    const token = req.headers.authorization.substr(7);
    // decode the token without verification to have the kid value 
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      //token can't be decoded
      return next(new errs.UnauthorizedError());
    }
    const kid = decoded.header.kid;
    // fetch the PEM Public Key 
    const publicKey = await keyCloakCerts.fetch(kid);
    if (publicKey) {
      try {
        // Verify and decode the token 
        const decoded = jwt.verify(token, publicKey);
        req.user = decoded;
        return next();
      } catch (error) {
        //we do nothing
      }
    }
    return next(new errs.UnauthorizedError());
  };