// Model: Ingredient.js
Ext.define('frontend_recipe.model.NumberofSteps', {
    extend: 'Ext.data.Model',
    
    fields: ['count', 'recipeid'],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/combobox/numberofsteps',
        reader: {
            type: 'json'
        }
    }
});

