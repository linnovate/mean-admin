'use strict';

angular.module('mean.mean-admin').controller('ModulesController', ['$scope', 'Global', '$rootScope', '$http', 'Modules',
    function($scope, Global, $rootScope, $http, Modules) {
        $scope.oneAtATime = true;
        $scope.test = 'yes';
        Modules.get(function(data) {
            $scope.modules = data;
            for (var index in $scope.modules) {
                if (index === 'articles')
                    $scope.modules[index].settings = {
                        text: {
                            type: 'text',
                            options: '',
                            value: 'asd'
                        },
                        date: {
                            type: 'date',
                            options: '',
                            value: '2011-01-13'
                        },
                        password: {
                            type: 'password',
                            options: '',
                            value: 'asd'
                        },
                        number: {
                            type: 'number',
                            options: '',
                            value: '126'
                        },
                        select: {
                            type: 'select',
                            options: ['a', 'b', 'c'],
                            value: ['a', 'b']
                        },
                        checkbox: {
                            type: 'checkbox',
                            options: {
                                title: 'test'
                            },
                            value: true
                        }
                    };
                else
                    $scope.modules[index].settings = {
                        checkbox: {
                            type: 'checkbox',
                            options: {
                                title: 'ninja - salta '
                            },
                            value: true
                        }
                    };
            }
        });

        $scope.remove = function(name, prop) {
            delete $scope.modules[name].settings[prop];
        };

        $scope.add = function(name, prop) {

        };
    }
]);