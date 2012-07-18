/**
 * @class MyApp.view.categories.CategoriesForm
 * @extends Ext.form.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * <p>The categories form panel</p>
 */
Ext.define('MyApp.view.categories.CategoriesForm', {
    extend  	: 'Ext.form.Panel',
    alias       : 'widget.categories.form',

	/**
	* @cfg {Boolean} border True to display the panel´s borders(defaults to <tt>false</tt>).
	*/
    border		: false,
	/**
	* @cfg {Boolean} frame This renders a plain 1px square borders (defaults to <tt>true</tt>).
	*/
	frame		: true,
	
	// private
	initComponent   : function(){
		var me = this;
		me.items = me.buildItems();
		me.buttons = me.buildButtons();
		me.callParent();
	},
	
	/**
	 * This method returns the items the form will have.
	 * @return {Array} The fields which this Form contains.
	 */
	buildItems : function(){		
		return [{
			fieldLabel	: 'Name',
			name		: 'name',
			xtype		: 'textfield',
		}];
	},
	
	/**
	 * This method returns the buttons the form will have.
	 * @return {Array} The Buttons this Form contains.
	 */
	buildButtons:function(){
		return [{
	            text: 'Save',
				itemId: 'savebtn'
	        }];
	}
});