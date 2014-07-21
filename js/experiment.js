
//first some things useful for randomizing conditions:

//i think this should be a random permutation (fisher-yates shuffle) of the array:
/*Array.prototype.randomize = function() {

   // for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
   // return this;
   
    var tmp, current, top = this.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = this[current];
        this[current] = this[top];
        this[top] = tmp;
    }
    return this;
}

function random(a,b) {
    if (typeof b == "undefined") {
	a = a || 2;
	return Math.floor(Math.random()*a);
    } else {
	return Math.floor(Math.random()*(b-a+1)) + a;
    }
}*/

//** todo -- always update the order for slides:
slides = ['consent', 'instructions', 'questions', 'finished']; //'askInfo'??
slideStage = 0;

//now show the first (consent) slide:

function showNextSlide() {
	if(slides[slideStage] == "questions") {
    	console.log("questions slide, start experiment:");
    	experiment.start();
    	console.log("experiment started?");

    }

    $(".slide").hide();
    nextID = slides[slideStage];
    //console.log(nextID);
    $("#"+nextID).show();
    slideStage++;

    

}




function showSlide(id) {
    $(".slide").hide();
    $("#"+id).show();
}

//showSlide('consent');




/*
//helper functions for validating and extracting entries:

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

    return true;
}*/

actualEQ = [{"story": "empath0", "ptype": "actual", "s1": "sample -warmup maybe?"},
			{"story": "empath1", "ptype": "actual", "s1": "I can easily tell if someone else wants to enter a conversation."},
			{"story": "empath0", "ptype": "actual", "s1": "sample -warmup maybe?"},
			{"story": "empath0", "ptype": "actual", "s1": "sample -warmup maybe?"},		
		];


//if (Math.floor(Math.random() * 2)){
//	//condition: actual
//	stories = actual_warmup.randomize().concat(actual.randomize()); //warmup comes first, but otherwise randomize
//}else{
//	//condition: epistemic
//	stories = epistemic_warmup.randomize().concat(epistemic.randomize()); // warmup comes first, but otherwise randomize
//}
storiesEQ = actualEQ;



var experiment = {
    times: {},
    timer: function(stamp) {
		this.times[stamp] = (new Date()).getTime();
	},
    storiesEQ: storiesEQ,
    totalTrials: storiesEQ.length,
    
    //totalEyesTrials: storiesEyes.length,    
    trial: 0, //first trial will be trial number 0
    trialsEQ: [],
    demographics: {},
	//**current_story: "",
	
	start: function() {
		console.log("started");
		var story = this.storiesEQ[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#s1').html(story.s1);
		this.timer("starttrial");
		showSlide("questions");
//		slideStage++;
//		console.log(slideStage);
	},

	
	/*validate: function(rb1) {
		results={"q1": rb1.getValue()};
		if (results.q1==null || results.q1==(-1)) {
			alert ( "Please be sure to answer the question.");
			return false;
		};
		if (this.stories[this.trial].ptype == "warmup"){
			//validate warmup trial
			if (this.stories[this.trial].expected == "pos"){
				if (results.q1 > 65){
					return true;
				}else{
					alert("Please read the question carefully and try answering again!");
					return false;
				};
			}else{
				if (results.q1 < 35){
					return true;
				}else{
					alert("Please read the question carefully and try answering again!");
					return false;
				};				
			};
		}else{
			return true;
		}
	},*/
	
	recordEQ: function(trial, emp) {
		results={"a1": emp};
		this.trialsEQ.push({	"trial": trial,
							"story": this.storiesEQ[this.trial].story, 	//empath# or warmup#
							"ptype": this.storiesEQ[this.trial].ptype, 	//actual or warmup
							"s1": this.storiesEQ[this.trial].s1,			//"statement"
							"rt": this.times.stoptrial - this.times.starttrial,
							"results": results});						//"a1": stronglyagree/slightlyagree/slightlydisagree/stronglydisagree
	},

	

	getEyeAnswer: function(answer) {
		if (answer == "A") {
			return this.storiesEyes[this.trial].expressA;}
		if (answer == "B") {
			return this.storiesEyes[this.trial].expressB;}
		if (answer == "C") {
			return this.storiesEyes[this.trial].expressC;}
		if (answer == "D") {
			return this.storiesEyes[this.trial].expressD;}
	},

	getInnuAnswer: function(answer) { 
		var userAnswers = [];
		var i = 0;

		while (i<answer.length) {
			option = answer[i];
			if (option == "innuA") { userAnswers.push(this.storiesInnu[this.trial].innuA);}
			if (option == "innuB") { userAnswers.push(this.storiesInnu[this.trial].innuB);}
			if (option == "innuC") { userAnswers.push(this.storiesInnu[this.trial].innuC);}
			if (option == "innuD") { userAnswers.push(this.storiesInnu[this.trial].innuD);}
			if (option == "innuE") { userAnswers.push(this.storiesInnu[this.trial].innuE);}
			i++;
		}
		return userAnswers;			
	},

	getPoliteAnswer: function(answer) { 
		var userAnswers = [];
		var i = 0;

		while (i<answer.length) {
			option = answer[i];
			if (option == "innuA") { userAnswers.push(this.storiesPolite[this.trial].politeA);}
			if (option == "innuB") { userAnswers.push(this.storiesPolite[this.trial].politeB);}
			if (option == "innuC") { userAnswers.push(this.storiesPolite[this.trial].politeC);}
			if (option == "innuD") { userAnswers.push(this.storiesPolite[this.trial].politeD);}
			if (option == "innuE") { userAnswers.push(this.storiesPolite[this.trial].politeE);}
			i++;
		}
		return userAnswers;			
	},


    
    end: function() {
		//finish up:
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment) }, 1500);
    },
	
    nextWord: function(sentence) {
    	experiment.record
    },

	nextEQ: function(emp) {
	    experiment.recordEQ(this.trial, emp); //send trial number as argument since this.trial may get updates before we record!
		//advance, and see if we're done:
		this.trial++;
	        $('.bar').css('width', (200.0 * this.trial/this.totalTrials) + 'px');	//advance the completion bar at top
		if (this.trial >= this.totalTrials) {
			//showNextSlide(); 
			showSlide('Eyesinstructions');
//			slideStage++;
//			console.log(slideStage);
			this.totalTrials = storiesEyes.length; //odd
			this.trial = 0;  						//odd
			return;}
		if (this.trial>1){
			$('#marble_init').hide(); //todo - check, what does this do?
		}
		
		//make everything editable again:
		$(':input').prop('disabled',false);

		var story = this.storiesEQ[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#s1').html(story.s1);
		
		//reset values
		////rb1.reset();
		//make answers invisible but continue button visible
		
		this.timer("starttrial");
		console.log(this.times);
		showSlide("questions"); //odd
    },

    
	
	
	
    //background: function() {
    //	showSlide("askInfo");
    //},
	
    //this fuction get's called to add a time stamp: each time we move on to the next phase.
    times: {},
    timer: function(stamp) {
		this.times[stamp] = (new Date()).getTime();
    },

};

showNextSlide();

$(document).keypress(function(e) {
  if(e.which == 13) {
    // enter pressed
    alert("Hi there!");
  }
});

i=0;
document.onkeypress = function(event) {
	console.log("HELLO");
	//skip slide:
	//showNextSlide();
	/*console.log(i);
	stamp = "stamp"+i.toString();
	console.log(stamp);
	console.log(new Date().getTime());
	timer(stamp);
	i++;
	console.log(times);*/
	stamp = "stamp"+i.toString();
	console.log(new Date().getTime());
	i++;
	$('#word').html(stamp);
}