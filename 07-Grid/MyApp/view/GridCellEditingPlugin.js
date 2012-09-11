/**
 * @class MyApp.view.GridCellEditingPlugin
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This the cell editing plugin example.
 */
Ext.define('MyApp.view.GridCellEditingPlugin', {
    extend: 'Ext.grid.Panel',    
    flex:1,
    title:'Clients',
	plugins:[
        {
            ptype:'cellediting', //step 1
            clicksToEdit:1
        }
    ],
	initComponent: function() {
		var me = this;
	    me.createModel();
		me.columns = me.buildColumns();
		me.store =  me.buildStore();	  
	   this.callParent(arguments);
	},
	createModel:function(){ //The definition of the client model		
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
	},
	buildStore:function(){  //defining the client`s store
		return Ext.create('Ext.data.Store', {
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
	},
	buildColumns : function(){
		return [
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'<b>{name} {lastname} </b> (age: {age})</br>{email}</br>'
            },
            {
                text:'Country',
                dataIndex:'country',
                editor:{ //step 2
                    xtype:'combo',
                    allowBlank:false,
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
                }
            },
            {
                text:'Pay Date',
                dataIndex:'paydate',
                xtype:'datecolumn',
                format:'m/d/Y',
                editor:{ //step 3
                    xtype:'datefield',
                    allowBlank:false
                }
            }
        ];
	}
});