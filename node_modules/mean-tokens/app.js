'use strict';

var Module = require('meanio').Module;
var Tokens = new Module('mean-tokens');

Tokens.register(function(app, auth, database) {
	Tokens.routes(app, auth, database);

	Tokens.menus.add({
		title: 'Token Administration',
		link: 'all tokens',
		roles: ['admin'],
		menu: 'main'
	})

})