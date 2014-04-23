node-assetmanager
=================

Asset manager easily allows you to switch between development and production css and js files in your templates by managing them in a single json file that's still compatible with grunt cssmin and uglify. A working demo/implimentation of this can been seen in [MEAN Stack](https://github.com/linnovate/mean).


## Usage
To use [assetmanager](https://www.npmjs.org/package/assetmanager), cd into your project directory and install assetmanager with npm.


```
$ cd /to/project/directory
$ npm install assetmanager --save
```

Setup an external json asset configuration file that holds your development and production css and js files. The format of this file matches that used in cssmin and uglify grunt tasks where the key is the name of the output production file and the following array is a list of files that need to be compressed. You may also add external resources, however these entries should be 1-to-1 key value pairs. External resources will not cause issues with grunt cssmin or uglify, they will simply be treated as empty resources and thus ignored.

**assets.json**

```
{
	"css": {
		"public/build/css/dist.min.css": [
			"public/lib/bootstrap/dist/css/bootstrap.css",
			"public/css/**/*.css"
		]
	},
	"js": {
		"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore.js",
		"public/build/js/dist.min.js": [
			"public/lib/angular/angular.js",
			"public/lib/angular-cookies/angular-cookies.js",
			"public/lib/angular-resource/angular-resource.js",
			"public/lib/angular-ui-router/release/angular-ui-router.js",
			"public/lib/angular-bootstrap/ui-bootstrap.js",
			"public/lib/angular-bootstrap/ui-bootstrap-tpls.js",
			"public/js/**/*.js"
		]
	}
}
```

This way in your `gruntfile` you can easily import the same `assets.json` config file and plop in the respective values for css and js.

**gruntfile.js**

```
'use strict';

module.exports = function(grunt) {
	// Project Configuration
	grunt.initConfig({
		assets: grunt.file.readJSON('config/assets.json'),
		uglify: {
			production: {
				options: {
					mangle: true,
					compress: true
				},
				files: '<%= assets.js %>'
			}
		},
		cssmin: {
			combine: {
				files: '<%= assets.css %>'
			}
		}
	});

	//Load NPM tasks
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	//Default task(s).
	grunt.registerTask('default', ['cssmin', 'uglify']);

};
```

Then in your node app require `assetmanager`, the example below is partial code from an express setup. Call `assetmanager.init` with your files from your `assets.json` config file. Set the `debug` value to toggle between your compressed files and your development files. You can also set the `webroot` value so that when assetmanager processes your files it will change `public/lib/angular/angular.js` to `/lib/angular/angular.js` so that everything is relative to your webroot.

```
'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	assetmanager = require('assetmanager');

module.exports = function(app, passport, db) {

	app.configure(function() {
		// Import your asset file
		var assets = require('./assets.json');
		assetmanager.init({
			js: assets.js,
			css: assets.css,
			debug: (process.env.NODE_ENV !== 'production'),
			webroot: 'public'
		});
		// Add assets to local variables
		app.use(function (req, res, next) {
			res.locals({
				assets: assetmanager.assets
			});
			next();
		});

		// ... Your CODE

	});

	// ... Your CODE

};
```
Then finally in your template you can output them with whatever templating framework you use. Using swig your template might look something like this:

```
{% for file in assets.css %}
	<link rel="stylesheet" href="{{file}}">
{% endfor %}

{% for file in assets.js %}
	<script type="text/javascript" src="{{file}}"></script>
{% endfor %}
```

