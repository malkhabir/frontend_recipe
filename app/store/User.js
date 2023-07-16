Ext.define('frontend_recipe.store.User', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.User',
    alias: 'store.user',    
    autoLoad: false,
    autoSync: false
});

