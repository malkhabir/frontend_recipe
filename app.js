/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'frontend_recipe.Application',

    name: 'frontend_recipe',

    requires: [
        // This will automatically load all classes in the frontend_recipe namespace
        // so that application classes do not need to require each other.
        'frontend_recipe.*'
    ],

    // The name of the initial view to create.
    mainView: 'frontend_recipe.view.main.Main'
});
