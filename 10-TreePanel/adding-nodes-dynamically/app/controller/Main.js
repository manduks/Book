/**
 * @class MyApp.controller.Main
 * @extends Ext.app.Controller
 * @author Armando Gonzalez <iam@armando.mx>
 *
 * The main controller, in here we define all the app logic
 */
Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
	refs: [{
	        ref: 'treePanel',
	        selector: 'treestorepanel'
	    }],
	requires:['App.view.TreeStoreTreePanel','App.view.NodeForm'], 
	stores:['Files'],
	init:function(){
		var me = this;
		me.control({
			'nodeform #savebtn' : {// we get the save button reference
				click : me.addTreeNode
			},
			'treestorepanel toolbar #deletebtn':{// we get the delete button reference
				click : me.deleteTreeNode
			}
		});
		me.getFilesStore().load();		
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
			
	}
});