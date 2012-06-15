/**
 * @class MyApp.model.clients.Client
 * @extends Ext.data.Model
 * @author Crysfel Villa <crysfel@bleext.com>
 *
 * Client's model
 */

Ext.define('MyApp.model.clients.Client', {
    extend:'Ext.data.Model',

    fields:[
        'name','contact','address','phone'
    ]
});