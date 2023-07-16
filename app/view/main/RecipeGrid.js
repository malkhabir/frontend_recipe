Ext.define('frontend_recipe.view.main.RecipeGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'recipegrid',
    controller: 'recipegridcontroller',
    id: 'RecipeGridID',
    title: 'Recipe Management',
    store:{
        type: 'recipe'
    },
    columns: [
        { text: 'Title', dataIndex: 'title', flex: 1 },
        { text: 'Prep Time', dataIndex: 'preparationtime', flex: 1 },
        { text: 'Type', dataIndex: 'type', flex: 1 },
        { text: 'Author', dataIndex: 'author', flex: 1 },
        { text: 'recipeid', dataIndex: 'RecipeId', flex: 1, hidden: true }
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
                disabled: '{!recipegrid.selection}'
            }
        }, {
            text: 'Delete',
            handler: 'onDeleteClick',
            disabled: true,
            bind: {
                disabled: '{!recipegrid.selection}'
            }
        }]
    }],
    listeners: {
        selectionchange: 'onSelectionChange'
    }
});