'use strict';
var Grid = require('gridfs-stream');

// The Package is past automatically as first parameter
module.exports = function(Admin, app, auth, database) {
    var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
    var mean = require('meanio');

    //Setting up the users api
    var users = require('../controllers/users');
    app.get('/admin/users', auth.requiresAdmin, users.all);
    app.post('/admin/users', auth.requiresAdmin, users.create);
    app.put('/admin/users/:userId', auth.requiresAdmin, users.update);
    app.delete('/admin/users/:userId', auth.requiresAdmin, users.destroy);

    //Setting up the users api
    var themes = require('../controllers/themes');
    app.get('/admin/themes', auth.requiresAdmin, function(req, res) {
        themes.save(req, res, gfs);
    });

    app.get('/admin/themes/defaultTheme', auth.requiresAdmin, function(req, res) {
        themes.defaultTheme(req, res, gfs);
    });

    app.get('/admin/settings', auth.requiresAdmin, function(req, res) {
        //res.jsonp(mean.config());
        res.jsonp({
            app: {
                name: {
                    default: 'MEAN - FullStack JS - Development',
                    value: 'Ccdsfsdf',
                    hardCoded: true
                }
            },
            facebook: {
                clientID: {
                    default: 'APP_ID',
                    value: 'asdfasdf',
                    hardCoded: false
                },
                clientSecret: {
                    default: 'APP_SECRET',
                    value: 'asdfasdf',
                    hardCoded: false
                },
                callbackURL: {
                    default: 'http://localhost:3000/auth/facebook/callback',
                    value: 'asdfasdf',
                    hardCoded: false
                }
            },
            favicon: {
                default: '/public/system/assets/img/favicon.ico',
                value: '/public/system/assets/img/favicon.ico',
                hardCoded: true
            }

        });
    });

    app.put('/admin/settings', auth.requiresAdmin, function(req, res) {
        res.jsonp(req.body);
    });
};