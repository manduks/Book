/**
 * @class MyApp.skating.Spin
 * @autor Crysfel Villa
 * @date Sun Dec  4 13:02:40 CET 2011
 *
 * The spin class. Spins are an element in figure skating where the skater rotates
 *
 *
 **/

Ext.define("MyApp.skating.Spin",{
	
	scratch		: function(){
		console.log("Scratch: With the free leg crossed in front of the skating leg.");
	},
	
	crossfoot	: function(){
		console.log("Crossfoot: Is a back upright spin in which the free leg is crossed...");
	},
	
	camel		: function(){
		console.log("Camel: Is a spin in which the free leg is held backwards with the knee higher than the hip level");
	},
	
	combination	: function(){
		console.log("This is a combination spin!!");
	}
});