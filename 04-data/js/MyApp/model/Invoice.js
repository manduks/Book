/**
 * @class MyApp.model.Invoice
 * @extends Ext.data.Model
 * The invoice model
 */

Ext.define('MyApp.model.Invoice',{
    extend	: 'Ext.data.Model',

    idProperty	: 'idInvoice',
    fields	: [
		{name:'idInvoice'},
		{name:'taxId'},
		{name:'dateIssued',type:'date',dateFormat:'Y-m-d h:i:s'},
		{name:'name'},
		{name:'address',type:'string'},
		{name:'creditCard'}
    ],
    /*
    //Fields for the XML reader with mapping
    fields	: [
		{name:'idInvoice',mapping:'@id'},
		{name:'taxId'},
		{name:'dateIssued',type:'date',dateFormat:'Y-m-d h:i:s',mapping:'date'},
		{name:'name',mapping:'client'},
		{name:'address',type:'string',mapping:'addr'},
		{name:'creditCard'}
    ],
    */

    validations	: [
		{type:'presence',field:'taxId'},
		{type:'creditcard',field:'creditCard'},
		{type:'length',field:'taxId',min:5,max:7},
		{type:'presence',field:'name'},
		{type:'format',field:'name',matcher:/^[\w ]+$/}
    ],

    hasMany	: [
		{model:'MyApp.model.Item',name:'getItems'}
    ]
});