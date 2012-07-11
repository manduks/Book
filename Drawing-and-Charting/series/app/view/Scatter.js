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
	            radius: 5,
	            size: 5
	        },
	        axis: 'left',
	        xField: 'month',
	        yField: 'data1',
	        color: '#a00'
	    }, {
	        type: 'scatter',
	        markerConfig: {
	            radius: 5,
	            size: 5
	        },
	        axis: 'left',
	        xField: 'month',
	        yField: 'data2'
	    }, {
	        type: 'scatter',
	        markerConfig: {
	            radius: 5,
	            size: 5
	        },
	        axis: 'left',
	        xField: 'month',
	        yField: 'data3'
	    }]
});