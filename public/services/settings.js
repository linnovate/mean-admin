'use strict';

angular.module('mean.mean-admin').factory('Settings', ['$http',
    function($http) {
        var get = function(callback) {
            $http.get('/admin/settings').success(function(data) {
                callback(data);
            });
        };
        var update = function(settings, callback) {
            $http.put('/admin/settings', settings).success(function(data) {
                callback(data);
            });
        };
        return {
            get: get,
            update: update
        };
    }
]);