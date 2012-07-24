/**
 * @class MyApp.store.Clients
 * @extends Ext.data.Store
 * @author Armando Gonzalez <iam@armando.mx>
 *
 * A collection of clients, this store will make an ajax request to retrieve clients from
 * the server in JSON format.
 */

Ext.define('MyApp.store.Clients',{
	extend      : 'Ext.data.Store',
	requires 	: ['MyApp.model.Client'],
	model		: 'MyApp.model.Client',

	proxy		: {
		type	: 'ajax',
		url		: 'serverside/clients.json',
		reader	: {
			type	: 'json',
			root	: 'data'
		}
	}
});