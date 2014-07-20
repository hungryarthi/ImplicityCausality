/*
Based on MTurk Tutorial RatingBar.js by Marris Alper Jan 17 2013
Edited by Joshua Hartshorne, 2014

The RatingBar object creates a rating bar with the given id that changes value when hovered over. This allows for gradient response to surveys. There is an accompanying hidden input tag which stores the user input and can be read by MTurk.

use: for a simple bar, put the following in your html where you want it inserted:
<script>
var b = new RatingBar("ratingbar");
b.write();
</script>

methods:
reset() enables the bar and sets its value to 0
write() writes out the bar to the document
enable() enables the bar
disable() disables the bar
isDisabled() returns true if the bar is disabled and false if it is enabled
getValue() returns the current value of the bar, from 0 to 100
click() disables the bar and returns true if it is enabled; otherwise returns false
setOnClick(f) changes the function that is called when the bar is clicked to f()
[for example, to make the bar automatically re-enable one second after being clicked, use the following line of code:
	b.setOnClick(function() { if(b.click()) { setTimeout(function(){ b.enable(); }, 1000); }});
addOnClick(f) makes f execute after click() is, when the bar is clicked
]
*/

function RatingBar(id, bcolor, fcolor) {
	this.id = id;
	this.bcolor = bcolor; //background color
	this.fcolor = fcolor; //foreground color
	this.register = false; //register mouse movements?
	this.onmd = function() { this.click();}; //onmd is a built-in function from some other library. Have it call this.click so that we can customize.

	this.reset = function() {
		$("#" + this.id).progressbar({disabled: false, value: 0 });
	    $("#" + this.id).css({ 'background': this.bcolor });
	    $("#" + this.id + " > div").css({ 'background': this.fcolor });
	};

	this.write = function() {
		var t = this; //this is a hack, because the keyword "this" doesn't work well in $(document).ready
		$(document).ready(function() {
			t.reset(); //prog bar starts out at default vals -- still seems to be necessary in firefox
			$("#" + id).mousemove(function(e) {
				if (t.register == true){
					//if enabled, whenever the mouse moves over the bar, update its value
					t.update(e);
				}
			});
			$("#" + id).mousedown(function(e) {
				t.update(e);
				t.onmd();
			});
		});
	};
	
	this.toggle = function(){
		var t = this;
		if (t.register == true){
			t.register = false;
		}else{
			t.register = true;
		}
	};
	
	this.enable = function() {
		$("#" + this.id).progressbar("option", "disabled", false);
	};

	this.disable = function() {
		$("#" + this.id).progressbar("option", "disabled", true);
	};

	this.isDisabled = function() {
		return $("#" + this.id).progressbar("option", "disabled");
	};
	
	//change bar's value based on mouse position
	this.update = function(e) {
		if(!this.isDisabled()) {
			var bar = $("#" + this.id);
			var val = 100 * (e.pageX - bar.offset().left) / bar.width();
			bar.progressbar("option", "value", val);
			//document.getElementById("____" + this.id).value = val; //change value of hidden input
		}
	};
	
	this.getValue = function() {
		return $("#" + this.id).progressbar("option", "value");
	};
	
	//called when the bar is clicked.
	this.click = function() {
		var t = this; //hack
		t.toggle();
		return true;
	};

	//replace the function that is called when bar is clicked
	this.setOnClick = function(f) {
		this.onmd = f;
	};

	//add an additional function to be called when the bar is clicked
	this.addOnClick = function(f) {
		this.setOnClick(function() { this.click(); f() });
	};
}
