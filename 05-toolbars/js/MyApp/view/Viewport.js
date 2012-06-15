/**
 * @class MyApp.view.Viewport
 * @extends Ext.container.Viewport
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Description
 */

Ext.define('MyApp.view.Viewport',{
    extend      : 'Ext.container.Viewport',
    
    layout		: 'fit',

    initComponent   : function(){
        var me = this;
        
        me.items = [{
			xtype : 'panel',
			dockedItems : [{
				xtype : 'toolbar',
				docked: 'top',
				items : [{
					text : 'Start',
					iconCls : 'home-icon16',
					menu	: [
						{text:'Clients',iconCls:'clients-icon16'},
						{text:'Invoices',iconCls:'invoices-icon16'},
						{text:'Categories',iconCls:'categories-icon16'}
					]
				},{
					xtype: 'tbfill'
				},{
					text : 'John Doe',
					icon : 'images/user_suit.png'
				}]
			}]
        }];

        me.callParent();
    }
});