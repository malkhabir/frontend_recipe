Ext.define('frontend_recipe.view.main.HomeRecipeDataview', {
    extend: 'Ext.panel.Panel',
    xtype: 'homerecipedataview',
    controller: 'dataview-multisort',
    
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.BoxReorderer',
        'Ext.ux.DataView.Animated',
        'Ext.grid.column.Template'
    ],

    title: 'Recipes',
    
    tbar: {
            defaults: {
                listeners: {
                    changeDirection: 'updateStoreSorters'
                }
            },

            items: [{
                xtype: 'component',
                html: 'Sort on:'
            }, {
                xtype: 'homerecipedataviewmultisortbutton',
                text: 'Type',
                dataIndex: 'type'
            }, {
                xtype: 'homerecipedataviewmultisortbutton',
                text: 'Prep Time',
                dataIndex: 'preparationtime',
            }]
        },

    
    items: {
        xtype: 'dataview',
        cls: 'grid-dataview', // Custom CSS class for the DataView to handle column layout
        reference: 'dataview',
        plugins: {'ux-animated-dataview': true},
        itemSelector: 'div.dataview-multisort-item',
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-multisort-item">',
                    '<div class="meal-image">',
                        '<img src="{[this.getImageUrl(values)]}" />',
                        '<div class="meal-info">',
                            '<div class="meal-header">',
                                '<h3>{title}</h3>',
                                '<p class="calories">Calories: {Calories}</p>',
                            '</div>',
                                '<p>{preparationtime} min</p>',
                        '</div>',
                    '</div>',
                '</div>',
            '</tpl>',
            {
                getImageUrl: function (values) {
                    // Values represent record
                    debugger
                    var imageName = values.ImagePath;
                    // Make an API call to retrieve the image URL based on the imagePath or any other necessary logic
                    var imageUrl = 'https://localhost:7270/api/recipe/image/' + imageName;
                    return imageUrl;
                }
            }
        ],
        store: {
            type: 'recipe'
        },
        listeners: {
            itemdblclick: 'onRecipeDoubleClick'
        }
    },

    

});