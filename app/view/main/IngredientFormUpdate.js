Ext.define('frontend_recipe.view.IngredientFormUpdate', {
    extend: 'Ext.form.Panel',
    xtype: 'ingredientformupdate',
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
        fieldLabel: 'Id',
        name: 'IngredientId',
        allowBlank: false,
        hidden: true
    }],
    buttons: [{
        text: 'Update',
        formBind: true,
        handler: 'onUpdateClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});