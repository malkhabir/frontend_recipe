Ext.define('frontend_recipe.model.HomeRecipeDataviewModel', {
    extend: 'Ext.data.Model', 
    autoLoad: true,
    sortOnLoad: true, 
    fields: [
        {name: 'title', type: 'string' }, 
        {name: 'description', type: 'string'}, 
        {name: 'preparationtime', type: 'int', sortType: 'asInt'}, 
        {name: 'type', type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: 'app/store/sencha-touch-examples.json',
        reader: {
            type: 'json'
        }
    }
});