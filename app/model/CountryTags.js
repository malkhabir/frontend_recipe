// Model: Ingredient.js
Ext.define('frontend_recipe.model.CountryTags', {
    extend: 'Ext.data.Model',
    
    fields: [
        'Id', 'Name'
    ],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/combobox/countrytags',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});