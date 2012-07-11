/**
 * @class MyApp.view.DrawingSurface
 * @extends Ext.draw.Component
 * @author Armando Gonzalez <iam@armando.mx>∫
 * This is the drawing component of the basic drawing example
 */
Ext.define('MyApp.view.DrawingSurface', {
    extend 	: 'Ext.draw.Component',
	alias 	: 'widget.drawingsurface',
	items	: [{
	        type: 'circle', //this will draw a circle
	        fill: 'blue',
	        radius: 50, //the radius of our circle
	        x: -150, //the x position of the circle
	        y: 60 //the y position of the cirlce
	    },{
	       	type: 'rect', //this will draw a rectangle
	       	width: 100,
		   	height: 100,
			radius: 10, //border radius
	        fill: 'green', //the fill color of the shape
	        opacity: 0.5,
			x: -120,
	        y: 0,
	        stroke: 'red', //the stroke color
	        'stroke-width': 2 
	    },{
	        type: "ellipse",
	        radiusX: 80,
	        radiusY: 50,
			opacity: 0.8, //the opacity of the sprite
	        x: 50,
			y: 60,
	       fill: 'red'
	    },{
	        type: "path",
		   	path: "M 230 0 L 300 0 L 265 100 z",
			opacity: 0.9,
	       	fill: "green"
	 	},{
			type: "text",
		  	text: "Text!",
	        fill: "black",
			x: -50,
			y:-50,	
	       	font: "18px monospace"
		},{
			type: "image", //this will sprite an image
	        src: "http://www.sencha.com/img/apple-touch-icon.png",
			opacity: 0.9,
			x: 120,
			y: 0,
	       	height: 100,
			width: 100
	    }]
});