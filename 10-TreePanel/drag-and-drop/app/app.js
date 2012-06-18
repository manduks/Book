/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'App',

	requires:['App.view.TreeStoreTreePanel'], 
	stores:['Files'],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width:630,
			height:318,
			title:'Ext TreePanel',
			autoScroll:true,
			frame:false,
			layout		: {
				type 	: "hbox",
				align	: "stretch" 
			},
			defaults:{
				flex:1
			},
			items:[{
				xtype:'treestorepanel'
			},{
				xtype:'treepanel',
				viewConfig:{ //the view config of our tree panel
					plugins:{
						ptype:'treeviewdragdrop' // addigng the drag and drop implementation
					}
				},
				root: {
			        text:'Application', 
					expanded:true
				}
			}]
		}).show();
		this.getFilesStore().load(); 
    }
});