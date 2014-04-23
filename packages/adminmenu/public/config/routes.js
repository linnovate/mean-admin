'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('adminmenu example page', {
                url: '/adminmenu/example',
                templateUrl: 'adminmenu/views/index.html'
            });
    }
])