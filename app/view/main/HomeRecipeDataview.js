Ext.define('frontend_recipe.view.main.HomeRecipeDataview', {
    extend: 'Ext.grid.Panel',
    xtype: 'homerecipedataview',
    controller: 'dataview-multisort',
    
    store: {
        type: 'recipe'
    },

    
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

    
    columns: [{
        xtype: 'templatecolumn',
        flex:1,
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-multisort-item">',
                    '<div class="meal-category">',
                        '<div class="meal-image" style="display: inline-block; width: 15%; flex: 1; margin-right: 0px;" >',
                            '<img src="{[this.getImageUrl(values)]}" width="150" height="100" />',
                        '</div>',
                        '<div  style="display: inline-block; width: 85%; flex: 3;" >',
                            '<h3 style="white-space: normal;">{title}</h3>',
                            '<p style="white-space: normal;">Preparation Time: {preparationtime} min</p>',
                            '<p style="white-space: normal;">Description: {description}</p>',
                            '<p style="white-space: normal; text-align: right;">Calories: {Calories}</p>',
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
        ]
    }],

    listeners: {
        itemdblclick: 'onRecipeDoubleClick'
    }

});