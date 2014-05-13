'use strict';

angular.module('mean').controller('ModulesController', ['$scope', 'Global', '$rootScope', '$http', 'Modules',
    
    function($scope, Global, $rootScope, $http, Modules) {
        $scope.oneAtATime = true;
        $scope.modules = window.modules;
		Modules.get(function(data){
			$scope.meanModules = data;
		});
       
    }
]);
