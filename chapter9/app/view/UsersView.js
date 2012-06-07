/**
 * @class App.view.UsersView
 * @extends Ext.view.View
 * This the definition of our users data view
 */

//A BASIC DATA VIEW
/*Ext.define('App.view.UsersView', {
    extend: 'Ext.view.View', //step one
    xtype:'usersview', //step two
    store:'Users', //step three
	emptyText:'No users available', //step four
	tpl:[ //step five
		'<tpl for=".">',
			'<div>{firstName} {lastName}</div>',
		'</tpl>'].join(''),
	
});*/

//HANDLING EVENTS ON THE DATAVIEW
/*Ext.define('App.view.UsersView', {
    extend: 'Ext.view.View',
    xtype:'usersview',
    store:'Users',
	emptyText:'No users available',
	itemSelector: 'div.selector', //step 1
	tpl:[
		'<tpl for=".">',
			'<div class ="selector">', //step 2
				'{firstName} {lastName}',
			'</div>',
		'</tpl>'].join('')
});*/

//ADDING LISTENERS TO THE DATA VIEW
/*Ext.define('App.view.UsersView', {
    extend: 'Ext.view.View',
    xtype:'usersview',
    store:'Users',
	emptyText:'No users available',
	itemSelector: 'div.selector',
	tpl:[
		'<tpl for=".">',
			'<div class ="selector">',
				'{firstName} {lastName}',
			'</div>',
		'</tpl>'].join(''),
	listeners:{
		itemclick:function(view, record, item, index, event, options){			
			Ext.Msg.alert('Ext JS', record.get('firstName')+' '+ record.get('lastName')+' has been selected.');
		}
	}
});*/

//A more complex data view
Ext.define('App.view.UsersView', {
    extend: 'Ext.view.View',
    xtype:'usersview',
    store:'Users',
	emptyText:'No users available',
	itemSelector: 'div.user',
	tpl:[
		'<tpl for =".">',
			'<tpl if="active &gt; 0">',// interrogate if the user is active (step one)
				'<div class="user active">',
			'<tpl else>',
				'<div class="user inactive">',
			'</tpl>',
				'<div class="content">',
					'<img src="resources/images/user48.png"  height="60" width="60">',
				'</div>',					
				'<b>{firstName} {lastName}</b></br>', // render the name of our users (step two)
				'<spam>{twitter_account}</spam>',
		    '</div>',
		'</tpl>'].join(''),
	listeners:{
		itemdblclick:function(view, record, item, index, event, options){//listen to the double click (step three)		
			if(record.get('active')){ // check if the user is active (step four)
				Ext.fly(item).removeCls('active');
				Ext.fly(item).addCls('inactive');				
			}else{
				Ext.fly(item).removeCls('inactive');
				Ext.fly(item).addCls('active');
			}		
			//some server side call
			record.data.active = !record.data.active;		
		}
	}
});


