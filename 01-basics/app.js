
Ext.onReady(function(){
	//alert("We’re ready to go!");
	Ext.Msg.alert("Alert","We’re ready to go!");
	 
	Ext.Msg.confirm("Confirm","Do you like Ext JS?",function(btn){
		if(btn === "yes"){
			Ext.Msg.alert("Great!","This is great!");
		}else{
			Ext.Msg.alert("Really?","That's too bad.");
		}
	});
});
