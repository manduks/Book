/**
 * @class MyApp.view.InfiniteScrolling
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This the infinite grid scrolling example.
 */
Ext.define('MyApp.view.InfiniteScrolling', {
    extend: 'Ext.grid.Panel',  
    title:'Clients (Infinite scrolling)',
	flex:1,
    verticalScrollerType:'paginggridscroller', //step 1
    invalidateScrollerOnRefresh:false, //step 2
    disableSelection:true, //step 3
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
		return   Ext.create('Ext.data.Store', {
	        autoLoad:true,
	        model:'Client',
	        pageSize:100, //step 1	
	        purgePageCount:0, //step 2
	        proxy:{
	            type:'ajax',
	            url:'serverside/clients.json',
	            reader:{
	                type:'json',
	                root:'data'
	            }
	        }
	    });
	},
	buildColumns : function(){
		return [
            {
                text:'Name',
                xtype:'templatecolumn',
                flex:1,
                dataIndex:'name',
                tpl:'Clent : {name} {lastname}'
            }
        ];
	}
});