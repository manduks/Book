

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
			width:200,
			height:200,
			items:[{
				xtype:'usersview'
			}]
		}).show();  
    }
});