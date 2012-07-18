/**
 * @class InvoicesMobile.view.invoices.List
 * @extends Ext.List
 * @author Armando Gonzalez
 * This is the definition of our Invoices list
 */
Ext.define('InvoicesMobile.view.invoices.List', {
    extend: 'Ext.List',
	xtype:'invoiceslist',
    
	requires :['Ext.plugin.PullRefresh','Ext.plugin.ListPaging'],

    config: {
        store:'Invoices',
		masked:{
		    xtype: 'loadmask',
		    message: 'loading ...'
		},
		scrollable: {
		    direction: 'vertical',
		    directionLock: true
		},
		plugins: [
            'pullrefresh',
            {
                type: 'listpaging',
                autoPaging: true
            }
        ],
		itemTpl:[
				'<tpl for =".">',
					'<div class="invoice">',
						'<div class="img">',
							'<img src="resources/images/invoice64.png">',
						'</div>',
						'<div class="content">',					
							'{name}</br>',
							'<spam>{[Ext.util.Format.date(values.date)]}</spam>',
						'</div>',
				    '</div>',
				'</tpl>'].join(''),
    }
});