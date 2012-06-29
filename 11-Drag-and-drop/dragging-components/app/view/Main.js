/**
 * @class MyApp.view.Main
 * @extends Ext.Container
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the main container of our application
 */
Ext.define('MyApp.view.main', {
    extend: 'Ext.Container',
	alias   : 'widget.maincontainer',
    
	layout	: {
		type 	: "hbox",
		align	: "stretch"
	},
    items:[{
			title:'Files tree',
			xtype:'filestreepanel',
			flex  : 1
		},{
			xtype:'panel',
			title:'Files data view',
			flex  : 2,
			layout		: {
				type 	: "vbox",
				align	: "stretch"
			},
			defaults : {
				flex : 1
			},
			items:[{
				xtype : 'filesview'
			},{
				xtype : 'filesgrid',
				title : 'Files grid'
			}]
		},{
			xtype : 'container',
			layout		: {
				type 	: "vbox",
				align	: "stretch"
			},
			defaults : {
				flex : 1
			},
			items:[{
				title 	: 'Files form',
				xtype	: 'filesform',
				flex  : 1
			},{
				xtype:'trashcontainer'
			}]
		}]
});