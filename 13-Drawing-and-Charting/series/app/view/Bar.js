/**
 * @class MyApp.view.Bar
 * @extends Ext.chart.Chart
 * @author Armando Gonzalez <iam@armando.mx>
 * The Bar chart definition
 */
Ext.define('MyApp.view.Bar', {
    extend: 'Ext.chart.Chart',
	alias: 'widget.barchart',

    store: 'Data', //store definition
    style: 'background:#fff',
    animate: true,
    legend: {
        position: 'right'
    },
    axes: [{
        type: 'Numeric',
        grid: true, 
        position: 'bottom', // the axe position
        fields: ['data1', 'data2'], // the mapping data for this axe
        title: 'Number of Invoices',
        minimum: 0
    }, {
        type: 'Category',
        position: 'left', // the axe position
        fields: ['month'], // teh mapping data for this axe
        title: 'Month of the Year'
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        xField: 'month', 
        yField: ['data1', 'data2'],
        style: {
            opacity: 0.93
        },
		tips: { // adding a tooltip to the chart
          trackMouse: true,
          width: 140,
          height: 48,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('month') + '</br> data1 : ' + storeItem.get('data1') + ' views</br>' + ' data2 : ' + storeItem.get('data2') + ' views');
          }
        }
    }]
});