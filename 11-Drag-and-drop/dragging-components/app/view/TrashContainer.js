/**
 * @class MyApp.view.TrashContainer
 * @extends Ext.Container
 * @author Armando Gonzalez <iam@armando.mx>
 * The trash container for the drag-and-drop operation
 */
Ext.define('MyApp.view.TrashContainer', {
    extend: 'Ext.Container',
    alias   : 'widget.trashcontainer',
    style	: {
		backgroundColor:'#EEE'
	},
	padding:'50 0 0 70',
	html :[
		'<div class = "file">',
			'<img src="resources/images/recycle.png"  height="128" width="128">',
		'</div>'
	].join(),
	dropGroup:'filesDDGroup',
	afterRender:function(){
		this.callParent(arguments);
		var me = this, dropTarget = me.el.dom;
		Ext.create('Ext.dd.DropTarget', dropTarget, {
		        ddGroup: 'filesDDGroup',
		        notifyEnter: function(ddSource, e, data) { //when the drag object enters the form panel
		            me.el.stopAnimation();
		            me.el.highlight();
		        },
		        notifyDrop  : function(ddSource, e, data){
					Ext.Msg.alert('Ext JS','Item deleted.');
		        }
		    });
	}
});