/**
 * @class App.view.FilesTreePanel
 * @extends Ext.tree.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This is a tree panel with a tree store configuration.
 */
Ext.define('App.view.FilesTreePanel', {
    extend: 'Ext.tree.Panel',
    xtype:'filestreepanel',
    store:'Files',
	columns:[{
		xtype:'treecolumn',
		text:'File name',
		flex:1,
		sortable:true,
		dataIndex:'name'
	},{
		text:'Owner',
		flex:1,
		dataIndex:'owner'
	},{
		text:'Creation date',
		flex:1,
		dataIndex:'created_at',
		renderer : Ext.util.Format.dateRenderer('m/d/Y')
	},{
		text:'Size',
		flex:1,
		dataIndex:'size',
		renderer:function(v){
			return  v ? v+ ' KB':'--';
		}
	}]
});