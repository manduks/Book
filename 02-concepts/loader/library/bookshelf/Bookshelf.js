/**
 * @class MyApp.library.bookshelf.BookShelf
 * @autor Crysfel Villa
 * @date Mon Dec  5 11:12:45 CET 2011
 *
 * Description
 *
 *
 **/

Ext.define("MyApp.library.bookshelf.Bookshelf",{
	requires	: ["Ext.util.MixedCollection"],
	uses		: ["MyApp.models.Book"],
	
	constructor	: function(){
		this.books = Ext.create("Ext.util.MixedCollection");
	},

	getBook		: function(index){
		return this.books.get(index);
	},
	
	addBook		: function(data){
		var book = Ext.create("MyApp.models.Book",data);
		this.books.add(book);
	}
});