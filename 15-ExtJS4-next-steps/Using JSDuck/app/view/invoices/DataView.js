/**
 * @class MyApp.view.invoices.Dataview
 * @extends Ext.view.View
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the definition of the invoices data view component
 */
Ext.define('MyApp.view.invoices.Dataview', {
    extend 		: 'Ext.view.View',
   	alias       : 'widget.invoices.dataview',
    store		: 'invoices.Invoices',
	emptyText	:'No invoices available',
	itemSelector: 'div.invoice',
	frame:false,
	style:{
		backgroundColor:'white'
	},
	mixins: { 
		draggable   : 'Ext.ux.DataView.Draggable'
	},
	tpl:[
		'<tpl for =".">',
			'<div class="invoice">',
				'<div class="content">',
					'<img src="resources/images/invoice64.png"  height="60" width="60">',
				'</div>',					
				'<b>{name}</b></br>',
				'<spam>{[Ext.util.Format.date(values.date)]}</spam>',
		    '</div>',
		'</tpl>'].join(''),
	initComponent : function(){
		var me = this;
			this.mixins.draggable.init(this, {
		            ddConfig: {
		                ddGroup: 'invoicesDDGroup'
		            }
		    });
		this.callParent();
	}
});