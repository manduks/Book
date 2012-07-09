/**
 * @class MyApp.model.File
 * @extends Ext.data.Model
 * @author Armando Gonzalez <iam@armando.mx>
 * The file model definition
 */
Ext.define('MyApp.model.File', {
    extend: 'Ext.data.Model',    
    fields:[
		{name:'name', type:'string'},
		{name:'owner', type:'string'},
		{name:'created_at', type:'date', dateFormat: 'm/d/Y'},
		{name:'size', type:'string'}
	]
});