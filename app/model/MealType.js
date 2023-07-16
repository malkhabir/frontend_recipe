// Model: Ingredient.js
Ext.define('frontend_recipe.model.MealType', {
    extend: 'Ext.data.Model',
    
    fields: ['name', 'categoryid'],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/combobox/mealtypes',
        reader: {
            type: 'json'
        }
    }
});

