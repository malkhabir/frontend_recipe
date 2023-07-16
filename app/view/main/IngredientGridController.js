

Ext.define('frontend_recipe.controller.IngredientGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ingredientgridcontroller',
    
    onAddClick: function() {
        // debugger;
        var form = this.getView().add({
            xtype: 'formwindow',
            title: 'Add Ingredient',
            items: [{
                xtype: 'ingredientformcreate',
                viewModel: {
                    data: {
                        ingredient: Ext.create('frontend_recipe.model.Ingredient')
                    }
                }
            }]
            
        });
        form.show();
    },
    
    onEditClick: function() {
        var record = this.getView().getSelectionModel().getSelection()[0];
        var form = this.getView().add({
            xtype: 'formwindow',
            title: 'Edit Ingredient',
            items: [{
                xtype: 'ingredientformupdate',
            }],
        });
        var ingredientForm = form.down('ingredientformupdate');
        ingredientForm.getForm().setValues(record.data);
        form.show();
    },
    
    onDeleteClick: function() {
        var record = this.getView().getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm('Confirmation', 
        'Are you sure you want to delete this record?',
        function(btn)
        {
            if(btn === 'yes'){
                Ext.getBody().mask('Please wait...', 'loading-mask');
                Ext.Ajax.request({
                    url: 'https://localhost:7270/api/ingredient/' + record.data.IngredientId,
                    method: 'DELETE',
                    success: function(response) {
                        
                        var result = Ext.decode(response.responseText);
                        if (result.success === false) {
                            Ext.Msg.alert('Error', result.msg);
                        } else {
                            Ext.Msg.alert('Success', result.msg);
                            Ext.getCmp('IngredientGridID').getStore().reload();
                        }
                        Ext.getBody().unmask();
                    },
                    failure: function(response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert('Error', result.msg);
                        Ext.getBody().unmask();
                        
                    }
                });
            }
        });
       
    },
    
    onSelectionChange: function(selectionModel, selectedRecords) {
        var grid = this.getView();
        grid.down('button[text=Edit]').setDisabled(selectedRecords.length !== 1);
        grid.down('button[text=Delete]').setDisabled(selectedRecords.length !== 1);
    }

});
