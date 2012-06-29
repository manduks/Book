/**
 * @class MyApp.store.Files
 * @extends Ext.data.Store
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the definition of our File store
 */
Ext.define('MyApp.store.Files', {
    extend: 'Ext.data.Store',
	requires: 'MyApp.model.File',
	model: 'MyApp.model.File',
	
    proxy		: {
            type	: 'ajax',
            url 	: 'serverside/files.json',
			reader	: {
				type	: 'json',
				root	: 'data'
			}
    }
});