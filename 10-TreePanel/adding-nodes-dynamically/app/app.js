/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'App',

	controllers:['Main'],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			title:'Ext TreePanel',
			autoScroll:true,
			frame:false,
			layout:'fit',
			items:[{
				xtype:'treestorepanel'
			}]
		}).show();		
    }
});