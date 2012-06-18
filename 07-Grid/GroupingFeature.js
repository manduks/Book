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

    var clientStore = Ext.create('Ext.data.Store', {
        model:'Client',
        groupField:'country',
        data:[
            {
                client:1,
                name:'David',
                lastname:'Lee', age:24,
                email:'david@email.com',
                country:'China',
                paydate:'08/08/2012',
                amount:120.5,
                active:true
            },
            {
                client:2,
                name:'Lisa',
                lastname:'Brown',
                age:25,
                email:'lisa@email.com',
                country:'Japan',
                paydate:'08/08/2012',
                amount:120.5, active:false
            },
            {
                client:3,
                name:'Armando',
                lastname:'Gonzalez',
                age:30,
                email:'armando@email.com',
                country:'Mexico',
                paydate:'08/28/2012',
                amount:120,
                active:true
            },
            {
                client:4,
                name:'Mike',
                lastname:'Chang',
                age:27,
                email:'mike@email.com',
                country:'Japan',
                paydate:'08/08/2012',
                amount:12.5456,
                active:false
            },
            {
                client:5,
                name:'Kevin',
                lastname:'Smith',
                age:28,
                email:'kevin@email.com',
                country:'Mexico',
                paydate:'08/08/2012',
                amount:54.5,
                active:true
            }
        ]
    });

    var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
        groupHeaderTpl:'Group: {name} ({rows.length})'
    });


    var grid = Ext.create('Ext.grid.Panel', {
        store:clientStore,
        title:'Clients',
        flex:1,
        features:[groupingFeature],
        columns:[
            {
                xtype:'rownumberer'
            },
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'<b>{name} {lastname} </b> (age: {age})</br>{email}</br>'
            },
            {
                text:'Country',
                width:60,
                dataIndex:'country'
            },
            {
                text:'Pay Date',
                xtype:'datecolumn',
                width:80,
                dataIndex:'paydate',
                format:'m-d-Y'
            },
            {
                text:'Total',
                xtype:'numbercolumn',
                width:80,
                dataIndex:'amount',
                renderer:Ext.util.Format.usMoney
            },
            {
                text:'Active?',
                width:80,
                dataIndex:'active',
                trueText:'YES',
                falseText:'NO',
                renderer:function (v) { //step 4
                    var color = v ? 'red' : 'green',
                        v = v ? 'YES' : 'NO';
                    return '<span style="color: ' + color + '"> ' + v + '</span>';
                }
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