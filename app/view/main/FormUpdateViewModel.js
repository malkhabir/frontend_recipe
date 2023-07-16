
Ext.define('frontend_recipe.view.main.FormUpdateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formupdateviewmodel',
  
    stores: {
        countStore: {
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: 'https://localhost:7270/api/combobox/numberofsteps?recipeid=${recipeId}', // Replace with your actual API endpoint
            reader: {
              type: 'json',
              rootProperty: 'count'
            }
          }
        }
      },
    
      formulas: {
        count: function(get) {
            debugger
          var countStore = get('countStore');
          if (countStore && countStore.getCount() > 0) {
            return countStore.getAt(0).get('count');
          }
          return null;
        }
      }
});


  