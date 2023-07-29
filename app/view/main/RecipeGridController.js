Ext.define('frontend_recipe.controller.RecipeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.recipegridcontroller',

    onAddClick: function() {
        // debugger;
        var window = this.getView().add({
            layout: 'fit',
            xtype: 'formwindow',
            title: 'Add Recipe',
            height: 650,
            width: 500,
            items: [{
                xtype: 'tabpanel',
                reference: 'tabpanel',
                activeTab: 0,
                items: [{
                    title: 'Edit Recipe Meta',
                    layout: 'fit',
                    items: [{
                        xtype: 'recipeformcreate',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        scrollable: 'y',
                        viewModel: {
                            data: {
                                recipe: Ext.create('frontend_recipe.model.Recipe')
                            }
                        }
                    }]
                },
                {
                    title: 'Select ingredients',
                    layout: 'fit',
                    items: [{
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'ingredientselectionview',
                            flex: 1,
                            scrollable: 'y'
                        }]
                    }]
                }]
            }],
            
            dockedItems: [{// Bottom Toolbar buttons for tab1
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    text: 'Back',
                    handler: function() {
                        var tabPanel = this.up('formwindow').down('tabpanel');
                        var activeTab = tabPanel.getActiveTab();
                        var tabIndex = tabPanel.items.indexOf(activeTab);
                        if (tabIndex > 0) {
                            tabPanel.setActiveTab(tabIndex - 1);
                        }
                    }
                },
                {
                    text: 'Next',
                    handler: function() {
                        var tabPanel = this.up('formwindow').down('tabpanel');
                        var activeTab = tabPanel.getActiveTab();
                        var tabIndex = tabPanel.items.indexOf(activeTab);
                        if (tabIndex < tabPanel.items.length - 1) {
                            tabPanel.setActiveTab(tabIndex + 1);
                        }
                    },
                    id: 'nextButton'
                },
                '->', // Adds a spacer to push the buttons to the right
                {
                    text: 'Submit',
                    handler: function() {
                        var formwindow = this.up('formwindow')
                        // Check if the ingredient store is empty
                        debugger
                        var tab2GridStore = tab2.down('grid').getStore().data;
                        if ( tab2GridStore.length == 0 || tab2GridStore.length == undefined) {
                            Ext.Msg.alert('Error', 'Please add ingredients.');
                            return;
                        }
                        var tab1Form = tab1.items.items[0];
                        //var form = this.up('formwindow').down('ingredientselectionview');
                        if (tab1Form.isValid()) {
                            // Submit the form data
                            var formData1 = tab1Form.getValues();
                            var formData2Array = tab2GridStore.items;

                            //Get data from tab2
                            var jsonDataFromTab2 = [];

                            // Iterate over each item in the 'items' array
                            for (var i = 0; i < formData2Array.length; i++) {
                                var ingredientId = formData2Array[i].data.IngredientId;
                                var quantity = formData2Array[i].data.Quantity;

                                var ingredientData = {
                                    IngredientId: ingredientId,
                                    Quantity: quantity
                                };

                                jsonDataFromTab2.push(ingredientData);
                            }
                            

                            var mergedData = Ext.apply({}, formData1, { recipeingredients: jsonDataFromTab2 }); // Merge the form data
                            debugger
                            if (tab1Form.imageData) {
                                mergedData['base64Image'] = tab1Form.imageData;
                            }
                            
                            // Send the mergedData as JSON to the server
                            Ext.getBody().mask('Please wait...', 'loading-mask');
                            Ext.Ajax.request({
                                url: 'https://localhost:7270/api/recipe',
                                method: 'POST',
                                jsonData: mergedData,
                                success: function(response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.success) {
                                        Ext.Msg.alert('Success', result.msg);
                                        Ext.getCmp('RecipeGridID').getStore().reload();
                                        formwindow.close();
                                        Ext.getBody().unmask();
                                      } else {
                                        Ext.Msg.alert('Failure', result.msg);
                                        Ext.getBody().unmask();
                                      }
                                },
                                failure: function(response) {
                                    Ext.Msg.alert('Failure', 'Form submission failed.');
                                    Ext.getBody().unmask();
                                }
                            });
                        } else {
                            Ext.Msg.alert('Error', 'Please fill in all the required fields.');
                        }
                    },
                    id: 'submitButton' // Add an id for easier access
                }]
            }]
            
        });

        var nextButton = Ext.getCmp('nextButton');
        var submitButton = Ext.getCmp('submitButton');
        nextButton.setDisabled(true);
        submitButton.setDisabled(true);
        var tabPanel = window.down('tabpanel');
        var tab1 = tabPanel.items.items[0];
        var tab2 = tabPanel.items.items[1];

        var validateFields = function(field) {
            var activeTab = tabPanel.getActiveTab();
            var currentTabFieldsValid = validateTabFields(activeTab);
            var otherTab = activeTab === tab1 ? tab2 : tab1;
            var otherTabFieldsValid = validateTabFields(otherTab);
            
            nextButton.setDisabled(!currentTabFieldsValid || !otherTabFieldsValid);
            submitButton.setDisabled(!currentTabFieldsValid || !otherTabFieldsValid);
        };
        
        var validateTabFields = function(tab) {
            var fields = tab.query('field');
            var fieldsValid = true;
        
            Ext.each(fields, function(field) {
                if (!field.validate()) {
                    fieldsValid = false;
                    return false;
                }
            });
        
            return fieldsValid;
        };
        
        window.on('afterrender', function() {            
            tabPanel.on('tabchange', validateFields);
            Ext.each(tab1.query('field'), function(field) {
                field.on('change', validateFields);
            });
            Ext.each(tab2.query('field'), function(field) {
                field.on('change', validateFields);
            });
        });

        window.show();
    },
    
    onEditClick: async function() {
        var record = this.getView().getSelectionModel().getSelection()[0];
        var window = this.getView().add({
            layout: 'fit',
            xtype: 'formwindow',
            title: 'Edit Recipe',
            height: 800,
            width: 500,
            items: [{
                xtype: 'tabpanel',
                items: [{
                    title: 'Edit Recipe Meta',
                    layout: 'fit',
                    items: [{
                        xtype: 'recipeformupdate',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        scrollable: 'y'
                    }]
                },
                {
                    title: 'Select ingredients',
                    layout: 'fit',
                    items: [{
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'ingredientselectionview',
                            flex: 1,
                            scrollable: 'y',
                            items: [{
                                xtype: 'grid',
                                flex: 1,
                                store: Ext.create('Ext.data.Store', {
                                    proxy: {
                                        type: 'ajax',
                                        url: 'https://localhost:7270/api/recipeingredients',
                                        reader: {
                                            type: 'json',
                                        },
                                        extraParams: {
                                            recipeId: record.data.recipeId
                                        }
                                    },
                                    fields: ['Name', 'MeasurementUnit', 'IngredientId', 'Quantity'],
                                    autoLoad: true,
                                    
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
                                    clicksToEdit: 1,
                                    autoUpdate: true,
                                }],
                            }]
                        }]
                    }]
                }]
            }],
            dockedItems: [{//Bottom Toolbar buttons for tab 2 
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    text: 'Back',
                    handler: function() {
                        var tabPanel = this.up('formwindow').down('tabpanel');
                        var activeTab = tabPanel.getActiveTab();
                        var tabIndex = tabPanel.items.indexOf(activeTab);
                        if (tabIndex > 0) {
                            tabPanel.setActiveTab(tabIndex - 1);
                        }
                    }
                },
                {
                    text: 'Next',
                    handler: function() {
                        var tabPanel = this.up('formwindow').down('tabpanel');
                        var activeTab = tabPanel.getActiveTab();
                        var tabIndex = tabPanel.items.indexOf(activeTab);
                        if (tabIndex < tabPanel.items.length - 1) {
                            tabPanel.setActiveTab(tabIndex + 1);
                        }
                    },
                    id: 'nextButton'
                },
                '->', // Adds a spacer to push the buttons to the right
                {
                    text: 'Submit',
                    handler: function() {
                        var formwindow = this.up('formwindow')
                        // Check if the ingredient store is empty
                        debugger
                        var tab2GridStore = tab2.down('grid').getStore().data;
                        if ( tab2GridStore.length == 0 || tab2GridStore.length == undefined) {
                            Ext.Msg.alert('Error', 'Please add ingredients.');
                            return;
                        }
                        var tab1Form = tab1.items.items[0];
                        //var form = this.up('formwindow').down('ingredientselectionview');
                        if (tab1Form.isValid()) {
                            // Submit the form data
                            var formData1 = tab1Form.getValues();
                            var formData2Array = tab2GridStore.items;

                            //Get data from tab2
                            var jsonDataFromTab2 = [];

                            // Iterate over each item in the 'items' array
                            for (var i = 0; i < formData2Array.length; i++) {
                                var ingredientId = formData2Array[i].data.IngredientId;
                                var quantity = formData2Array[i].data.Quantity;

                                var ingredientData = {
                                    IngredientId: ingredientId,
                                    Quantity: quantity
                                };

                                jsonDataFromTab2.push(ingredientData);
                            }
                            
                            var mergedData = Ext.apply({}, formData1, { recipeingredients: jsonDataFromTab2 }); // Merge the form data
                            debugger
                            // Send the mergedData as JSON to the server
                            Ext.getBody().mask('Please wait...', 'loading-mask');
                            Ext.Ajax.request({
                                url: 'https://localhost:7270/api/recipe/' + record.data.recipeId,
                                method: 'PUT',
                                jsonData: mergedData,
                                success: function(response) {
                                    var result = Ext.decode(response.responseText);
                                    if (result.success) {
                                        Ext.Msg.alert('Success', result.msg);
                                        Ext.getCmp('RecipeGridID').getStore().reload();
                                        formwindow.close();
                                        Ext.getBody().unmask();
                                      } else {
                                        Ext.Msg.alert('Failure', result.msg);
                                        Ext.getBody().unmask();
                                      }
                                },
                                failure: function(response) {
                                    Ext.Msg.alert('Failure', 'Form submission failed.');
                                    Ext.getBody().unmask();
                                }
                            });
                        } else {
                            Ext.Msg.alert('Error', 'Please fill in all the required fields.');
                            Ext.getBody().unmask();
                        }
                    },
                    id: 'submitButton' // Add an id for easier access
                }]
            }]
            
        });
        debugger
        var tabPanel = window.down('tabpanel');
        var tab1 = tabPanel.items.items[0];
        var tab2 = tabPanel.items.items[1];
        var recipeForm = window.down('recipeformupdate');
        recipeForm.getForm().setValues(record.data);
        window.show();
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
                    url: 'https://localhost:7270/api/recipe/' + record.data.recipeId,
                    method: 'DELETE',
                    success: function(response) {
                        var result = Ext.decode(response.responseText);
                        if (result.success) {
                            Ext.Msg.alert('Success', result.msg);
                            Ext.getBody().unmask();
                          } else {
                            Ext.Msg.alert('Failure', result.msg);
                            Ext.getBody().unmask();
                          }
                        Ext.getCmp('RecipeGridID').getStore().reload();
                    },
                    failure: function(response) {
                        var result = Ext.decode(response.responseText);
                        Ext.Msg.alert('Error', result.msg);
                        Ext.getBody().unmask();
                    }
                });
            } else {

            }
        });
    },
    
    onSelectionChange: function(selectionModel, selectedRecords) {
        var grid = this.getView();
        grid.down('button[text=Edit]').setDisabled(selectedRecords.length !== 1);
        grid.down('button[text=Delete]').setDisabled(selectedRecords.length !== 1);
    }

});
