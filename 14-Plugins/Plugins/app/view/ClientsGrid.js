/**
 * @class MyApp.view.ClientsGrid
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 *
 * The client's grid
 */

Ext.define('MyApp.view.ClientsGrid',{
	extend      : 'Ext.grid.Panel',
	alias       : 'widget.clientsgrid',
	requires	: [
		'Ext.ux.RowExpander',
		'Ext.ux.grid.Printer'
	],
	border		: false,	
	store 		: 'Clients',
	columns		: [
			{text:'Name',dataIndex:'name',flex:1},
			{text:'Address',dataIndex:'address',flex:1},
			{text:'Phone',dataIndex:'phone'}
		],
	plugins		: [{
			ptype	: 'rowexpander', 	// the row expander plugin definition
			rowBodyTpl	: [				// the second row body template definition
				'<p><b>Name:</b> {name}</p><br>',
			    '<p><b>About:</b> {about}</p>'
			]
	}],
	initComponent: function() {
		var me = this;	    
	  	me.tbar = this.buildTbar();
	    this.callParent(arguments);
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