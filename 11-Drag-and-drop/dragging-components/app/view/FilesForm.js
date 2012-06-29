/**
 * @class MyApp.view.FilesForm
 * @extends Ext.form.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * The files form
 */
Ext.define('MyApp.view.FilesForm', {
    extend: 'Ext.form.Panel',
	alias: 'widget.filesform',
	bodyPadding	: 5,
    defaultType	: 'textfield',
	initComponent:function(){
		var me = this;
		me.items = me.buildItems();
		this.callParent(arguments);
	},
	afterRender:function(){
		this.callParent(arguments);
		var me = this, dropTarget = me.body.dom;
		Ext.create('Ext.dd.DropTarget', dropTarget, {
		        ddGroup: 'filesDDGroup',
		        notifyEnter: function(ddSource, e, data) { //when the drag object enters the form panel
		            me.body.stopAnimation();
		            me.body.highlight();
		        },
		        notifyDrop  : function(ddSource, e, data){
		            var selectedRecord = ddSource.dragData.records[0]; //get the selected record		            
		            me.getForm().loadRecord(selectedRecord); // Load the record into the form		           
		            return true;
		        }
		    });
	},
	buildItems:function(){
		return [{
			fieldLabel  : 'Name',
	        name        : 'name'
		},{
			fieldLabel  : 'Owner',
	        name        : 'owner'
		},{
			xtype		: 'datefield',
			fieldLabel	: 'Created at',
			name		: 'created_at'
		}];
	}
});