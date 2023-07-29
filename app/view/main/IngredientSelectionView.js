Ext.define('frontend_recipe.view.IngredientSelectionView', {
    extend: 'Ext.panel.Panel',
    xtype: 'ingredientselectionview',    
    layout: 'fit',
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

