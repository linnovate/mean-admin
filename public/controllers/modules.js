'use strict';

angular.module('mean.mean-admin').controller('ModulesController', ['$scope', 'Global', '$rootScope', '$http', 'Modules',
    function($scope, Global, $rootScope, $http, Modules) {
        $scope.oneAtATime = true;
        Modules.get(function(data) {
            $scope.modules = data;
            for (var index in $scope.modules) {
                if (index === 'articles')
                    $scope.modules[index].settings = {
                        'editable': {
                            'widget': 'toggle',
                            'value': true,
                            'options': {
                                'editable': true,
                                'values': {
                                    true: 'Enabled',
                                    false: 'Disabled'
                                }
                            },
                            'roles': ['admin']
                        }
                    };
                else
                    $scope.modules[index].settings = {
                        'ninja': {
                            'widget': 'toggle',
                            'value': true,
                            'options': {
                                'editable': true,
                                'values': {
                                    true: 'Show',
                                    false: 'Hide'
                                }
                            },
                            'roles': ['admin']
                        },
                        'something': {
                            'widget': 'select', //and checkbox
                            'value': {
                                name: 'test',
                                label: 'Label'
                            }, //['hidefont','b']
                            'options': {
                                'editable': true,
                                'multiple': false,
                                'values': [{
                                    name: 'hideFont',
                                    label: 'Hide The Font'
                                }, {
                                    name: 'aaa',
                                    label: 'AAA'
                                }, {
                                    name: 'hideFont',
                                    label: 'BBB'
                                }]
                            },
                            'roles': ['admin']
                        },
                        'select': {
                            'widget': 'select', //and checkbox
                            'value': [{
                                name: 'ggg',
                                label: 'fff'
                            }, {
                                name: 'hjj',
                                label: 'fff'
                            }], //['hidefont','b']
                            'options': {
                                'editable': true,
                                'multiple': true,
                                'values': [{
                                    name: 'hideFont',
                                    label: 'dfghdfgh'
                                }, {
                                    name: 'aaa',
                                    label: 'uuu'
                                }, {
                                    name: 'hideFont',
                                    label: 'dghdfgh'
                                }]
                            },
                            'roles': ['admin']
                        },
                        'slider': {
                            'widget': 'slider', //and checkbox
                            'value': {
                                min: 0,
                                max: 10
                            },
                            'options': {
                                'editable': true,
                                'multiple': true,
                                'range': {
                                    'min': 0,
                                    'max': 20
                                }
                            },
                            'roles': ['admin']
                        },
                        'slider1': {
                            'widget': 'slider', //and checkbox
                            'value': {
                                max: 10
                            },
                            'options': {
                                'editable': false,
                                'multiple': false,
                                'range': {
                                    'min': 0,
                                    'max': 20
                                }
                            },
                            'roles': ['admin']
                        },
                        'something1': {
                            'widget': 'input', //and checkbox
                            'type': 'text', //default, number , textarea
                            'value': 'Some default text',
                            'options': {
                                'editable': true,
                                'rows': 5, //if it is a text area
                            },
                            'roles': ['admin']
                        },
                        'something2': {
                            'widget': 'input', //and checkbox
                            'type': 'textarea', //default, number , textarea
                            'value': 'Some default text',
                            'options': {
                                'editable': true,
                                'rows': 5, //if it is a text area
                                'cols': 10
                            },
                            'roles': ['admin']
                        },
                        'something3': {
                            'widget': 'input', //and checkbox
                            'type': 'number', //default, number , textarea
                            'value': 10,
                            'options': {
                                'editable': true,
                            },
                            'roles': ['admin']
                        }
                    };
            }
        });
    }
]);