// Model: Ingredient.js
Ext.define('frontend_recipe.model.Ingredient', {
    extend: 'Ext.data.Model',
    
    fields: [
        'Name', 'MeasurementUnit', 'IngredientId'
    ],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/ingredient',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});