/**
 * @class MyApp.view.Gauge
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Gauge chart definition
 */
Ext.define('MyApp.view.Gauge', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.gaugechart',
    style: 'background:#fff',
    animate: true,
    store: 'Data',
    axes: [{
		type: 'gauge', // gauge type axe
		position: 'gauge',
		minimum: 0, //minimum value for the gauge
		maximum: 100, //maximum value for the gauge
        steps: 10, // the stpes the gauge will have
        margin: -10 // setting a margin to the axe		
	}],
    series: [{
        type: 'gauge', // gauge series type
        field: 'data1', // the data we are mapping
		donut: 50, // setting a donut radius
	    colorSet: ['#3AA8CB', '#ddd'] // the char color
    }]
});