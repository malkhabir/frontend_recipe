Ext.define('frontend_recipe.store.HomeRecipeDataviewStore', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.HomeRecipeDataviewModel',
    alias: 'store.homerecipedataviewstore',
    autoLoad: true,
    remoteSort: false
});