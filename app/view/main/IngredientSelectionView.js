Ext.define('frontend_recipe.view.IngredientSelectionView', {
    extend: 'Ext.panel.Panel',
    xtype: 'ingredientselectionview',    
    layout: 'fit',

    items: [{
        xtype: 'grid',
        flex: 1,
        store: Ext.create('Ext.data.Store', {
            fields: ['IngredientId', 'Quantity'],
            data: []
        }),
        columns: [{
            text: 'Name',
            dataIndex: 'IngredientId',
            flex: 1,
            editor: {
                xtype: 'combobox',
                store: Ext.create('Ext.data.Store', {
                    proxy: {
                        type: 'ajax',
                        url: 'https://localhost:7270/api/ingredient',
                        reader: {
                            type: 'json',
                        }
                    },
                    fields: ['Name', 'MeasurementUnit', 'IngredientId'],
                    autoLoad: true,
                    
                }),
                displayField: 'Name',
                valueField: 'IngredientId',
                queryMode: 'remote',
                forceSelection: true,
                triggerAction: 'all',
                editable: false,
            },
            renderer: function(value, metaData, record) {
                var ingredientStore = this.columns[0].getEditor().getStore();
                var ingredient = ingredientStore.findRecord('IngredientId', value);
                if (ingredient) {
                    return ingredient.get('Name');
                }
                return value;
            },
            listeners: {
                beforeedit: function(editor, context) {
                    var column = context.column;
                    if (column.dataIndex === 'IngredientId') {
                        var value = context.record.get(column.dataIndex);
                        if (!value || value === '') {
                            Ext.Msg.alert('Error', 'Name cannot be empty');
                            return false; // Prevent editing if the value is empty
                        }
                    }
                }
            }
        },
        {
            text: 'Quantity',
            dataIndex: 'Quantity',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                allowDecimals: false,
                minValue: 0
            }
        }],
        selModel: 'rowmodel',
        plugins: [{
            ptype: 'rowediting',
            clicksToEdit: 2
        }],
    }],
    tbar: [{
        xtype: 'toolbar',
        items: [{
            text: 'Add Row',
            handler: function() {
                var grid = this.up('ingredientselectionview').down('grid');
                var store = grid.getStore();
                var newRecord = Ext.create('frontend_recipe.model.RecipeIngredients');
                store.add(newRecord);
                grid.editingPlugin.startEdit(newRecord, 0);
            }
        },{
            text: 'Remove Row',
            handler: function() {
                var grid = this.up('ingredientselectionview').down('grid');
                var selection = grid.getSelectionModel().getSelection();
                grid.getStore().remove(selection);
            }
            
        }]
    }],
        
});

