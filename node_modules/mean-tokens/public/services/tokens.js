'use strict';

//Tokens service used for tokens REST endpoint
angular.module('mean.system').factory('Tokens', ['$resource', function($resource) {
    return $resource('tokens/title/:title', {
        title: '@title'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

//Tokens service used for tokens REST endpoint
angular.module('mean.system').factory('TokensByCategory', ['$resource', function($resource) {
    return $resource('tokens/category/:category', {
        title: '@category'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);