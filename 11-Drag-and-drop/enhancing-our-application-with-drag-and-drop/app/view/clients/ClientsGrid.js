/**
 * @class MyApp.view.clients.ClientsGrid
 * @extends Ext.grid.Panel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The client's grid
 */

Ext.define('MyApp.view.clients.ClientsGrid',{
	extend      : 'Ext.grid.Panel',
	alias       : 'widget.clients.grid',
	requires	: [
		'Ext.view.TableChunker',
		'Ext.selection.RowModel',
		'Ext.grid.column.Column'
	],

	border		: false,
	
	initComponent   : function(){
		var me = this;

		me.store = me.buildStore();
		me.columns = me.buildColumns();

		me.callParent();

		me.store.load();
	},

	buildColumns	: function(){
		return [
			{text:'Name',dataIndex:'name',flex:1},
			{text:'Contact',dataIndex:'contact',flex:1},
			{text:'Address',dataIndex:'address',flex:1},
			{text:'Phone',dataIndex:'phone'}
		];
	},

	buildStore	: function(){
		return Ext.create('MyApp.store.clients.Clients');
	}
});