'use strict';

angular.module('mean.system').filter('meanTokensToArray', function() {
	return function(input) {
		var out = [];
		for (var i in input) {
			out.push(input[i]);
		}
		return out;
	}
});

angular.module('mean.system').filter('meanTokensCategory', function() {
	return function(input, title, category) {
		if (title || category) {
			var out = [];
			for (var i = 0; i < input.length; i++) {
				if (input[i].categories && input[i].categories.join(',').match(category) && input[i].title.match(title))
					out.push(input[i]);
			}
			return out;
		} else {
			return input;
		}
	}
});