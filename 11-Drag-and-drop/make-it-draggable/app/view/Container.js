/**
 * @class MyApp.view.Container
 * @extends Ext.Container
 * @author Armando Gonzalez <iam@armando.mx>
 * This the container of the make it draggable example
 */
Ext.define('MyApp.view.Container', {
    extend 	: 'Ext.Container',
	alias   : 'widget.dnd.container',
	style	: {
		backgroundColor:'white'
	},
    data	: [
		{"id":"1", "name":"Invoice 1", "date":"08/28/2012",},
		{"id":"2", "name":"Invoice 2", "date":"08/28/2012",},
		{"id":"3", "name":"Invoice 3", "date":"08/28/2012",}
	],
	tpl		: [
		'<tpl for =".">',
			'<div class="invoice" id="invoice-{id}">',
				'<div class="content">',
					'<img src="resources/images/invoice64.png"  height="60" width="60">',
				'</div>',					
				'<b>{name}</b></br>',
				'<span>{[Ext.util.Format.date(values.date)]}</span>',
		    '</div>',
		'</tpl>'].join(''),
	afterRender:function(){
		var me = this,container;		
		this.callParent(arguments);	
		container = Ext.get(me.el.id).select('div.invoice'); //we get our invoices objects		
		Ext.each(container.elements, function(el) { // for each invoice object
			//var dd = Ext.create('Ext.dd.DD', el.id, 'invoicesDnDGroup', {
			var dd = Ext.create('Ux.dd.DD', el.id, 'invoicesDnDGroup', {
				isTarget  	: true
			});
		 
		});
	}	
});