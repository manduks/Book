/**
 * @class MyApp.store.TreeFiles
 * @extends Ext.data.TreeStore
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the definition of our File store
 */
Ext.define('MyApp.store.TreeFiles', {
    extend: 'Ext.data.TreeStore',
	requires: 'MyApp.model.File',
	model: 'MyApp.model.File',
    proxy: {
            type: 'ajax',
            url : 'serverside/tree-files.json'
    }
});