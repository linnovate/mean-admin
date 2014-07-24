//Users service used for users REST endpoint
angular.module('mean.mean-admin').factory("Users", ['$resource',
    function($resource) {
        return $resource('/admin/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('mean.mean-admin').factory("Roles", ['$resource',
    function($resource) {
        return $resource('/admin/users/roles/:roleId', {
            update: {
                method: 'PUT'
            }
        });
    }
]);
