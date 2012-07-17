/**
 * @class MyApp.store.invoices.Invoices
 * @extends Ext.data.Store
 * @author Armando Gonzalez
 * This is the definition of our Invoice store
 */
Ext.define('MyApp.store.invoices.Invoices', {
    extend 		: 'Ext.data.Store',
	requires	: 'MyApp.model.invoices.Invoice',
	model		: 'MyApp.model.invoices.Invoice',
	
    proxy		: {
            type	: 'ajax',
            url 	: 'serverside/invoices/list.json',
			reader	: {
				type	: 'json',
				root	: 'data'
			}
    }
});