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
    Admin.aggregateAsset('js', '/node_modules/mean-admin/public/assets/lib/ng-clip/src/ngClip.js', {
        absolute: true
    });

    Admin.aggregateAsset('js', '/node_modules/mean-admin/public/assets/lib/zeroclipboard/ZeroClipboard.min.js', {
        absolute: true
    });

    Admin.angularDependencies(['ngClipboard']);

    Admin.settings({
        salta: {
            type: 'checkbox',
            options: {
                title: 'ninja - salta '
            },
            value: false
        }
    });

    // We enable routing. By default the Package Object is passed to the routes
    Admin.routes(app, auth, database);
    return Admin;
});