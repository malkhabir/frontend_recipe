Ext.define('frontend_recipe.controller.IngredientSelectionViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ingredientselectionviewcontroller',
    

    onAddClick: function() {
        var view = this.getView(),
            rec = new frontend_recipe.model.RecipeIngredients({
                RecipeId: '',
                IngredientId: '',
                Quantity: '',
                MeasurementUnit: ''
            });

        view.store.insert(0, rec);
        // view.findPlugin('cellediting').startEdit(rec, 0);
    },

    onRemoveClick: function(view, recIndex, cellIndex, item, e, record) {
        debugger
        record.drop();
    }

});