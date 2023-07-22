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
        // Create the window if it doesn't exist or show the existing one
        var window = Ext.WindowManager.get('recipeWindow');
        if (!window) {
          window = Ext.create('Ext.window.Window', {
            itemId: 'recipeWindow',
            title: 'Recipe: ' + record.get('title'),
            maximized: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center', // Center the child items horizontally within the container
                        //pack: 'center', // Center the child items vertically within the container
                      },
                    items: [
                        {
                            xtype: 'image',
                            src: 'https://localhost:7270/api/recipe/image/' + record.get('ImagePath'),
                            width: 300, // adjust the image width as needed
                            height: 200, // adjust the image height as needed
                            margin: '20 0 0 0' // up right down left
                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            padding: '50 0',
                            items: [
                                {
                                    xtype: 'component',
                                    html: record.get('description'), // Use the description from the record
                                    style: 'white-space: normal;', // Use CSS to handle word wrapping
                                },
                            ],

                        },
                        {
                            xtype: 'container',
                            layout: 'vbox',
                            padding: '10 0',
                            items: [{
                                    xtype: 'component',
                                    html: '<h2>Instructions</h2>', // Add the header for instructions
                                },
                                {
                                    xtype: 'component',
                                    html: formatInstructions(record.data.instructions)
                                }
                            ]
                        }
                    ]
                }
            ]
          });
        }
      
        window.show();
    }

});

function formatInstructions(instructions) {
    debugger
    const jsonObject = JSON.parse(instructions);
    const stepPanels = [];
    Object.keys(jsonObject).forEach((stepNumber) => {
        stepPanels.push({
            xtype: 'component',
            html: `<strong>${stepNumber}.</strong> ${jsonObject[stepNumber]}`,
            padding: '1000 0', // Add some spacing between each instruction
            style: 'white-space: pre-wrap;'
        });
    });

    // const formattedJsonString = `{${stepPanels.join('\n')}}`;

    return stepPanels;
}