Ext.define('frontend_recipe.view.RecipeFormUpdate', {
    extend: 'Ext.form.Panel',
    xtype: 'recipeformupdate',
    controller: 'recipeformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://localhost:7270/api/recipe/',

    items: [{
        fieldLabel: 'Title',
        name: 'title',
        allowBlank: false
    },{
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name: 'description',
        allowBlank: false,
        maxRows: 2
    },{
        xtype: 'numberfield',
        fieldLabel: 'Prep Time',
        name: 'preparationtime',
        allowBlank: false
    },
    {   
        xtype: 'combobox',
        fieldLabel: 'Author',
        displayField: 'name',
        // valueField: 'userid',
        name: 'author',
        store: {
            type: 'user',
        },
        allowBlank: false,
    },
    {   
        xtype: 'combobox',
        fieldLabel: 'Type',
        displayField: 'name', //Shown in the combobox
        // valueField: 'categoryid', //Corresponding displayfield Id submitted
        name: 'type',
        store: {
            type: 'mealtype',
        },
        allowBlank: false
    },
    {
        xtype: 'numberfield',
        fieldLabel: 'Number of Steps',
        name: 'recipesteps',
        minValue: 1,
        maxValue: 100
    }, 
    {
        xtype: 'tagfield',
        fieldLabel: 'Select country tags(s)',
        store: {
            type: 'countrytags',      
        },
        displayField: 'Name',
        valueField: 'Id',
        filterPickList: true,
        queryMode: 'remote',
        name: 'countryid',
        // itemTpl: '<span class="tag-icon">yoo</span>{name}',
        listeners: {
            beforerender: function(tagfield) {  //Reloading the store with the available ingredients
                tagfield.store.getProxy().setExtraParam('recipeId', 0);
                tagfield.store.load();
            }
        }
    },
    {
        fieldLabel: 'recipeId',
        name: 'recipeId',
        allowBlank: false,
        store: {
            type: 'recipe'
        },
        hidden: true
    },{
        xtype: 'textareafield',
        fieldLabel: 'Instructions',
        name: 'instructions',
        allowBlank: false,
        maxRows: 2
    }],

    // buttons: [{
    //     text: 'Update',
    //     formBind: true,
    //     handler: 'onUpdateClick'
    // }, {
    //     text: 'Cancel',
    //     handler: 'onCancelClick'
    // }]
});
