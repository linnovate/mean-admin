'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Admin = new Module('mean-admin');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Admin.register(function(app, auth, database) {
    Admin.aggregateAsset('css', 'admin.css');
    Admin.aggregateAsset('css', 'themes.css');
    Admin.aggregateAsset('js', 'users.js');
    Admin.aggregateAsset('js', 'themes.js');
    Admin.aggregateAsset('js', 'modules.js');
    Admin.aggregateAsset('js', 'ng-clip.js');
    Admin.aggregateAsset('js', 'settings.js');
    Admin.aggregateAsset('js', '../lib/ng-clip/src/ngClip.js', {
        absolute: false,
        global: true
    });

    Admin.aggregateAsset('js', '../lib/zeroclipboard/dist/ZeroClipboard.min.js', {
        absolute: false,
        global: true
    });

    Admin.angularDependencies(['ngClipboard']);

    // We enable routing. By default the Package Object is passed to the routes
    Admin.routes(app, auth, database);
    return Admin;
});
