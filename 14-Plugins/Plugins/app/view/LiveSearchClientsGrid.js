/**
 * @class MyApp.view.LiveSearchClientsGrid
 * @extends Ext.ux.LiveSearchGridPanel
 * @author Armando Gonzalez <iam@armando.mx>
 * The live search grid panel for the clients
 */


Ext.define('MyApp.view.LiveSearchClientsGrid', {
    extend: 'Ext.ux.LiveSearchGridPanel',

    alias       : 'widget.livesearchclientsgrid',
	requires	: [
		'Ext.ux.LiveSearchGridPanel',
		'Ext.ux.RowExpander',
		'Ext.ux.grid.Printer'
	],
	border		: false,	
	store 		: 'Clients',
	columnLines: true,
	columns		: [
		{text:'Name',dataIndex:'name',flex:1},
		{text:'Address',dataIndex:'address',flex:1},
		{text:'Phone',dataIndex:'phone'}
	],
	afterRender:function(){ //adding the printing button to the top tool bar
		this.callParent(arguments);
		this.getDockedItems('toolbar')[0].add(this.buildTbar());	
	},
	buildTbar : function(){
		return ['->',{
			text:'Print',
			iconCls:'printer',
			scope:this,
			handler:function(){
				Ext.ux.grid.Printer.print(this);
			}
		}];
	}
});