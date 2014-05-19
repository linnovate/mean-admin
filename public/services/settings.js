'use strict';

angular.module('mean.mean-admin').factory('Settings', ['$http',
    function($http) {
        var get = function(callback) {
            $http.get('/admin/settings').success(function(data, status, headers, config) {
                callback({
                    success: true,
                    settings: data
                });
            }).
            error(function(data, status, headers, config) {
                callback({
                    success: false
                });
            });
        };
        var update = function(settings, callback) {
            $http.put('/admin/settings', settings).success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback(data);
            });
        };
        return {
            get: get,
            update: update
        };
    }
]);