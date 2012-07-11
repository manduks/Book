/**
 * @class MyApp.view.Line
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Line chart definition
 */
Ext.define('MyApp.view.Line', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.linechart',

    store: 'Data',
    style: 'background:#fff',
    animate: true,
    legend: {
        position: 'right'
    },
    axes: [{
        type: 'Numeric',
        grid: true,
        position: 'left',
        fields: ['data1', 'data2', 'data3'], //the mapping data for this axe
        title: 'Number of Invoices',
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['month'],//the mapping data for this axe
        title: 'Month of the Year',
        label: {
            rotate: {
                degrees: 315
            }
        }
    }],
    series: [{ // we need to define a serie for each line we want to render
        type: 'line',
        axis: 'left',
        xField: 'month',
        yField: 'data1', // the mapping data for this line
        highlight: { // the highlight behaviour of the line
            size: 7
        },
		fill: true, // this line is fill
        markerConfig: { // setting the marker config
            type: 'cross', //cross type marker
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        axis: 'left',
        xField: 'month',
        yField: 'data2',
        highlight: {
            size: 7
        },
        markerConfig: {
            type: 'circle', //circle type marker
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }, {
        type: 'line',
        axis: 'left',
        xField: 'month',
        yField: 'data3',
        highlight: {
            size: 7
        },
        markerConfig: {
            type: 'circle',//circle type marker
            size: 4,
            radius: 4,
            'stroke-width': 0
        }
    }]
});