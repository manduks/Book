/**
 * @class MyApp.layout.Main
 * @extends Ext.panel.Panel
 * @autor Crysfel Villa
 * @date Tue Dec 13 23:45:56 CET 2011
 *
 * The main layout
 *
 *
 **/

Ext.define("MyApp.layout.Main",{
	extend		: "Ext.panel.Panel",
	
	title		: "Main panel",
	layout		: "auto",
	width		: 400,
	height		: 400,
	defaults	: {
		//width		: 400,
		height		: 100,
		collapsible	: true,
		border		: true
	},

	initComponent	: function() {
		var me = this;
		
		me.items = me.buildItems();
        
		me.callParent();
	},
	
	buildItems		: function(){
		return [{
			xtype	: "panel",
			title	: "Menu"
		},{
			xtype	: "panel",
			title	: "Options"
		},{
			xtype	: "panel",
			title	: "Configurations"
		}];
	}
});