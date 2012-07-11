/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'MyApp',

	requires:['MyApp.view.DrawingSurface','MyApp.view.BouncingBall'], 
	
    launch: function() {
     	Ext.create('Ext.Window',{
			//width		: 630,
			//height		: 318,
			title		: 'Drawing and charting',
			autoScroll	: true,
			frame		: false,
			//maximized	: true,
			layout		: 'fit',
			items:[{
				//xtype:'drawingsurface'//rendering the component in the window
				xtype	: 'bouncingball'
			}]
		}).show();		
    }
});