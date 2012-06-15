/**
 * @class MyApp.store.Invoices
 * @extends Ext.data.Store
 * Description
 */
Ext.define('MyApp.store.Invoices',{
    extend	: 'Ext.data.Store',
    model	: 'MyApp.model.Invoice',

	//Ajax proxy with JSON reader and writer
    proxy	: {
		type	: 'ajax',
		//url		: 'serverside/invoices.json',
		api		: {
			create	: 'serverside/save',
			read	: 'serverside/invoices.json',
			update	: 'serverside/update',
			destroy	: 'serverside/remove'
		},
		reader	: {
			type	: 'json',
			root	: 'data'
		},
		writer	: {
			type	: 'json',
			allowSingle	: false
		}
    }
/*
    //Ajax proxy with XML reader and writer
    proxy	: {
		type	: 'ajax',
		url		: 'serverside/invoices-2.xml',
		reader	: {
			type	: 'xml',
			root	: 'data',
			record	: 'invoice'
		},
		writer	: {
			type	: 'xml',
			allowSingle	: false
		}
    }
*/

});