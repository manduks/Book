/**
 * @class MyApp.model.Client
 * @extends Ext.data.Model
 * @author Armando Gonzalez <iam@armando.mx>
 *
 * Client's model
 */

Ext.define('MyApp.model.Client', {
    extend:'Ext.data.Model',

    fields:[
        'id','name','address','phone','about'
    ]
});