'use strict';
angular.module('mean.mean-admin').controller('SettingsController', ['$scope', 'Global', 'Settings',
    function($scope, Global, Settings) {

        $scope.newItem = {
            key: '',
            value: {
                value: ''
            }
        };

        $scope.init = function() {
            Settings.get(function(data) {
                if (data.success) {
                    $scope.settings = data.settings;
                }
            });
        };

        $scope.update = function(settings) {
            settings = JSON.unflatten(settings);
            Settings.update(settings, function(data) {});
        };

        $scope.getTextToCopy = function() {
            var settings = JSON.clean(JSON.unflatten($scope.settings));
            return JSON.stringify(settings);
        };

        var reconstruct = function(obj, key, value) {
            var objs = key.split(".");
            var len = objs.length;
            var last;
            objs.shift();
            last = obj;
            for (var k in objs) {
                if (Number(k) === len - 2) {
                    last[objs[k]] = value;
                    break;
                }
                if (last[objs[k]] === undefined) {
                    last[objs[k]] = {};
                }
                last = last[objs[k]];
            }
        }

        JSON.unflatten = function(data) {
            var settings = {};
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    reconstruct(settings, "settings."+i , data[i].value);
                }
            }
            return settings;
        }

        JSON.clean = function(data, options) {
            var result = {};
            clean(data, '');

            function clean(config, root) {
                for (var index in config) {
                    if (config[index] && !config[index].value && typeof(config[index]) === 'object') {
                        clean(config[index], index);
                    } else {
                        if (root && !result[root]) {
                            result[root] = {};
                            result[root][index] = config[index] ? config[index].value : null;
                        } else if (root && result[root])
                            result[root][index] = config[index] ? config[index].value : null;

                        else {
                            result[index] = config[index] ? config[index].value : null;
                        }
                    }
                }
            }
            return result;
        };

        $scope.add = function(newItem) {
            $scope.settings[newItem.key] = newItem.value;
            $scope.update($scope.settings);
            $scope.newItem = {
                key: '',
                value: {
                    value: ''
                }
            };
        };

        $scope.remove = function(key) {
            delete $scope.settings[key];
            $scope.update($scope.settings);
        };

        $scope.setDefault = function(key) {
            $scope.settings[key].value = $scope.settings[key]['default'];
            $scope.update($scope.settings);
        };
    }
]);
