'use strict';
angular.module('mean.mean-admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/admin/users',
                templateUrl: 'mean-admin/views/users.html'
            }).state('themes', {
                url: '/admin/themes',
                templateUrl: 'mean-admin/views/themes.html'
            }).state('settings', {
                url: '/admin/settings',
                templateUrl: 'mean-admin/views/settings.html'
            }).state('modules', {
                url: '/admin/modules',
                templateUrl: 'mean-admin/views/modules.html'
            });
    }
]).config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../mean-admin/assets/lib/zeroclipboard/ZeroClipboard.swf');
    }
]);