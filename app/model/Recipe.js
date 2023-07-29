// Model: Recipe.js
Ext.define('frontend_recipe.model.Recipe', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'title', type: 'string' }, 
        {name: 'description', type: 'string'}, 
        {name: 'preparationtime', type: 'int', sortType: 'asInt'}, 
        {name: 'author', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'recipeId', type: 'string', persist: false, unique: true, identifier: 'sequential' },
        {name: 'recipesteps', type: 'int'},
        {name: 'instructions', type: 'string'},
        {name: 'imagepath', type: 'string'},
        {name: 'Calories', type: 'number'}
    ],

    hasMany: {
        model: 'frontend_recipe.model.CountryTags',
        name: 'countrytags'
    },

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/recipe',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    }
});