/**
 * @class MyApp.view.Radar
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Radar chart definition
 */
Ext.define('MyApp.view.Radar', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.radarchart',
    style: 'background:#fff',
    insetPadding: 20,
    animate: true,
    store: 'Data',
    legend: {
        position: 'right'
    },
    axes: [{ // setting the radial axe
        type: 'Radial',
        position: 'radial',
        label: {
            display: true
        }
    }],
    series: [{
        showInLegend: true,
        type: 'radar', // setting the series type
        xField: 'month',
        yField: 'data1',
        style: {
            opacity: 0.4
        }
    }, {
        showInLegend: true,
        type: 'radar', // setting the series type
        xField: 'month',
        yField: 'data2',
        style: {
            opacity: 0.4
        }
    }, {
        showInLegend: true,
        type: 'radar', // setting the series type
        xField: 'month',
        yField: 'data3',
        style: {
            opacity: 0.4
        }
    }]
});