Ext.define('frontend_recipe.store.Recipe', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.Recipe',
    alias: 'store.recipe',
    autoLoad: true,
    autoSync: false
});