/**
 * @class MyApp.view.Scatter
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Scatter chart definition
 */
Ext.define('MyApp.view.Scatter', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.scatterchart',
    style: 'background:#fff',
    animate: true,
    store: 'Data',
    axes: false,
	    series: [{
	        type: 'scatter',
	        markerConfig: {
	            type: 'circle',
                radius: 40,
                size: 20
	        },
	        axis: 'left',
	        xField: 'data1',
	        yField: 'data2',
	        color: '#a00'
	    }]
});