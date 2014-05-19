'use strict';
angular.module('mean.mean-admin').controller('SettingsController', ['$scope', 'Global', 'Settings',
    function($scope, Global, Settings) {

        $scope.init = function() {
            Settings.get(function(data) {
                if (data.success) {
                    $scope.settings = JSON.flatten(data.settings);
                } else {
                    alert('error');
                }
            });
        };

        $scope.update = function(settings) {
            settings = JSON.unflatten(settings);
            Settings.update(settings, function(data) {
                $scope.settings = JSON.flatten(data);
            });
        };

        $scope.getTextToCopy = function() {
            var settings = JSON.unflatten($scope.settings);
            return JSON.stringify(settings);
        };

        JSON.flatten = function(data) {
            var result = {};
            flatten(data, '');

            function flatten(config, root) {
                for (var index in config) {
                    if (config[index] && !config[index].value && typeof(config[index]) === 'object') flatten(config[index], layerRoot(root, index));
                    else
                        result[layerRoot(root, index)] = {
                            'value': (config[index] && config[index].value) ? config[index].value : 'value',
                            'default': (config[index] && config[index]['default']) ? config[index]['default'] : 'default',
                            'hardCoded': (config[index] && config[index].hardCoded) ? config[index].hardCoded : false
                        };
                }
            }

            function layerRoot(root, layer) {
                return (root ? root + '.' : root) + layer;
            }
            return result;
        };
        // JSON.flatten = function(data) {
        //     var result = {};

        //     function recurse(cur, prop) {
        //         console.log(prop);
        //         if (Object(cur) !== cur) {
        //             result[prop] = cur;
        //         } else if (Array.isArray(cur)) {
        //             for (var i = 0, l = cur.length; i < l; i++)
        //                 recurse(cur[i], prop + "[" + i + "]");
        //             if (l == 0)
        //                 result[prop] = [];
        //         } else {
        //             var isEmpty = true;
        //             for (var p in cur) {
        //                 isEmpty = false;
        //                 recurse(cur[p], prop ? prop + '.' + p : p);
        //             }
        //             if (isEmpty && prop)
        //                 result[prop] = {};
        //         }
        //     }
        //     recurse(data, '');
        //     console.log(result);
        //     return result;
        // };

        JSON.unflatten = function(data) {
            if (Object(data) !== data || Array.isArray(data))
                return data;
            var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
                resultholder = {};
            for (var p in data) {
                var cur = resultholder,
                    prop = '',
                    m;
                while (m = regex.exec(p)) {
                    cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                    prop = m[2] || m[1];
                }
                cur[prop] = data[p];
            }
            return resultholder[''] || resultholder;
        };
    }
]);