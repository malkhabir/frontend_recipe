Ext.define('frontend_recipe.model.RecipeIngredients', {
    extend: 'Ext.data.Model',
    
    fields: [
        'RecipeId', 'IngredientId', 'Quantity', 'MeasurementUnit'
    ],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/recipeingredients',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
    
});