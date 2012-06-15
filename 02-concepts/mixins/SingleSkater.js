/**
 * @class MyApp.single.Skater
 * @extends MyApp.Person
 * @autor Crysfel Villa
 * @date Sun Dec  4 13:06:12 CET 2011
 *
 * A class for a single figure skater
 *
 *
 **/

Ext.define("MyApp.single.Skater",{
	extend 	: "Ext.util.Observable",
	mixins	: {
		jump	: "MyApp.skating.Jump",
		spin	: "MyApp.skating.Spin",
		footwork: "MyApp.stepsequence.Footwork"
	},
	
	constructor	: function(options){
		Ext.apply(this,options);
	},
	
	compete	: function(){
		var me = this;
		
		console.log(me.name+" from "+me.nationality+" starts the program! Good luck!");
		me.waltz();
		me.mohawk();
		me.camel();
		me.axel();
		me.mixins.jump.combination();
		me.mixins.spin.combination();
		me.spreadeagle();
		me.scratch();
		console.log(me.name+" ends the program and gets the first place!");
	}
});