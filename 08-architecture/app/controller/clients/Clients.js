/**
 * @class MyApp.controller.clients.Clients
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The client's controller, in here we define all the needed login for the client's module
 */

Ext.define('MyApp.controller.clients.Clients',{
	extend      : 'Ext.app.Controller',
	models		: [
		'clients.Client'
	],
	stores		: [
		'clients.Clients'
	],
	views		: [
		'clients.ClientForm',
		'clients.ClientsGrid',
		'clients.MainContainer'
	],

	init   : function(){
		var me = this;

		me.addContent();
	},

	addContent	: function(){
		this.container.add({
			xtype : 'clients.main'
		});
	}
});