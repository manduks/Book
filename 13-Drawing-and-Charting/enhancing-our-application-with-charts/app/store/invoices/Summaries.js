/**
 * @class MyApp.store.invoices.Summaries
 * @extends Ext.data.Store
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the definition of our Invoices summary store
 */
Ext.define('MyApp.store.invoices.Summaries', {
	extend: 'Ext.data.Store', 
	fields: ['invoice', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9'],
	autoLoad: true,
    proxy		: {
            type	: 'ajax',
            url 	: 'serverside/invoices/summary.json',
			reader	: {
				type	: 'json',
				root	: 'data'
			}
    }
});