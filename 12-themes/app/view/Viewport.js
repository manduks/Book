/**
 * @class MyApp.view.Viewport
 * @extends Ext.container.Viewport
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The main viewport for our application
 */

Ext.define('MyApp.view.Viewport',{
    extend      : 'Ext.container.Viewport',
    requires	: [
		'Ext.tab.Panel',
		'Ext.window.MessageBox'
    ],
    
    layout		: 'fit',

    initComponent   : function(){
        var me = this;
        
        me.items = [{
			xtype : 'panel',
			layout: 'fit',
			dockedItems : [{
				xtype : 'toolbar',
				docked: 'top',
				itemId: 'mainmenu',
                ui    : 'maintoolbar',
				items : [{
					text : 'Start',
					iconCls : 'home-icon16',
					itemId  : 'startbutton',
					menu	: [
						{text:'Clients',iconCls:'clients-icon16',controller:'MyApp.controller.clients.Clients'},
						{text:'Invoices',iconCls:'invoices-icon16',controller:'MyApp.controller.invoices.Invoices'},
						{text:'Categories',iconCls:'categories-icon16',controller:'MyApp.controller.categories.Categories'}
					]
				},{
					xtype: 'tbfill'
				},{
					text : 'John Doe',
                    
					icon : 'resources/images/user_suit.png'
				}]
			}],
			items : {
				xtype : 'tabpanel',
				itemId: 'maintabs',
				border: false,
				hidden: true,
                bodyBorder:false
			}
        }];

        me.callParent();
    }
});