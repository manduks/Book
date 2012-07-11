/**
 * @class MyApp.view.BouncingBall
 * @extends Ext.draw.Component
 * @author Armando Gonzalez <iam@armando.mx>
 * This is the bouncing ball component
 */
Ext.define('MyApp.view.BouncingBall', {
    extend 	: 'Ext.draw.Component',
	alias 	: 'widget.bouncingball',
	style:{
		backgroundImage:"url('resources/images/court.jpeg')"
	},
	width: 700,
	height: 350,
	ballSize :30,
	afterRender : function(){
		var ball,dx = 5, dy = 5, x = 20, y = 100, me = this, sound ;
				
		//Adding some sound to our bouncing ball		
		sound = new Audio("resources/sounds/toing.mp3"); // buffers automatically when created
		
		this.callParent(arguments);
	
		
		ball = new Ext.draw.Sprite({ // we create the ball sprite
		    type: 'image',
			src: "resources/images/ball.png",
			height: me.ballSize,
			width: me.ballSize
		});
		
		me.surface.add(ball); // adding the ball to our surface
				
		var runner = new Ext.util.TaskRunner(); //create a runner to loop the ball
		var task = runner.newTask({ //start a task
		     run: function () {
		         ball.setAttributes({ //change the ball position
				    	y : y,
						x : x
					}, true); // the true value redraws tha ball
					
				if( x < 0 || x > me.width - me.ballSize ) { // validation to change the x direction when it reaches left/right
					dx = -dx;
					//sound.play(); // play the sound when the ball bounces on the sides
				}
				if( y < 0 || y > me.height - me.ballSize ) { // validation to change the y direction when the ball reaches top/bottom
					dy = -dy;
				}
				y += dy; //adding pixels to change the ball´s position
				x += dx;		
		     },
		     interval: 10 // this goes on every 10 milliseconds
		 });
		task.start(); // start the task
		
		//add mouseup listener to the sprite
		ball.addListener('mouseover', function() { //changing the ball direction with the mouse
			dx = -dx;
		});		
	}
});