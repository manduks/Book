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
				
				controller.container = me.createContainer(menuoption);
				maintabs.add(controller.container);
				controller.addContent();

				me.application.controllers.add(controller);
				controller.init(me.application);
				controller.onLaunch(me.application);
			}else{
				if(controller.container.isDestroyed){
					controller.container = me.createContainer(menuoption);
					maintabs.add(controller.container);
					controller.addContent();
				}
			}

			maintabs.show();
			controller.container.show();
		});
	},

	createContainer : function(menuoption){
		return Ext.widget({
			xtype		: 'container',
			title		: menuoption.text,
			iconCls		: menuoption.iconCls,
			closable	: true,
			layout		: 'fit'
		});
	}
});