/**
 * @class MyApp.view.FilesTreePanel
 * @extends Ext.tree.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This is a tree panel with a tree store configuration.
 */
Ext.define('MyApp.view.FilesTreePanel', {
    extend: 'Ext.tree.Panel',
	alias   : 'widget.filestreepanel',
    store	: 'TreeFiles',
	columns:[{
		xtype:'treecolumn',
		text:'File name',
		flex:1,
		sortable:true,
		dataIndex:'name'
	}],
	viewConfig:{ //drag and rop configuration
		plugins:{
			ptype:'treeviewdragdrop',
			ddGroup: 'filesDDGroup'
		}
	}
});