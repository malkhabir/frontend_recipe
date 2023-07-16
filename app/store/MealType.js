Ext.define('frontend_recipe.store.MealType', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.MealType',
    alias: 'store.mealtype',
    autoLoad: false,
    autoSync: false
});