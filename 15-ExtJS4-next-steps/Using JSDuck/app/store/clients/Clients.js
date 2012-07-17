/**
 * @class MyApp.store.clients.Clients
 * @extends Ext.data.Store
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * A collection of clients, this store will make an ajax request to retrieve clients from
 * the server in JSON format.
 */

Ext.define('MyApp.store.clients.Clients',{
	extend      : 'Ext.data.Store',
	alias       : 'store.clients',
	model		: 'MyApp.model.clients.Client',

	proxy		: {
		type	: 'ajax',
		url		: 'serverside/clients/list',
		reader	: {
			type	: 'json',
			root	: 'data'
		}
	}
});