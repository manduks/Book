/**
 * @class Ux.dd.DD
 * @extends Ext.dd.DD
 * @author Armando Gonzalez <iam@armando.mx>
 * This is a an extension of the Ext.dd.DD so we can implement a personalized Drag-n-drop behaviour
 */
Ext.define('Ux.dd.DD', {
    extend 		: 'Ext.dd.DD',   
	startDrag	: function(e){
		console.log('startDrag');
		if (!this.el) {
		   	this.el = Ext.get(this.getEl());
		}		
		this.el.addCls('selected');
		this.initialPosition = this.el.getXY();
	},
	onDrag	: function(){
		console.log('onDrag');
	},
	onDragEnter : function(e, id) {
		console.log('onDragEnter');
	},
	onDragOver : function(e, id) {
		console.log('onDragOver');
	},
	onDragOut : function(e, id) {
		console.log('onDragOut');
	},
	onDragDrop : function(e, id) {
		var me = this;
		console.log('onDragDrop');
		var dropEl = Ext.get(id);
		
		if(this.initialPosition != this.el.getXY()){ //if the initial position is diferent from the actual when finishing dragging
			this.onInvalidDrop();
		}		
	    if (me.el.dom.parentNode.id != id) {
	    	dropEl.appendChild(this.el);
	        me.onDragOut(e, id);
	    }
	    else{
	        this.onInvalidDrop();
	   }
	},
	onInvalidDrop : function() {	
		var me = this;
		console.log('onInvalidDrop');				        
		me.el.removeCls('selected');
		me.el.moveTo(this.initialPosition[0], this.initialPosition[1]); // return the object to its original position
	},
	endDrag : function() {
		console.log('endDrag');
		this.el.highlight();
   }
});