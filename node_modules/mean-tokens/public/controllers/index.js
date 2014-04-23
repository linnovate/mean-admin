'use strict';

angular.module('mean').controller('TokensController', ['$scope', 'Global', 'Tokens',
	function($scope, Global, Tokens) {
		$scope.global = Global;

		$scope.create = function() {
			if (this.title) {
				var content = {};
				if (typeof(this.content) === 'object') {
					content = this.content;
					this.content = {};
				} else {
					content[$scope.global.lang] = this.content;
					this.content = '';
				}

				var categories = this.categories ? this.categories.split(',') : [];
				var token = new Tokens({
					title: this.title,
					content: content,
					categories: categories
				});
				token.$save(function(token) {
					if (token.title)
						$scope.global.tokens[token.title] = token;
				});

				this.title = '';
				this.categories = '';
			}
		};

		$scope.remove = function(token) {
			if (token) {
				token.$remove();
				delete $scope.global.tokens[token.title];
			}
		};

		$scope.update = function(token) {
			if (!token)
				token = $scope.token;
			if (!token.updated) {
				token.updated = [];
			}
			token.categories = token.categories ? this.categories.split(',') : [];
			token.updated.push(new Date().getTime());

			token.$update();
		};

		$scope.init = function() {
			$scope.sort = 'title';
			$scope.reverse = true;
			if (!$scope.global.langs)
				$scope.global.langs = [{"identifier":"en"}];
			if (!$scope.global.lang)
				$scope.global.lang = 'en';

			if (!$scope.global.tokens) {
				$scope.global.tokens = {};
				var token = {};
				Tokens.query(function(tokens) {
					for (var i = 0; i < tokens.length; i++) {
						token = tokens[i];
						$scope.global.tokens[token.title] = token;
					}
				});
			}
		};

		$scope.isEmpty = function() {
			return (Object.keys($scope.global.tokens).length === 0);
		}
	}
]);