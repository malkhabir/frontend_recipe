Ext.define('frontend_recipe.store.Ingredient', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.Ingredient',
    alias: 'store.ingredient',
    autoLoad: true,
    autoSync: false
});