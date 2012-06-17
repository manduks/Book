/**
 * @class App.store.Files
 * @extends Object
 * This is the definition of our TreeStore
 */
Ext.define('App.store.Files', {
    extend: 'Ext.data.TreeStore',
    proxy: {
            type: 'ajax',
            url : 'data/files.json'
    }
});