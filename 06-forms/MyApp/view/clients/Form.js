/**
 * @class MyApp.view.clients.Form
 * @extends Ext.form.Panel
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * The client form
 */

Ext.define('MyApp.view.clients.Form',{
    extend      : 'Ext.form.Panel',
    alias       : 'widget.clientform',

    title		: 'Client form',
    bodyPadding	: 5,
    defaultType	: 'textfield',

    initComponent   : function(){
        var me = this;

        me.items = me.buildItems();

        me.dockedItems = me.buildToolbars();
        
        me.callParent();
    },

    buildItems      : function(){
        return [{
            fieldLabel  : 'Name',
            name        : 'name'
        },{
            fieldLabel  : 'Contact',
            name        : 'contact'
        },{
            xtype       : 'textarea',
            fieldLabel  : 'Address',
            name        : 'address'
        },{
            fieldLabel  : 'Phone',
            name        : 'phone'
        }];
    },

    buildToolbars    : function(){
        return [{
            xtype   : 'toolbar',
            docked  : 'top',
            items   : [{
                text    : 'New',
                iconCls : 'new-icon'
            },{
                text    : 'Save',
                iconCls : 'save-icon'
            },{
                text    : 'Delete',
                iconCls : 'delete-icon'
            }]
        }];
    }
});