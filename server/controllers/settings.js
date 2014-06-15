'use strict';

var mean = require('meanio');

exports.get = function(req, res) {
    res.jsonp(mean.config.flat.diff);
};

exports.save = function(req, res) {
    mean.config.update(req.body, function(err, settings) {
        res.send(settings);
    });
};
