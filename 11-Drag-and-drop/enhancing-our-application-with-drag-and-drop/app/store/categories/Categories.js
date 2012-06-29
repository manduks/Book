/**
 * @class MyApp.store.categories.Categories
 * @extends Ext.data.TreeStore
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the definition of our Categories store
 */
Ext.define('MyApp.store.categories.Categories', {
    extend: 'Ext.data.TreeStore',
	requires: 'MyApp.model.categories.Category',
	model: 'MyApp.model.categories.Category',
    proxy: {
            type: 'ajax',
            url : 'serverside/categories/list.json'
    }
});