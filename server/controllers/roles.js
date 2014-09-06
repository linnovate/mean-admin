'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Role = mongoose.model('Role'),
    _ = require('lodash');

exports.getRoles = function(req, res) {
    Role.find().exec(function(err, roles) {
        if (err) {
            return res.jsonp('error', {
                status: 500
            });
        } else {
            res.jsonp(roles);
        }
    });
};

exports.addRoles = function(req, res) {
    var role = new Role(req.body);
    // No duplicated role is allowed
    role.save(function(err) {
        if (err) {
            return res.jsonp('error', {
                status: 500
            });
        } else {
            res.jsonp(role);
        }
    });
};

exports.destroy = function(req, res) {
    var roleId = req.params.roleId;
    Role.remove({_id:roleId}, function(err, role) {
        if (err) {
            return res.jsonp('error', {
                status: 500
            });
        }
        res.jsonp(role);
    });
};
