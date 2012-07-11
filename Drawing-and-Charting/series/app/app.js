/**
 * This is the main code for the application
 */

Ext.Loader.setConfig({
	enabled:true
});
Ext.application({
    name: 'MyApp',

	requires:['MyApp.view.Area','MyApp.view.Bar','MyApp.view.Line', 'MyApp.view.Pie','MyApp.view.Radar','MyApp.view.Scatter'],
	stores:['Data'],
	
    launch: function() {
     	Ext.create('Ext.Window',{
			width		: 630,
			height		: 318,
			title		: 'Drawing and charting',
			autoScroll	: true,
			frame		: false,
			//maximized	: true,
			style: 'overflow: hidden;',
			layout		: 'fit',
			items:[{
				//xtype:'areachart'
				//xtype:'barchart'
				//xtype: 'linechart'
				//xtype: 'piechart'
				//xtype: 'radarchart'
				xtype: 'scatterchart'
			}]
		}).show();		
    }
});