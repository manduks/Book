/**
 * @class MyApp.model.categories.Category
 * @extends Ext.data.Model
 * @author Armando Gonzalez <iam@armando.mx>
 * The category model definition
 */
Ext.define('MyApp.model.categories.Category', {
    extend: 'Ext.data.Model',    
    fields:[
		{name:'name', type:'string'},
		{name:'owner', type:'string'},
		{name:'created_at', type:'date', dateFormat: 'm/d/Y'}
	]
});