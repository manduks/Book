/**
 * @class MyApp.view.invoices.LineChart
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Line chart definition for the invoices summary
 */
Ext.define('MyApp.view.invoices.LineChart', {
    extend: 'Ext.chart.Chart',
	alias: 'widget.invoices.linechart',
    store: 'invoices.Summaries',
    style: 'background:#fff',
    animate: true,
    legend: {
        position: 'right'
    },
    axes: [{
        type: 'Numeric',
        grid: true,
        position: 'left',
        fields: ['data1', 'data2', 'data3'], 
        title: 'Invoices data',
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['invoice'],
        title: 'Invoices'
    }],
    series: [{ 
        type: 'line',
        axis: 'left',
        xField: 'invoice',
        yField: 'data1', 
        highlight: { 
            size: 7
        },
		fill: true, 
        markerConfig: { 
            type: 'cross', 
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        axis: 'left',
        xField: 'invoice',
        yField: 'data2',
        highlight: {
            size: 7
        },
        markerConfig: {
            type: 'circle', 
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        axis: 'left',
        xField: 'invoice',
        yField: 'data3',
        highlight: {
            size: 7
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }]
});