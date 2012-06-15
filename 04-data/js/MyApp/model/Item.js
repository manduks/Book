/**
 * @class MyApp.model.Item
 * @extends Ext.data.Model
 * Description
 */
Ext.define('MyApp.model.Item',{
	extend	: 'Ext.data.Model',
	//belongsTo	: 'MyApp.model.Invoice',

	fields	: [
		{name:'quantity',type:'int'},
		{name:'description',type:'string'},
		{name:'unitPrice',type:'float'},
		{name:'subtotal',type:'float'}
	]
});