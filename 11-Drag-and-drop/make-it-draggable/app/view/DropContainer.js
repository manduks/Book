/**
 * @class MyApp.view.DropContainer
 * Ext.Container
 * @author Armando Gonzalez <iam@armando.mx>
 * This the container for the drop zone
 */
Ext.define('MyApp.view.DropContainer', {
    extend: 'Ext.Container',    
   	alias   : 'widget.drop.container',
	style	: {
		backgroundColor:'white'
	},
	dropGroup:undefined,
	afterRender:function(){
		var me = this;
		this.callParent(arguments);
		Ext.create('Ext.dd.DDTarget', me.el, me.dropGroup);
	}
});