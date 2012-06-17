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
        pageSize:100,
        purgePageCount:0,
        proxy:{
            type:'ajax',
            url:'clients.json',
            reader:{
                type:'json',
                root:'data'
            }
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        store:store,
        title:'Clients (Infinite scrolling)',
        flex:1,
        verticalScrollerType:'paginggridscroller', //step 1
        invalidateScrollerOnRefresh:false, //step 2
        disableSelection:true, //step 3
        columns:[
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'Clent : {name} {lastname}'
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