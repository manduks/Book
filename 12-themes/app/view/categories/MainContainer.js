/**
 * @class MyApp.view.categories.MainContainer
 * @extends Ext.container.Container
 * @author Armando Gonzalez <iam@armando.mx>
 *
 * The main container that uses a border layout.
 */

Ext.define('MyApp.view.categories.MainContainer',{
	extend      : 'Ext.container.Container',
	alias       : 'widget.categories.main',
	requires	: [
		'Ext.layout.container.Border',
		'Ext.resizer.BorderSplitterTracker'
	],

	layout		: 'border',

	initComponent   : function(){
		var me = this;

		me.items = [{
			xtype : 'invoices.dataview',
			region: 'center'
		},{
			xtype : 'categories.tree',
			width : 300,
			region: 'west',
			split : true,
			collapsible : true
		}];

		me.callParent();
	}
});