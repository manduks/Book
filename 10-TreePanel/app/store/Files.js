/**
 * @class App.store.Files
 * @extends Object
 * Description
 */
Ext.define('App.store.Files', {
    extend: 'Ext.data.TreeStore',
  	autoLoad: true,
    proxy: {
            type: 'ajax',
            url : 'data/files.json',
    }
});