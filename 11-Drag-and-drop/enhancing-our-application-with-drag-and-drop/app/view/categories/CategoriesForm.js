/**
 * @class MyApp.view.categories.CategoriesForm
 * @extends Ext.form.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * The categories form panel
 */
Ext.define('MyApp.view.categories.CategoriesForm', {
    extend  	: 'Ext.form.Panel',
    alias       : 'widget.categories.form',
    border		: false,
	frame		: true,
	initComponent   : function(){
		var me = this;
		me.items = me.buildItems();
		me.buttons = me.buildButtons();
		me.callParent();
	},
	buildItems : function(){		
		return [{
			fieldLabel	: 'Name',
			name		: 'name',
			xtype		: 'textfield',
		}];
	},
	buildButtons:function(){
		return [{
	            text: 'Save',
				itemId: 'savebtn'
	        }];
	}
});