/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.Loader.setPath({
	'Ux':'app/Ux'
});
Ext.application({
    name: 'MyApp',

	requires:['MyApp.view.Container','MyApp.view.DropContainer'], 
	stores:[],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			title:'Drag and Drop',
			autoScroll:true,			
			layout		: {
				type 	: "hbox",
				align	: "stretch"
			},
			defaults:{
				margin:'3'
			},
			items:[{
					xtype 	: 'dnd.container',
					flex  	: 1
			},{
					xtype 		: 'drop.container',
					dropGroup	: 'invoicesDnDGroup',
					flex		: 1
			}]
		}).show();
    }
});