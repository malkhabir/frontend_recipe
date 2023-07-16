Ext.define('frontend_recipe.store.RecipeIngredients', {
    extend: 'Ext.data.Store',
    model: 'frontend_recipe.model.RecipeIngredients',
    alias: 'store.recipeingredients',
    autoLoad: true,
    autoSync: false
});