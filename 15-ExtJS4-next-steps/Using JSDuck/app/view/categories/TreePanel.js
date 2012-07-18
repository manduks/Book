/**
 * @class MyApp.view.categories.TreePanel
 * @extends Ext.tree.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the definition of the categories tree panel
 */
Ext.define('MyApp.view.categories.TreePanel', {
    extend 		: 'Ext.tree.Panel',
    alias       : 'widget.categories.tree',
	requires	: [
		'Ext.tree.plugin.TreeViewDragDrop'
	],
	border		: false,
    store		:'categories.Categories',
	tbar		: [{
		text: 'Add',
		iconCls: 'new-icon16',
		menu:{	
			items : {
				xtype:'categories.form'
			}
		}
	},{
		text:'Delete',
		iconCls:'delete-icon16',
		itemId: 'deletebtn'
	}],	
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
			ddGroup: 'invoicesDDGroup'
		}
	}
});