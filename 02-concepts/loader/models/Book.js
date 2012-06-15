/**
 * @class MyApp.models.Book
 * @extends Ext.data.Model
 * @autor Crysfel Villa
 * @date Mon Dec  5 10:28:26 CET 2011
 *
 * Description
 *
 *
 **/

Ext.define("MyApp.models.Book",{
	extend	: "Ext.data.Model",
	
	fields	: ["id","title","author","description","pages"]
});