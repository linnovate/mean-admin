// 'use strict';

// angular.module('mean.mean-admin').directive('setting', function($sce) {
//     return {
//         template: '<div data-ng-bind-html="template"></div>',
//         scope: {
//             options: '=ngSetOptions',
//             type: '=ngSetType',
//             value: '=ngSetValue'
//         },
//         restrict: 'E',
//         replace: true,
//         link: function(scope, element, attrs) {
//             switch (scope.type) {
//                 case 'text':
//                 console.log(scope.value);
//                     scope.template = '<input type="text" data-ng-model="value"/>';
//                     break;
//                 // case 'select':
//                 //     scope.template = '<select data-ng-model="value" data-ng-multiple="true" multiple data-ng-options="option for option in options">' + '<option value="">Choose Option</option>' + '</select>';
//                 //     break;
//                 // default:
//                 //     scope.template = '<span>default</span>';
//             }
//             scope.template = $sce.trustAsHtml(scope.template);
//         }
//     };
// });

'use strict';

angular.module('mean.mean-admin').directive('setting', function($sce) {
    return {
        templateUrl: 'mean-admin/views/setting.html',
        scope: {
            options: '=ngSetOptions',
            type: '=ngSetType',
            value: '=ngSetValue'
        },
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {
            // switch (scope.type) {
            //     case 'text':
            //         console.log(scope.value);
            //         scope.template = '<input type="text" data-ng-model="value"/>';
            //         break;
            //     case 'select':
            //         scope.template = '<select data-ng-model="value" data-ng-multiple="true" multiple data-ng-options="option for option in options">' + '<option value="">Choose Option</option>' + '</select>';
            //         break;
            //     default:
            //         scope.template = '<span>default</span>';
            // }
            // scope.template = $sce.trustAsHtml(scope.template);
            if (scope.type === 'text')
                scope.type1 = 1;
            else if (scope.type === 'password')
                scope.type1 = 2;
            else if (scope.type === 'date')
                scope.type1 = 3;
            else if (scope.type === 'number')
                scope.type1 = 4;
            else if (scope.type === 'checkbox')
                scope.type1 = 5;
            else if (scope.type === 'select')
                scope.type1 = 6;
        }
    };
});