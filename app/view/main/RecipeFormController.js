    // Not used anymore
    // work on this to call it as an xtype
    Ext.define('frontend_recipe.controller.RecipeFController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.recipeformcontroller',
        
        onSaveClick: function() {
            Ext.getBody().mask('Please wait...', 'loading-mask');
            var form = this.getView().getForm();
            var formwindow = this.getView().up('window');
            debugger;
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                       if (action.result.success) {
                        Ext.Msg.alert('Success', result.msg);
                      } else {
                        Ext.Msg.alert('Failure', result.msg);
                      }
                       Ext.getCmp('RecipeGridID').getStore().reload();
                       formwindow.close();
                       Ext.getBody().unmask();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                        Ext.getBody().unmask();
                    }
                });
            }else{
                Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
                Ext.getBody().unmask();
            }
        },
        
        onCancelClick: function() {
            this.getView().up('window').close();
        },
    
        onUpdateClick: function() {
            Ext.getBody().mask('Please wait...', 'loading-mask');
            var form = this.getView().getForm();
            var formwindow = this.getView().up('window');
            debugger;
            var record = form.getValues();
                if (form.isValid()) {
                    Ext.Ajax.request({
                        url: 'https://localhost:7270/api/recipe/' + record.recipeId,
                        method: 'PUT',
                        jsonData: record,
                        success: function(response) {
                            debugger
                            var result = Ext.decode(response.responseText);
                            if (result.success) {
                                Ext.Msg.alert('Success', result.msg);
                              } else {
                                Ext.Msg.alert('Failure', result.msg);
                              }
                            Ext.getCmp('RecipeGridID').getStore().reload();
                            formwindow.close();
                            Ext.getBody().unmask();
                        },
                        failure: function(response) {
                            debugger
                            var result = Ext.decode(response.responseText);
                            Ext.Msg.alert('Error', result.msg ?? result.title);
                            Ext.getBody().unmask();
                        }
                    });
                } else {
                    Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
                    Ext.getBody().unmask();
                }
        }
    
    });
    
        