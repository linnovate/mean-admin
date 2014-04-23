/**
 * AssetManager
 * http://www.dadoune.com/
 *
 * Copyright (c) 2014 Reed Dadoune
 * Licensed under the MIT license.
 **/

'use strict';

var glob = require('glob'),
	fs = require('fs'),
	_ = require('underscore');

// Asset holder variable
var assets = {
	css: [],
	js: []
};

exports.init = function (options) {
	// Glob options
	var globOptions = {sync: true};

	options = _.extend({
		css: {},
		js: {},
		debug: true,
		webroot: false
	}, options);

	/**
	 * Filter out assets that are not files
	 *
	 * @param files
	 */
	var filterFiles = function (files) {
		return _.filter(files, function (file) {
			return fs.statSync(file).isFile();
		});
	};

	/**
	 * Get assets from pattern. Pattern could be
	 *  - an array
	 *  - a string
	 *  - external resource
	 *
	 * @param pattern
	 */
	var getAssets = function (pattern) {
		var files = [];
		if (_.isArray(pattern)) {
			_.each(pattern, function (path) {
				files = files.concat(getAssets(path));
			});
		} else if (_.isString(pattern)) {
			var regex = new RegExp('^(http://|https://|//)');
			if (regex.test(pattern)) {
				// Source is external
				files.push(pattern);
			} else {
				glob(pattern, globOptions, function (er, matches) {
					files = filterFiles(matches);
				});
			}
		}

		return files;
	};

	_.each(['css', 'js'], function (fileType) {
		_.each(options[fileType], function (value, key) {
			if (!options.debug) {
				assets[fileType].push(key);
			} else {
				assets[fileType] = assets[fileType].concat(getAssets(value));
			}
		});
		if (options.webroot) {
			// Strip the webroot foldername from the filepath
			var regex = new RegExp('^' + options.webroot);
			_.each(assets[fileType], function (value, key) {
				assets[fileType][key] = value.replace(regex, '');
			});
		}
	});

};

exports.assets = assets;
