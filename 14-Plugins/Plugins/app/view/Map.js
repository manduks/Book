/**
 * @class MyApp.view.Map
 * @extends Ext.ux.GMapPanel
 * @author Armando Gonzalez <iam@armando.mx>
 * The map panel definition
 */
Ext.define('MyApp.view.Map', {
    extend: 'Ext.ux.GMapPanel',
	alias:'widget.map',
	
    center: {
        geoCodeAddr: 'Oaxaca',
        marker: {
            title: 'Oaxaca'
        }
    },
    markers: [{
        lat: 17.066323,
        lng: -96.722989,
        title: 'Santo Domingo Museum',
        listeners: {
            click: function (e) {
                Ext.Msg.alert('Awesome place!');
            }
        }
    }]
});