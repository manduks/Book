/**
 * @class MyApp.Person
 * @autor Crysfel Villa
 * @date Sun Dec  4 13:04:33 CET 2011
 *
 * Abstract class for a person
 *
 *
 **/

Ext.define("MyApp.Person",{
	name		: "",
	lastname	: "",
	nationality : "",
	
	constructor	: function(options){
		Ext.apply(this,options);
	}
});