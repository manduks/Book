/**
 * @class App.view.TreeStoreTreePanel
 * @extends Ext.tree.Panel
 * This is a tree panel with a tree store configuration.
 */
Ext.define('App.view.TreeStoreTreePanel', {
    extend: 'Ext.tree.Panel',
    xtype:'treestorepanel',
    store:'Files',
	viewConfig:{ //the view config of our tree panel
		plugins:{
			ptype:'treeviewdragdrop' // addigng the drag and drop implementation
		}
	}
});