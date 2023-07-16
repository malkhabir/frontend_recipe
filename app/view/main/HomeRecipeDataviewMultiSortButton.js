Ext.define('frontend_recipe.view.main.HomeRecipeDataviewMultiSortButton', {
    extend: 'Ext.button.Button',
    xtype: 'homerecipedataviewmultisortbutton',

    config: {
        direction: "ASC",
        dataIndex: undefined
    },

    /**
     * @event changeDirection
     * Fired whenever the user clicks this button to change its direction
     * @param {String} direction The new direction (ASC or DESC)
     */
    handler: function() {
        this.toggleDirection();
    },

    /**
     * Updates the new direction of this button
     * @param {String} direction The new direction
     */
    updateDirection: function(direction) {
        var dir = direction === 'ASC' ? 'up' : 'down';

        this.setIconCls('x-fa fa-sort-' + dir);
        this.fireEvent('changeDirection', direction);
    },

    /**
     * Toggles between ASC and DESC directions
     */
    toggleDirection: function() {
        this.setDirection(Ext.String.toggle(this.getDirection(), "ASC", "DESC"));
    }
});