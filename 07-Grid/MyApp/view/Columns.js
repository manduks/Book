/**
 * @class MyApp.view.Columns
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This the columns grid panel example.
 */
Ext.define('MyApp.view.Columns', {
    extend: 'Ext.grid.Panel',
    
    width:700,
    height:180,
    title:'Clients',

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
	},
	buildColumns : function(){
		return [
            {
                xtype:'rownumberer' //step 1
            },
            {
                text:'Name',
                xtype:'templatecolumn', //step 2
                flex:1,
                dataIndex:'name',
                tpl:'<b>{name} {lastname} </b> (age: {age})</br>{email}' //step 3
            },
            {
                text:'Country',
                width:80,
                dataIndex:'country'
            },
            {
                text:'Pay Date',
                xtype:'datecolumn', //step 4
                width:80,
                dataIndex:'paydate',
                format:'m-d-Y'
            },
            {
                text:'Total',
                xtype:'numbercolumn', //step 5
                width:80,
                dataIndex:'amount'
            },
            {
                text:'Active?',
                xtype:'booleancolumn', //step6
                width:80,
                dataIndex:'active',
                trueText:'YES',
                falseText:'NO'
            },
            {
                xtype:'actioncolumn', //step 7
                width:40,
                items:[
                    //step 8
                    {
                        icon:'images/pencil.png',
                        handler:function () {
                            alert('edit');
                        }
                    },
                    {
                        icon:'images/cross.png',
                        handler:function () {
                            alert('delete');
                        }
                    }
                ]
            }
        ];
	}
});

