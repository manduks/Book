/**
 * @class MyApp.view.FilesGrid
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This is our files grid panel
 */
Ext.define('MyApp.view.FilesGrid', {
    extend 	: 'Ext.grid.Panel',
	alias   : 'widget.filesgrid',
    
    store:'Files',
	viewConfig:{
		plugins: { //drag and drop configuration
			ptype: 'gridviewdragdrop',
			ddGroup: 'filesDDGroup'
		}
	},
	columns :[
		{text:'Name',dataIndex:'name',flex:1},
		{text:'Owner',dataIndex:'owner',flex:1},
		{text:'Created at',dataIndex:'created_at',flex:1, renderer:Ext.util.Format.dateRenderer('m/d/Y')}
	]
});