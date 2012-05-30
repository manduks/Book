Ext.onReady(function () {
    Ext.define('Client', {
        extend:'Ext.data.Model',
        fields:[
            'name', 'lastname' , 'email', 'country',
            {name:'client', type:'int'},
            {name:'age', type:'int' },
            {name:'active', type:'boolean' },
            {name:'amount', type:'float' },
            'paydate'
        ]
    });
    var store = Ext.create('Ext.data.Store', {
        autoLoad:true,
        model:'Client',
        pageSize:10,
        proxy:{
            type:'ajax',
            url:'clients.json',
            reader:{
                type:'json',
                root:'data',
                totalProperty:'num'
            }
        }
    });
    var grid = Ext.create('Ext.grid.Panel', {
        store:store,
        title:'Clients',
        flex:1,
        columns:[
            {
                xtype:'rownumberer'
            },
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'Clent : {name} {lastname}'
            }
        ],
        dockedItems:[
            {
                xtype:'pagingtoolbar',
                dock:'bottom',
                store:store,
                displayInfo:true
            }
        ]
    });

    Ext.create('Ext.container.Viewport', {
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[grid]
    });
});