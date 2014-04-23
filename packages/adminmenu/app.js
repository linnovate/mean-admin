 /*
  * Defining the Package
  */

 var Module = require("meanio").Module;

 var Adminmenu = new Module("Adminmenu");

 /*
  * All MEAN packages require registration
  * Dependency injection is used to define required modules
  */

 Adminmenu.register(function(app, auth, database) {

     Adminmenu.aggregateAsset('css', 'adminmenu.css');

     //We enable routing. By default the Package Object is passed to the routes
     Adminmenu.routes(app, auth, database);

     //We are adding a link to the main menu for all authenticated users
     // Adminmenu.menus.add({
     //     title: "adminmenu example page",
     //     link: "adminmenu example page",
     //     roles: ["admin"],
     //     menu: "main"
     // });

     /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Adminmenu.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Adminmenu.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settigns
    Adminmenu.settings(function (err, settings) {
      //you now have the settings object
    });
    */

     return Adminmenu;
 });