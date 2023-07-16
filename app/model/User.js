Ext.define('frontend_recipe.model.User', {
    extend: 'Ext.data.Model', 

    fields: [
        'name', 'userid'
    ],

    proxy: {
        type: 'ajax',
        url: 'https://localhost:7270/api/combobox/users',
        reader: {
            type: 'json'
        }
    }
});