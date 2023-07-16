Ext.define('frontend_recipe.view.main.HomeRecipeDataview', {
    extend: 'Ext.grid.Panel',
    xtype: 'homerecipedataview',
    controller: 'dataview-multisort',
    store: {
        type: 'recipe'//'homerecipedataviewstore'
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
        flex: 1,
        tpl: [
            '<tpl for=".">',
                '<div class="dataview-multisort-item">',
                    '<div class="meal-category">',
                        '<div class="meal-image" style="display: inline-block;">',
                            '<img src="{[this.getImageUrl(values)]}" width="100" height="100" />',
                        '</div>',
                        '<div class="meal-details" style="display: inline-block;">',
                            '<h3>&nbsp;&nbsp;{title}</h3>',
                            '<p>&nbsp;&nbsp;Prep Time: {preparationtime} min</p>',
                            '<p>&nbsp;&nbsp;Description: {description}&nbsp;&nbsp;Calories: {calories}</p>',
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