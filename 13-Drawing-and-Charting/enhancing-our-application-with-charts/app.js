/*
* The main file of the application
*/

Ext.Loader.setConfig({
	enabled:true
});
Ext.Loader.setPath('Ext.ux.DataView', 'ux/DataView'); // setting the us dataview path
Ext.application({
	name				: 'MyApp',
	appFolder			: 'app',
	controllers			: [
		'MyApp.controller.main.Main'
	],
	autoCreateViewport	: true
});
