'use strict';
angular.module('mean.mean-admin').factory('Modules', ['$http',
    function($http) {
        return {
            get: function(callback) {
                $http.get('/admin/modules')
                    .success(function(data) {
                        callback(data);
                    });
            }
        };
    }
]);