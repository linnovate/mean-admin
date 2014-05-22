'use strict';

var mean = require('meanio');

exports.get = function(req, res) {
    res.jsonp(mean.config.verbose().flat.diff);
};

exports.save = function(req, res) {
    mean.config.update(req.body, function(err, set) {
        res.send(set);
    });
};