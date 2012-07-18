/**
 * @class InvoicesMobile.model.Invoice
 * @extends Ext.data.Model
 * @author Armando Gonzalez <iam@armando.mx>
 * The invoice model definition
 */
Ext.define('InvoicesMobile.model.Invoice', {
    extend: 'Ext.data.Model',
	config :{
		fields 	: 	[
			{name:'name', type:'string'},
			{name:'date', type:'date', dateFormat: 'm/d/Y'}
		],
	    proxy	: {
	            type	: 'ajax',
	            url 	: 'serverside/invoices/list.json',
				reader	: {
					type	: 'json',
					rootProperty	: 'data'
				}
	    }
	}   
});