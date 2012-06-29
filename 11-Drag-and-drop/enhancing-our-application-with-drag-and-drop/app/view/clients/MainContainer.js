/**
 * @class MyApp.view.clients.MainContainer
 * @extends Ext.container.Container
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The main container that uses a border layout.
 */

Ext.define('MyApp.view.clients.MainContainer',{
	extend      : 'Ext.container.Container',
	alias       : 'widget.clients.main',
	requires	: [
		'Ext.layout.container.Border',
		'Ext.resizer.BorderSplitterTracker'
	],

	layout		: 'border',

	initComponent   : function(){
		var me = this;

		me.items = [{
			xtype : 'clients.grid',
			region: 'center'
		},{
			xtype : 'clients.form',
			width : 300,
			region: 'east',
			split : true,
			collapsible : true
		}];

		me.callParent();
	}
});