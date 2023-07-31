Ext.define('frontend_recipe.view.RecipeFormCreate', {
    extend: 'Ext.form.Panel',
    xtype: 'recipeformcreate',
    controller: 'recipeformcontroller',
    bodyPadding: 10,
    defaultType: 'textfield',
    url: 'https://localhost:7270/api/recipe/',
    
    items: [{
        fieldLabel: 'Title',
        name: 'title',
        allowBlank: false,
        validator: function(value) {
            // Validate that the value is not empty
            if (!value) {
                return 'Title cannot be empty';
            }
            
            // Validate that the value is not an integer
            if (/^\d+$/.test(value)) {
                return 'Title cannot be an integer';
            }
            
            // Validation passed
            return true;
        }
    }, {
        xtype: 'textareafield',
        fieldLabel: 'Description',
        name: 'description',
        allowBlank: false,
        maxRows: 2
    },{
        fieldLabel: 'Prep Time (min)',
        name: 'preparationtime',
        allowBlank: false,
        msgTarget: 'under', // location of the error message
        invalidText: 'Please enter the prep time in minutes eg: 60',
        validator: function(value) {
            // Validate that the value is an integer
            return /^\d+$/.test(value) || this.invalidText;
        }
    },
    {   
        xtype: 'combobox',
        fieldLabel: 'Author',
        displayField: 'name',
        // valueField: 'userid',
        name: 'author',
        store: {
            type: 'user',
        },
        allowBlank: false
    },
    {   
        xtype: 'combobox',
        fieldLabel: 'Type',
        displayField: 'name', //Shown in the combobox
        // valueField: 'categoryid', //Corresponding displayfield Id submitted
        name: 'type',
        store: {
            type: 'mealtype',
        },
        allowBlank: false
    },
    {
        xtype: 'numberfield',
        fieldLabel: 'Number of Steps',
        name: 'recipesteps',
        minValue: 1,
        maxValue: 100
    },
    {
        xtype: 'tagfield',
        fieldLabel: 'Select country tag(s)',
        store: {
            type: 'countrytags'
        },
        displayField: 'Name',
        valueField: 'Id',
        filterPickList: true,
        queryMode: 'local',
        name: 'countrytags'
    },{
        xtype: 'textareafield',
        fieldLabel: 'Instructions',
        name: 'instructions',
        allowBlank: false,
        maxRows: 2
    },
    {
        xtype: 'filefield',
        emptyText: 'Select an image',
        fieldLabel: 'Photo',
        name: 'photo-path',
        buttonConfig: {
            text: '',
            iconCls: 'file-uploads-image-add'
        },
        listeners: {
            change: function (field, value) {
                debugger
                var form = field.up('form');
                var file = field.fileInputEl.dom.files[0];
                var reader = new FileReader();

                reader.onload = function (e) {
                    form.imageData = e.target.result;
                };

                if (file) {
                    reader.readAsDataURL(file);
                }
            }
        }
    }]
});