'use strict';

/**
 * Module dependencies.
 */

require('../models/token');

var mongoose = require('mongoose'),
    Token = mongoose.model('Token'),
    _ = require('lodash');

/**
 * Find token by id
 */
exports.token = function(req, res, next, id) {
    Token.load(id, function(err, token) {
        if (err) return next(err);
        if (!token) return next(new Error('Failed to load token ' + id));
        req.token = token;
        next();
    });
};

/**
 * Create a token
 */
exports.create = function(req, res) {
    var title = req.body.title;
    Token.search(title, function(err, eToken) {

        if (eToken) return res.jsonp(eToken);

        var token = new Token(req.body);

        token.save(function(err) {
            if (err) {
                return res.send('users/signup', {
                    errors: err.errors,
                    token: token
                });
            } else {
                res.jsonp(token);
            }
        });

    });
};

/**
 * Update a token
 */
exports.update = function(req, res) {
    var token = req.token;

    token = _.extend(token, req.body);

    token.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                token: token
            });
        } else {
            res.jsonp(token);
        }
    });
};

/**
 * Update a token by title
 */
exports.updateByTitle = function(req, res) {
    var title = req.params.title;
    Token.search(title, function(err, token) {
        if (err) {
            res.render('error', {
                status: 500
            });
        }
        if (!token) {
            res.render('Didn\'t find token: ' + title, {
                status: 500
            });
        } else {
            token = _.extend(token, req.body);

            token.save(function(err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors,
                        token: token
                    });
                } else {
                    res.jsonp(token);
                }
            });
        }
    });
};

/**
 * Update a token by title
 */
exports.updateByCategory = function(req, res) {

};

/**
 * Delete a token
 */
exports.destroy = function(req, res) {
    var token = req.token;

    token.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                token: token
            });
        } else {
            res.jsonp(token);
        }
    });
};

/**
 * Show a token
 */
exports.show = function(req, res) {
    res.jsonp(req.token);
};

/**
 * Find token by title
 */
exports.search = function(req, res) {
    var title = req.params.title;
    Token.search(title, function(err, token) {
        if (err) {
            res.render('error', {
                status: 500
            });
        }
        if (!token) {
            res.send('Didn\'t find token: ' + title, {
                title: title,
                message: 'Token does not exist',
                status: 500
            });
        } else {
            res.jsonp(token);
        }
    });
};

/**
 * Delete a token by title
 */
exports.destroyByTitle = function(req, res) {
    var title = req.params.title;

    Token.search(title, function(err, token) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                token: token
            });
        }
        if (!token) {
            res.send('Didn\'t find token: ' + title, {
                title: title,
                message: 'Token does not exist',
                status: 500
            });
        } else {
            token.remove(function(err) {
                if (err) {
                    return res.send('users/signup', {
                        errors: err.errors,
                        token: token
                    });
                } else {
                    res.jsonp(token);
                }
            });
        }
    });
};


/**
 * List of Tokens
 */
exports.all = function(req, res) {
    var query = {};
    if (req.params.category) {
        query.categories = {
            $in: [req.params.category]
        };
    }
    Token.find(query).sort('-created').exec(function(err, tokens) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(tokens);
        }
    });
};