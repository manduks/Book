Ext.define("InvoicesMobile.view.Main", {
    extend: 'Ext.tab.Panel',
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Invoices',
                iconCls: 'home',
                scrollable: true,
				xtype: 'invoiceslist'
            },
            {
                title: 'Users',
                iconCls: 'user'
            }
        ]
    }
});
