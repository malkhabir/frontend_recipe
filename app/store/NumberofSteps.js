Ext.define('frontend_recipe.store.NumberofSteps', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.NumberofSteps',
    alias: 'store.numberofsteps',
    autoLoad: true,
    autoSync: false
});