// Model: Ingredient.js
Ext.define('frontend_recipe.model.Ingredient', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'Name', type: 'string'},
        {name: 'MeasurementUnit', type: 'string'},
        {name: 'IngredientId', type: 'int'},
        {name: 'Calories', type: 'number'}
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