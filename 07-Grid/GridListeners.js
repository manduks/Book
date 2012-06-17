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
    //defining the client`s store
    var clientStore = Ext.create('Ext.data.Store', {
        model:'Client',
        data:[
            {
                client:1,
                name:'David',
                lastname:'Lee', age:24,
                email:'david@email.com',
                country:'China',
                paydate:'08/08/2012',
                amount:120.5,
                active:true },
            {
                client:2,
                name:'Lisa',
                lastname:'Brown',
                age:25,
                email:'lisa@email.com',
                country:'Australia',
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
                amount:120.5,
                active:true },
            {
                client:4,
                name:'Mike',
                lastname:'Chang',
                age:27,
                email:'mike@email.com',
                country:'Japan',
                paydate:'08/08/2012',
                amount:120.5,
                active:false },
            {
                client:5,
                name:'Kevin',
                lastname:'Smith',
                age:28,
                email:'kevin@email.com',
                country:'Usa',
                paydate:'08/08/2012',
                amount:120.5, active:true
            }
        ]
    });
    var grid = Ext.create('Ext.grid.Panel', {
        store:clientStore,
        flex:3,
        title:'Clients',
        columns:[
            {
                xtype:'rownumberer'
            },
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'<b>{name} {lastname} </b> (age: {age})</br>{email}'
            },
            {
                text:'Country',
                width:60,
                dataIndex:'country',
                renderer:function (v) {
                    return '<img src="images/' + v.toLowerCase() + '.png">'; //step 1
                }
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
                renderer:Ext.util.Format.usMoney //step 2
            },
            {
                text:'Active?',
                //xtype:'booleancolumn',//step 3
                width:80,
                dataIndex:'active',
                trueText:'YES',
                falseText:'NO',
                renderer:function (v) { //step 4
                    var color = v ? 'red' : 'green',
                        v = v ? 'YES' : 'NO';
                    return '<span style="color: ' + color + '"> ' + v + '</span>';
                }
            },
            {
                xtype:'actioncolumn',
                width:40,
                items:[
                    {
                        icon:'images/cross.png',
                        handler:function (grid, rowIndex, colIndex) {//step 2
                            var selectionModel = grid.getSelectionModel(), record;
                            selectionModel.select(rowIndex);
                            record = selectionModel.getSelection()[0];
                            alert('You are going to edit ' + record.get('name'));
                        }
                    }
                ]
            }
        ],
        listeners:{ //step 1
            itemclick:function (view, record, htmlItem, index, eventObject, opts) {
                form.loadRecord(record);
            }
        }
    });

    var form = Ext.create('Ext.form.Panel', {
        layout:'anchor',
        title:'client',
        flex:1.5,
        frame:true,
        defaults:{
            anchor:'100%'
        },
        defaultType:'textfield',
        defaults:{
            allowBlank:false
        },
        items:[
            {
                fieldLabel:'Name',
                name:'name'
            },
            {
                fieldLabel:'Last Name',
                name:'lastname'
            },
            {
                fieldLabel:'Age',
                xtype:'numberfield',
                name:'age'
            },
            {
                fieldLabel:'Email',
                name:'email',
                vtype:'email'
            },
            {
                fieldLabel:'Country',
                name:'country',
                xtype:'combobox',
                displayField:'name',
                store:Ext.create('Ext.data.Store', {
                    fields:['name'],
                    data:[
                        {"name":"China"},
                        {"name":"Australia"},
                        {"name":"Mexico"},
                        {"name":"Japan"},
                        {"name":"Usa"}
                    ]
                })
            },
            {
                fieldLabel:'Pay Date',
                xtype:'datefield',
                name:'paydate'
            },
            {
                fieldLabel:'Total',
                xtype:'numberfield',
                name:'amount',
                allowDecimals:true
            },
            {
                fieldLabel:'Active?',
                xtype:'checkbox',
                name:'active'
            }
        ],
        buttons:[
            {
                text:'Reset',
                handler:function () {
                    this.up('form').getForm().reset();
                }
            },
            {
                text:'Save',
                formBind:true,
                disabled:true,
                handler:function () {
                    var selectionModel = grid.getSelectionModel(), record, form = this.up('form');//step 1
                    record = selectionModel.getSelection()[0];
                    record.set(form.getValues());//step 2
                    grid.getView().refresh();//step 3
                }
            }
        ]
    });

    Ext.create('Ext.container.Viewport', {
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items:[grid, form]
    });

});
