
angular.module('mean').factory("Modules", ['$http',
    function($http) {
        return {
        	get: function(callback){
	        	$http.get('/admin/modules')
				.success(function(data) {
					callback(data);
				});
			}
		}
    }
]);
