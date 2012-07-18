/**
 * @class InvoicesMobile.store.Invoices
 * @extends Ext.data.Store
 * @author Armando Gonzalez
 * This is the definition of our Invoices store
 */
Ext.define('InvoicesMobile.store.Invoices', {
    extend 		: 'Ext.data.Store',
	requires	: 'InvoicesMobile.model.Invoice',
	
	config :{
		model		: 'InvoicesMobile.model.Invoice',
		autoLoad	: true
	}
});