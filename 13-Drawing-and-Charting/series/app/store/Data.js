/**
 * @class App.store.Data
 * @extends Ext.data.Store
 * This our data store definition
 * @authore Armando Gonzalez <iam@armando.mx>
 */
Ext.define('MyApp.store.Data', {
    extend: 'Ext.data.Store', 
	fields: ['month', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url : 'serverside/data.json',
		reader:{
			type:'json',
			root:'data'
		}
	}
});