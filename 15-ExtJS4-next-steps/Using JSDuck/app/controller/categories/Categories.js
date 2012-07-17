/**
 * @class MyApp.controller.categories.Categories
 * @extends Ext.app.Controller
 * @author Armando Gonzalez <iam@armando.mx>
 *
 * This is the main controller for categories
 */

Ext.define('MyApp.controller.categories.Categories',{
	extend      : 'Ext.app.Controller',
	stores		: [
		'categories.Categories',
		'invoices.Invoices',
		'invoices.Summaries'
	],
	views		: [
		'categories.CategoriesForm',
		'categories.TreePanel',
		'categories.MainContainer',
		'invoices.Dataview',
		'invoices.LineChart'
	],
	refs: [{
	        ref: 'treePanel',
	        selector: '#categoriesmain treepanel'
	},{
		ref: 'invoicesSummaries',
        selector: '#categoriesmain #sumaries'
	}],
	init   : function(){
		var me = this;
		me.control({
			'#categoriesmain treepanel #savebtn' : {// we get the save button reference
				click : me.addTreeNode
			},
			'#categoriesmain treepanel toolbar #deletebtn':{// we get the delete button reference
				click : me.deleteTreeNode
			},
			'#categoriesmain treepanel':{// when a folder is selected
				itemclick : me.onNodeClick
			}
		});
		
		me.getCategoriesCategoriesStore().load();
		me.getInvoicesInvoicesStore().load();
	},
	addTreeNode:function(btn){
		var me = this,node,
			tree = me.getTreePanel(),
			selectedNode = tree.getSelectionModel().getSelection()[0] || tree.getRootNode(); //get the root node if there is not selection
					
		node = btn.up('form').getValues();//get the form values
		
		if(selectedNode.isLeaf()){ //insert the node in the parent node
			selectedNode.parentNode.insertChild(0,node);
		}else{//inserting as a child
			selectedNode.insertChild(0,node );
		}
		btn.up('menu').hide();// hide the menu
	},
	deleteTreeNode:function(){
		var me = this,
			tree = me.getTreePanel(),
			node = tree.getSelectionModel().getSelection()[0];
		if(node){
			node.remove(true);
		}else{
			Ext.Msg.alert('Warning', 'Please select a node!');
		}
			
	},
	addContent	: function(){
		this.container.add({
			xtype : 'categories.main',
			itemId: 'categoriesmain'
		});
	},
	onNodeClick : function(){
		var me = this;
		me.getInvoicesSummaries().expand();	
		me.getInvoicesSummariesStore().load();
	}
});