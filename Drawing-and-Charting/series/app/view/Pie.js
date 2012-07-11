/**
 * @class MyApp.view.Pie
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Pie chart definition
 */
Ext.define('MyApp.view.Pie', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.piechart',

    store: 'Data',
    style: 'background:#fff',
    animate: true,
    legend: {
        position: 'right'
    },
    series: [{
        type: 'pie', // pie chart type
        field: 'data1', // the mapping data for this pie
        showInLegend: true, 
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: { // show the months names inside the pie slices
            field: 'month',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});