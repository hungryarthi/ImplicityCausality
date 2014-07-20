/*
RatingBar2 by Joshua Hartshorne, 2014
Inspired by the MTurk Tutorial RatingBar.js by Marris Alper Jan 17 2013

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
	this.barvalue = 20;
	this.sliderwidth = 5; //percentage of bar that is taken up by the slider
	this.disabled = false;
	this.bcolor = bcolor; //background color
	this.fcolor = fcolor; //foreground color
	//this.width = document.getElementById(this.id).offsetWidth;
	this.width = $("#" + this.id + " > div").width();
	this.register = false; //register mouse movements?
	this.onmd = function() { this.click();}; //onmd is a built-in function from some other library. Have it call this.click so that we can customize.

	this.reset = function() {
	    $("#" + this.id + " > div").css({ 'background': this.bcolor, 'height':'100%',  'border':'1px solid black' });
	    $("#" + this.id + " > div > div").css({ 'background': this.fcolor });
	    $("#" + this.id + " > div > div").css({ 'width': 0});
	    $("#" + this.id + " > div > div").css({ 'height': "100%" });
	    $("#" + this.id + " > div > div").css({ 'margin-left':  this.findloc()});
		this.barvalue=-1;
		this.register = false;
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
	
	this.findloc = function(){
		var loc = ((this.barvalue-(Math.floor(this.sliderwidth/2)))/100 * this.width);
		if (loc<0){loc=0};
		return loc;
	}
	
	this.toggle = function(){
		var t = this;
		if (t.register == true){
			t.register = false;
		}else{
			t.register = true;
		}
	};
	
	this.enable = function() {
		this.disabled = false;
	};

	this.disable = function() {
		this.disabled = true;
	};

	this.isDisabled = function() {
		return $("#" + this.id + " > div").progressbar("option", "disabled");
	};
	
	//change bar's value based on mouse position
	this.update = function(e) {
		if(!this.disabled) {
			var bar = $("#" + this.id + " > div");
			this.barvalue= 100 * (e.pageX - bar.offset().left) / bar.width();
			if (this.barvalue>100){this.barvalue=100};
			if (this.barvalue<0){this.barvalue=0};
			$("#" + this.id + " > div > div").css({ 'margin-left':  this.findloc()});
			//don't go over the edge
		    $("#" + this.id + " > div > div").css({ 'width': this.getwidth()});		
		}
	};
	
	this.getValue = function() {
		return this.barvalue;
	};
	
	
	this.getwidth = function(){
		var tempwidth = this.sliderwidth/100 * this.width;
		if ((this.barvalue+Math.ceil(this.sliderwidth/2))>100){
			var tempwidth = (this.sliderwidth + (100-(this.barvalue+Math.ceil(this.sliderwidth/2))))/100 * this.width;
		}
		if ((this.barvalue-Math.floor(this.sliderwidth/2))<0){
			var tempwidth = (this.sliderwidth + (this.barvalue-Math.floor(this.sliderwidth/2)))/100 * this.width;
		}		
		return tempwidth
	}
	
	//called when the bar is clicked.
	this.click = function() {
		var t = this; //hack
	    $("#" + t.id + " > div > div").css({ 'width': this.getwidth() });
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
