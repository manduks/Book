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
		'clients.Client'//,
		//'MyApp.model.clients.Client' //Same as the line 12
	],
	stores		: [
		'clients.Clients'
	],
	views		: [
		'clients.ClientForm',
		'clients.ClientsGrid',
		'clients.MainContainer'
	],

	refs	: [{
		ref			: 'clientForm',
		selector	: '#maintabs #clientmain form'
	}],

	init   : function(){
		var me = this;

		me.control({
			'#maintabs #clientmain grid' : {
				itemdblclick : me.loadForm
			},
			'#maintabs #clientmain form button[action=save]' : {
				click : me.save
			},
			'#maintabs #clientmain form button[action=new]' : {
				click : me.clearForm
			},
			'#maintabs #clientmain form button[action=delete]' : {
				click : me.remove
			}
		});
	},

	remove		: function(){
		var me = this,
			form = me.getClientForm(),//me.container.down('form'),
			id = form.getForm().getValues().id;

		Ext.Msg.confirm('Confirm','Are you sure that you want to delete this client?',function(btn){
			if(btn === 'yes'){
				Ext.Ajax.request({
					url		: 'serverside/clients/delete',
					params	: {id:id},
					success : function(response){
						var grid = me.container.down('grid'),
							record = grid.getStore().getById(id);

						grid.getStore().remove(record);
						form.getForm().reset();
					}
				});
			}
		});
	},

	clearForm	: function(){
		var form = this.getClientForm();//this.container.down('form');

		form.getForm().reset();
	},

	save		: function(){
		var form = this.getClientForm();//this.container.down('form');

		Ext.Ajax.request({
			url : 'serverside/clients/save',
			params : form.getForm().getValues(),
			success: function(response,options){
				var data = Ext.decode(response.responseText);
				
				Ext.Msg.alert('Alert',data.message);
			}
		});
	},

	loadForm	: function(grid,record,item,index,event,options){
		var form = this.getClientForm();//this.container.down('form');

		form.getForm().loadRecord(record);
	},

	addContent	: function(){
		this.container.add({
			xtype : 'clients.main',
			itemId: 'clientmain'
		});
	}
});