/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.Loader.setPath({
	'Ext.ux':'ux'
});
Ext.application({
    name: 'MyApp',

	requires:['MyApp.view.ClientsGrid','MyApp.view.LiveSearchClientsGrid','MyApp.view.Map'], 
	stores:['Clients'],// we import our Files store
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			title:'Map',
			autoScroll:true,
			frame:false,
			layout:'fit',
			items:[{				
				//xtype:'clientsgrid'
				//xtype:'livesearchclientsgrid'
				xtype:'map'
			}]
		}).show();
		this.getClientsStore().load(); // load the TreeStore
    }
});