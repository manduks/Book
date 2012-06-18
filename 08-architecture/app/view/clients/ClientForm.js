/**
 * @class MyApp.view.clients.ClientForm
 * @extends Ext.form.Panel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The clients form to collect data
 */

Ext.define('MyApp.view.clients.ClientForm',{
	extend      : 'Ext.form.Panel',
	alias       : 'widget.clients.form',
	requires    : [
		'Ext.form.field.Hidden'
	],

	title		: 'Client form',
	bodyPadding	: 5,
	defaults	: {
		xtype	: 'textfield'
	},

	initComponent   : function(){
		var me = this;

		me.items = me.buildItems();
		me.dockedItems = me.buildToolbars();

		me.callParent();
	},

	buildToolbars : function(){
		return [{
			xtype : 'toolbar',
			docked: 'top',
			items : [
				{text:'New',iconCls:'new-icon16',action:'new'},
				{text:'Save',iconCls:'save-icon16',action:'save'},
				{text:'Delete',iconCls:'delete-icon16',action:'delete'}
			]
		}];
	},

	buildItems : function(){
		return [{
			xtype		: 'hidden',
			name		: 'id'
		},{
			fieldLabel	: 'Name',
			name		: 'name'
		},{
			fieldLabel	: 'Contact',
			name		: 'contact'
		},{
			xtype		: 'textarea',
			fieldLabel  : 'Address',
			name		: 'address'
		},{
			fieldLabel	: 'Phone',
			name		: 'phone'
		}];
	}
});