/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'App',

	requires:['App.view.BasicTreePanel','App.view.TreeStoreTreePanel'], 
	stores:['Files'],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			title:'Ext TreePanel',
			autoScroll:true,
			frame:false,
			layout:'fit',
			items:[{
				//xtype:'basictreepanel' // adding our tree panel definition to our window (basic tree panel configuration)
				xtype:'treestorepanel'
			}]
		}).show();	
    }
});