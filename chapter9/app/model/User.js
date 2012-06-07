/**
 * @class App.model.User
 * @extends Ext.data.Model
 * The definition of our user model
 * iam@armando.mx
 * @manduks
 */
Ext.define('App.model.User', {
    extend: 'Ext.data.Model',
    fields:[			
		{name:'id', type:'int'},
		'avatar','firstName', 'twitter_account','lastName',
		{name:'active', type:'boolean' }
	],
	proxy: {
		type: 'ajax',
		url : 'data/users.json',
		reader:{
			type:'json',
			root:'data'
		}
	}	
});