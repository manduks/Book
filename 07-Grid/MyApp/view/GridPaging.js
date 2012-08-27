/**
 * @class MyApp.view.GridPaging
 * @extends Ext.grid.Panel
 * @author Armando Gonzalez <iam@armando.mx>
 * This the grid paging example.
 */
Ext.define('MyApp.view.GridPaging', {
    extend: 'Ext.grid.Panel',    
    flex:1,
    title:'Clients',
	initComponent: function() {
		var me = this;
	    me.createModel();
		me.columns = me.buildColumns();
		me.store =  me.buildStore();
		me.dockedItems= me.buildDockedItems();	  
	   this.callParent(arguments);
	},
	buildDockedItems : function(){
		return [
            {
                xtype:'pagingtoolbar',
                dock:'bottom',
                store:this.store,
                displayInfo:true
            }
        ];
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
		return  Ext.create('Ext.data.Store', {
	        autoLoad:true,
	        model:'Client',
	        pageSize:10,
	        proxy:{
	            type:'ajax',
	            url:'serverside/clients.json',
	            reader:{
	                type:'json',
	                root:'data',
	                totalProperty:'num'
	            }
	        }
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
                tpl:'Clent : {name} {lastname}'
            }
        ];
	}
});