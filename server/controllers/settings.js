'use strict';

exports.get = function(req, res) {
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
};

exports.save = function(req, res) {
    res.jsonp(req.body);
};