/**
 * @class MyApp.Category
 * @extends Ext.data.Model
 * @autor Crysfel Villa
 * @date Thu Nov 24 23:27:58 CET 2011
 *
 * The invoice category model
 *
 *
 **/

Ext.define("MyApp.Category",{
	extend	: "Ext.data.Model",
	
	fields	: [
		{name:"id"},
		{name:"name"},
		{name:"description"}
	]
	
});