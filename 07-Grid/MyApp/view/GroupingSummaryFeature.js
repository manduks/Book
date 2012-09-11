/**
 * @class MyApp.view.GroupingSummaryFeature
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This the grouping summary feature example.
 */
Ext.define('MyApp.view.GroupingSummaryFeature', {
    extend: 'Ext.grid.Panel',    
    flex:1,
    title:'Clients',
	features:[ //step 1
        {
            ftype:'groupingsummary',
            groupHeaderTpl:'Group: {name} ({rows.length})'
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
	},
	buildColumns : function(){
		return [
            {
                xtype:'rownumberer'
            },
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'<b>{name} {lastname} </b> (age: {age})</br>{email}</br>',
                summaryType:'count',
                summaryRenderer:function (value) { //step 2
                    return value + ' client' + (value === 1 ? '' : 's');
                }
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
                renderer:Ext.util.Format.usMoney,
                summaryType:'sum',//step 3
                summaryRenderer:Ext.util.Format.usMoney
            },
            {
                text:'Active?',
                xtype:'booleancolumn',
                width:80,
                dataIndex:'active',
                trueText:'YES',
                falseText:'NO'
            }
        ];
	}
});