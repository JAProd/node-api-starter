"use strict";
module.exports = function(app) {
    //test controller
    app.get('/secure', function (req, res) {
        res.status(200).json({"secure" : "yes"})});
};