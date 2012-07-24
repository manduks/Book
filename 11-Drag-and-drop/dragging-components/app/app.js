/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.Loader.setPath({
	'UX':'app/ux'
});
Ext.Loader.setPath('Ext.ux.DataView', 'app/Ux/DataView'); // setting the us dataview path
Ext.application({
    name: 'MyApp',

	requires:['MyApp.view.main','MyApp.view.FilesTreePanel',
				'MyApp.view.FilesView','MyApp.view.FilesGrid',
				'MyApp.view.FilesForm','MyApp.view.TrashContainer'], 
	stores:['TreeFiles','Files'],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			maximized	: true,
			title		: 'Drag and Drop',
			autoScroll	: true,			
			layout		: 'fit',
			items:[{
				xtype:'maincontainer'
			}]
		}).show();
		//loading our stores
		this.getTreeFilesStore().load();
		this.getFilesStore().load();
    }
});