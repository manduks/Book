/**
 * @class MyApp.dancing.Skater
 * @extends MyApp.Person
 * @autor Crysfel Villa
 * @date Sun Dec  4 13:08:55 CET 2011
 *
 * Description
 *
 *
 **/

Ext.define("MyApp.dancing.Skater",{
	extend 	: "Ext.util.Observable",
	mixins	: {
		spin	: "MyApp.skating.Spin",
		footwork: "MyApp.stepsequence.Footwork"
	},
	
	constructor	: function(options){
		Ext.apply(this,options);
	},
	
	compete	: function(){
		var me = this;
		
		console.log(me.name+" from "+me.nationality+" starts the program! Let's see how it goes...");
		me.camel();
		me.scratch();
		me.spreadeagle();
		me.twizzles();
		me.camel();
		console.log(me.name+" ends the program but with no good results :(");
	}
});