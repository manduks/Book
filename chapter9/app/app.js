/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'App',
    
    models: ['User'],
	stores:['Users'],
	
	requires:['App.view.UsersView'],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			autoScroll:true,
			frame:false,			
			items:[{
				xtype:'container',
				style:{
					backgroundColor:'white'
				},
				items:[{
					xtype:'usersview'
				}]
			}]
		}).show();	
    }
});