/**
 * @class MyApp.view.Area
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Area chart definition
 */
Ext.define('MyApp.view.Area', {
    extend: 'Ext.chart.Chart',
	alias: 'widget.areachart',

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
        fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
        title: 'Number of Invoices',
        minimum: 0
    }, {
        type: 'Category',
        position: 'bottom',
        fields: ['month'],
        title: 'Month of the Year',
        label: {
            rotate: {
                degrees: 315
            }
        }
    }],
    series: [{
        type: 'area',
        axis: 'left',
        xField: 'month',
        yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
        style: {
            opacity: 0.93
        }
    }]
});