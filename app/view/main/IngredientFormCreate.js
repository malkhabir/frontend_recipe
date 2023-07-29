Ext.define('frontend_recipe.view.IngredientFormCreate', {
    extend: 'Ext.form.Panel',
    xtype: 'ingredientformcreate',
    controller: 'ingredientformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://localhost:7270/api/ingredient/',
    items: [{
        fieldLabel: 'Name',
        name: 'Name',
        allowBlank: false
    }, {
        fieldLabel: 'Unit',
        name: 'MeasurementUnit',
        allowBlank: false
    },
    {
        fieldLabel: 'Calories',
        name: 'Calories',
        allowBlank: false
        
    }],
    buttons: [{
        text: 'Save',
        formBind: true,
        handler: 'onSaveClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});