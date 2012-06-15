/**
 * @class MyApp.music.Song
 * @extends Ext.app.Model
 * @autor Crysfel Villa
 * @date Mon Dec  5 01:49:05 CET 2011
 *
 * Song class
 *
 *
 **/

Ext.define("MyApp.music.Song",{
	extend	: "Ext.data.Model",

	fields	: ["title","duration","description","author"]
});