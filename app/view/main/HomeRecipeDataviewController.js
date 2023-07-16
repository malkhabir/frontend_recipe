Ext.define('frontend_recipe.view.main.HomeRecipeDataviewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dataview-multisort',

    ready: false,

    beforeRender: function () {
        this.ready = true; // skips updateSorters from button initialization
        this.updateStoreSorters();
    },

    /**
     * Returns the array of Ext.util.Sorters defined by the current toolbar button order
     * @return {Array} The sorters
     */
    getSorters: function() {
        var view = this.getView(),
            buttons = view.query('homerecipedataviewmultisortbutton'),
            sorters = [];
        Ext.each(buttons, function (button) {
            var dataIndex = button.getDataIndex(),
                direction = button.getDirection(),
                sorter;
                
                if (dataIndex === 'preparationtime') {
                    sorter = {
                        direction: direction,
                        sorterFn: function(record1, record2) {            
                            var value1 = record1.get('preparationtime'),
                                value2 = record2.get('preparationtime');
                            return (value1 > value2) ? 1: (value1 === value2) ? 0: -1;
                        }
                    };
                } else {
                    sorter = { 
                        direction: direction,
                        property: dataIndex
                    };
                }
            sorters.push(sorter);
        });
        return sorters;
    },

    /**
     * @private
     * Updates the DataView's Store's sorters based on the current Toolbar button configuration
     */
    updateStoreSorters: function() {
        if (this.ready) {
            var sorters = this.getSorters();
            var view = this.getView();
            view.store.sort(sorters);
        }
    },

    onRecipeDoubleClick: function (view, record) {
        var tabPanel = Ext.getCmp('recipeTabPanel'); // Get the reference to the tab panel
        var itemId = 'recipeTab-' + record.getId(); // Unique ID for the tab item
        var existingTab = tabPanel.child('#' + itemId); // Check if the tab already exists

        if (existingTab) {
            tabPanel.setActiveTab(existingTab); // Activate the existing tab if it already exists
        } else {
            var newTab = tabPanel.add({
                xtype: 'panel',
                title: record.get('title'),
                itemId: itemId,
                closable: true,
                items: [
                    // Add your desired components to display the recipe details
                    {
                        xtype: 'component',
                        html: 'Preparation Time: ' + record.get('preparationtime')
                    },
                    {
                        xtype: 'component',
                        html: 'Description: ' + record.get('description')
                    },
                    {
                        xtype: 'component',
                        html: 'Calories: ' + record.get('calories')
                    }
                    // Add more components as needed to display the recipe details
                ]
            });

            tabPanel.setActiveTab(newTab); // Activate the newly created tab
        }
    }
});