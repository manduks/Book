/**
 * @class MyApp.models.Movie
 * @extends Ext.data.Model
 * @autor Crysfel Villa
 * @date Mon Dec  5 02:34:42 CET 2011
 *
 * Description
 *
 *
 **/

Ext.define("MyApp.models.Movie",{
	extend	: "Ext.data.Model",
	
	fields	: ["title","director","duration","description"] 
});