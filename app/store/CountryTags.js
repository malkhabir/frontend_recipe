Ext.define('frontend_recipe.store.CountryTags', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.CountryTags',
    alias: 'store.countrytags',
    autoLoad: true,
    autoSync: false
});