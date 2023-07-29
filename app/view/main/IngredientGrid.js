Ext.define('frontend_recipe.view.main.IngredientGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ingredientgrid',
    controller: 'ingredientgridcontroller',
    id: 'IngredientGridID',
    title: 'Ingredient Management',

    store:{
        type: 'ingredient'
    },

    columns: [
        { text: 'Name', dataIndex: 'Name', flex: 1 },
        { text: 'Unit', dataIndex: 'MeasurementUnit', flex: 1 },
        { text: 'Id', dataIndex: 'IngredientId', flex: 1, hidden: true, },
        { text: 'Calories', dataIndex: 'Calories', flex: 1}
    ],
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Add',
            handler: 'onAddClick'
        }, {
            text: 'Edit',
            handler: 'onEditClick',
            disabled: true,
            bind: {
                disabled: '{!ingredientgrid.selection}'
            }
        }, {
            text: 'Delete',
            handler: 'onDeleteClick',
            disabled: true,
            bind: {
                disabled: '{!ingredientgrid.selection}'
            }
        }]
    }],
    listeners: {
        selectionchange: 'onSelectionChange'
    }
});