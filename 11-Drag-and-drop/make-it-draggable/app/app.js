/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'MyApp',

	requires:['MyApp.view.Container'], 
	stores:[],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			title:'Drag and Drop',
			autoScroll:true,
			frame:false,
			layout:'fit',
			items:[{
					xtype : 'dnd.container',
			}]
		}).show();
    }
});