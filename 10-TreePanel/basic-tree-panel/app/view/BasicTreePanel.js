/**
 * @class App.view.BasicTreePanel
 * @extends Ext.tree.Panel
 * This is a basic Tree Panel example.
 */
Ext.define('App.view.BasicTreePanel', {
    extend: 'Ext.tree.Panel',
    xtype:'basictreepanel',
	title:'MVC pattern',
    root: {//define the data of our tree panel
        text:'Application', //the text the node is going to display
		expanded:true, //when the tree render tis node will be expanded by default
		children:[ //the children of our Application node
			{
				text:'app',
				children:[ // each node can have theri own children
					{
						text:'app.js',
						leaf:true //when we set leaf to true, our node will the last in the hierarchy and also its icon will change
					},{
						text:'controller'
					},{
						text:'model'
					},{
						text:'store'
					},{
						text:'view',
						children:[
							{
								text:'BasicTreePanel.js',
								leaf:true
							}
						]
					}
				]
			},{
				text:'data'
			},{
				text:'index.html',
				leaf:true
			},{
				text:'resources',
				children:[
					{
						text:'css'
					},{
						text:'resources'
					}
				]
			}
		]
    }
});