'use strict';

angular.module('mean.system').directive('meanToken', ['Global', 'Tokens',
	function(Global, Tokens) {
		return {
			restrict: 'A',
			templateUrl: 'mean-tokens/views/tokens.html',
			scope: {
				meanToken: '=',
				l: '='
			},
			replace: false,
			link: function(scope, elem, attrs) {
				scope.global = Global;
				if (!scope.global.lang)
					scope.global.lang = 'en';
				if (!scope.global.langs)
					scope.global.langs = [{"identifier":"en"}];

				if (!scope.global.tokens) {
					scope.global.tokens = {};
					var token = {};
					Tokens.query(function(tokens) {
						for (var i = 0; i < tokens.length; i++) {
							token = tokens[i];
							scope.global.tokens[token.title] = token;
						}
					});
				}

				scope.$watch('l', function() {
					if (scope.l)
						scope.lang = scope.l;
				});

				scope.$watch('global.lang', function() {
					if (scope.global.lang && !scope.l)
						scope.lang = scope.global.lang;
				});

				scope.$watch('meanToken', function() {
					if (scope.meanToken) {
						if (!scope.global.tokens[scope.meanToken]) {
							Tokens.get({
								title: scope.meanToken
							}, function(token) {
								if (token.content) {
									scope.global.tokens[token.title] = token;
								} else {
									var content = {};
									content[scope.lang] = scope.meanToken;
									var token = new Tokens({
										title: scope.meanToken,
										content: content
									});
									token.$save(function(token) {
										scope.global.tokens[token.title] = token;
									});
								}
							});
						}
					}
				});

				scope.save = function() {
					if (scope.meanToken) {
						var token = scope.global.tokens[scope.meanToken];
						if (token) {
							if (!token.updated) {
								token.updated = [];
							}
							token.updated.push(new Date().getTime());

							token.$update(function(token) {
								if (!token.errors) {
									scope.global.tokens[token.title] = token;
								} else {
									alert(token.errors.content.message);
								}
							});
						}
					}
				}
			}
		};
	}
]);

angular.module('mean.system').directive('meanTokenEditable', ['Global',
	function(Global) {
		return {
			restrict: 'A',
			templateUrl: 'mean-tokens/views/tokens-editable.html',
			scope: {},
			replace: true,
			link: function(scope, elem, attrs) {
				scope.global = Global;
			}
		};
	}
]);