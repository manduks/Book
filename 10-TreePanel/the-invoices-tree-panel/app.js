Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
	name				: 'MyApp',
	appFolder			: 'app',
	controllers			: [
		'MyApp.controller.main.Main'
	],
	autoCreateViewport	: true
});
