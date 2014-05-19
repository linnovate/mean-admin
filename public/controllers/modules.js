'use strict';

angular.module('mean.mean-admin').controller('ModulesController', ['$scope', 'Global', '$rootScope', '$http', 'Modules',
    function($scope, Global, $rootScope, $http, Modules) {
        $scope.oneAtATime = true;
        Modules.get(function(data) {
            $scope.modules = data;
        });
    }
]);