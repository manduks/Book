/**
 * @class App.view.UsersView
 * @extends Ext.view.View
 * This the definition of our users data view
 */
Ext.define('App.view.UsersView', {
    extend: 'Ext.view.View', //step one
    xtype:'usersview', //step two
    store:'Users', //step three
	emptyText:'No users available', //step four
	tpl:[ //step five
		'<tpl for=".">',
			'<div>{name}</div>',
		'</tpl>'].join('')
});