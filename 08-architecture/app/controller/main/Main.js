/**
 * @class MyApp.controller.main.Main
 * @extends Ext.app.Controller
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Controller for the main viewport
 */

Ext.define('MyApp.controller.main.Main',{
	extend      : 'Ext.app.Controller',

	init   : function(){
		var me = this;
		
		me.control({
			'#mainmenu #startbutton menuitem' : {
				click : me.openModule
			}
		});
	},

	openModule : function(menuoption){
		var me = this,
			maintabs = Ext.ComponentQuery.query('#maintabs')[0];

		Ext.Msg.wait('Loading...');
		Ext.require(menuoption.controller,function(){
			Ext.Msg.hide();

			var controller = me.application.controllers.get(menuoption.controller);
			
			if(!controller){
				controller = Ext.create(me.application.getModuleClassName(menuoption.controller, 'controller'), {
					id			: menuoption.controller,
					application	: me.application
				});
				
				me.application.controllers.add(controller);
				controller.container = me.createContainer(menuoption.text);
				controller.init(me.application);
				controller.onLaunch(me.application);
				maintabs.add(controller.container);
			}else{
				if(controller.container.isDestroyed){
					controller.container = me.createContainer(menuoption.text);
					maintabs.add(controller.container);
				}
			}

			maintabs.show();
			controller.container.show();
		});
	},

	createContainer : function(title){
		return Ext.widget({
			xtype		: 'container',
			title		: title,
			closable	: true,
			layout		: 'fit'
		});
	}
});