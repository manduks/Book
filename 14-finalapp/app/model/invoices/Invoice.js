/**
 * @class MyApp.model.invoices.Invoice
 * @extends Ext.data.Model
 * @author Armando Gonzalez <iam@armando.mx>
 * The invoice model definition
 */
Ext.define('MyApp.model.invoices.Invoice', {
    extend: 'Ext.data.Model',
    fields:[
		{name:'name', type:'string'},
		{name:'date', type:'date', dateFormat: 'm/d/Y'},
		{name:'leaf', type:'boolean'}
	]
});