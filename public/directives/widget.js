'use strict';

angular.module('mean.mean-admin').directive('widget', function() {
    return {
        templateUrl: 'mean-admin/views/widget.html',
        scope: {
            info: '=settingInfo',
            widget: '@widgetType'
        },
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {}
    };
});