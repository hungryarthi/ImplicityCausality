
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
slides = ['consent', 'EQinstructions', 'EQquestions', 'Eyesinstructions', 'Eyesquestions', 'Innuinstructions', 'Innuquestions', 'Politeinstructions', 'Politequestions', 'askInfo', 'finished'];
slideStage = 0;

//now show the first (consent) slide:

function showNextSlide() {
//	console.log("previous stage:");
//	console.log(slideStage);
//	console.log(slides[slideStage]);
//	console.log("----------------------------------");
//	console.log("showNEXTslide function called! counter updated:");
    $(".slide").hide();
    nextID = slides[slideStage];
    //console.log(nextID);
    $("#"+nextID).show();
//    slideStage++;
//    console.log(slideStage);
//    console.log("next should be:");
//    console.log(slides[slideStage]);
}

//showNextSlide();

function showSlide(id) {
    $(".slide").hide();
    $("#"+id).show();
}


showSlide('consent');
//console.log(slideStage);




/*
//helper functions for validating and extracting entries:

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

    return true;
}*/


warmupEQ = [   /*{"story": "warmup1",
				"ptype": "warmup",
				"s1": "I would be very upset if I could not listen to music every day."},
				{"story": "warmup1",
				"ptype": "warmup",
				"s1": "I prefer to speak to my friends on the phone rather than write letters to them."},
				{"story": "warmup1",
				"ptype": "warmup",
				"s1": "I have no desire to travel to different parts of the world."},
				{"story": "warmup1",
				"ptype": "warmup",
				"s1": "I prefer to read than to dance."}
				*/
		]; 

actualEQx = [{"story": "empath0", "ptype": "actual", "s1": "sample -warmup maybe?"},
			{"story": "empath1", "ptype": "actual", "s1": "I can easily tell if someone else wants to enter a conversation."},
			{"story": "empath2", "ptype": "actual", "s1": "I find it difficult to explain to others things that I understand easily, when they don't understand it the first time."},
			{"story": "empath3", "ptype": "actual", "s1": "I really enjoy caring for other people."},
			{"story": "empath4", "ptype": "actual", "s1": "I find it hard to know what to do in a social situation."},
			{"story": "empath5", "ptype": "actual", "s1": "People often tell me that I went too far in driving my point in a discussion."},
			{"story": "empath6", "ptype": "actual", "s1": "It doesn't bother me too much if I am late meeting a friend."},
			{"story": "empath7", "ptype": "actual", "s1": "Friendships and relationships are just too difficult, so I tend to not bother with them."},
			{"story": "empath8", "ptype": "actual", "s1": "I often find it difficult to judge if something is rude or polite."},
			{"story": "empath9", "ptype": "actual", "s1": "In a conversation, I tend to focus on my own thoughts rather than on what my listener might be thinking."},
			{"story": "empath10", "ptype": "actual", "s1": "When I was a child, I enjoyed cutting up worms to see what would happen."},
			{"story": "empath11", "ptype": "actual", "s1": "I can pick up quickly if someone says one thing but means another."},
			{"story": "empath12", "ptype": "actual", "s1": "It is hard for me to see why some things upset people so much."},
			{"story": "empath13", "ptype": "actual", "s1": "I find it easy to put myself in somebody else's shoes."},
			{"story": "empath14", "ptype": "actual", "s1": "I am good at predicting how someone will feel."},
			{"story": "empath15", "ptype": "actual", "s1": "I am quick to spot when someone in a group is feeling awkward or uncomfortable."},
			{"story": "empath16", "ptype": "actual", "s1": "If I say something that someone else is offended by, I think that that's their problem, not mine."},
			{"story": "empath17", "ptype": "actual", "s1": "If anyone asked me if I liked their haircut, I would reply truthfully, even if I didn't like it."},
			{"story": "empath18", "ptype": "actual", "s1": "I can't always see why someone should have felt offended by a remark."},
			{"story": "empath19", "ptype": "actual", "s1": "Seeing people cry doesn't really upset me."},
			{"story": "empath20", "ptype": "actual", "s1": "I am very blunt, which some people take to be rudeness, even though this is unintentional."},
			{"story": "empath21", "ptype": "actual", "s1": "I don’t tend to find social situations confusing."},
			{"story": "empath22", "ptype": "actual", "s1": "Other people tell me I am good at understanding how they are feeling and what they are ,thinking."},
			{"story": "empath23", "ptype": "actual", "s1": "When I talk to people, I tend to talk about their experiences rather than my own."},
			{"story": "empath24", "ptype": "actual", "s1": "It upsets me to see an animal in pain."},
			{"story": "empath25", "ptype": "actual", "s1": "I am able to make decisions without being influenced by people's feelings."},
			{"story": "empath26", "ptype": "actual", "s1": "I can easily tell if someone else is interested or bored with what I am saying."},
			{"story": "empath27", "ptype": "actual", "s1": "I get upset if I see people suffering on news programmes."},
			{"story": "empath28", "ptype": "actual", "s1": "Friends usually talk to me about their problems as they say that I am very understanding."},
			{"story": "empath29", "ptype": "actual", "s1": "I can sense if I am intruding, even if the other person doesn't tell me."},
			{"story": "empath30", "ptype": "actual", "s1": "People sometimes tell me that I have gone too far with teasing."},
			{"story": "empath31", "ptype": "actual", "s1": "Other people often say that I am insensitive, though I don’t always see why."},
			{"story": "empath32", "ptype": "actual", "s1": "If I see a stranger in a group, I think that it is up to them to make an effort to join in."},
			{"story": "empath33", "ptype": "actual", "s1": "I usually stay emotionally detached when watching a film."},
			{"story": "empath34", "ptype": "actual", "s1": "I can tune into how someone else feels rapidly and intuitively."},
			{"story": "empath35", "ptype": "actual", "s1": "I can easily work out what another person might want to talk about."},
			{"story": "empath36", "ptype": "actual", "s1": "I can tell if someone is masking their true emotion."},
			{"story": "empath37", "ptype": "actual", "s1": "I don't consciously work out the rules of social situations."},
			{"story": "empath38", "ptype": "actual", "s1": "I am good at predicting what someone will do."},
			{"story": "empath39", "ptype": "actual", "s1": "I tend to get emotionally involved with a friend's problems."},
			{"story": "empath40", "ptype": "actual", "s1": "I can usually appreciate the other person's viewpoint, even if I don't  agree with it."},
		];
actualEQ = [{"story": "empath0", "ptype": "actual", "s1": "sample -warmup maybe?"},
			{"story": "empath1", "ptype": "actual", "s1": "I can easily tell if someone else wants to enter a conversation."},
		];

warmupEyes = [/*{"story": "warmup1", "ptype": "warmup", "image": "eyes0", 'expressA': "Jealous", 'expressB': "Panicked", 'expressC': "Arrogant", 'expressD': "Hateful"},
			*/]; 

actualEyes = [{'story': 'eyes1', 'ptype': 'actual', 'image': 'eyes1', 'expressA': "Playful", 'expressB': "Comforted", 'expressC': "Irritated", 'expressD': "Bored"},
			  {'story': 'eyes2', 'ptype': 'actual', 'image': 'eyes2', 'expressA': "Jealous", 'expressB': "Panicked", 'expressC': "Arrogant", 'expressD': "Hateful"},
			];

warmupInnu = [   {"story": "warmup1",
				"ptype": "warmup",
				'innuA': "hi", 'innuB': "hey", 'innuC': "hello", 'innuD': "sup", 'innuE': "whadup"},
		]; 

actualInnu = [   {"story": "actual",
				"ptype": "warmup",
				'innuA': "seeya", 'innuB': "bye", 'innuC': "later", 'innuD': "ttyl", 'innuE': "peaceout"},
		]; 

warmupPolite = [   {"story": "warmup1",
				"ptype": "warmup",
				'innuA': "hi", 'innuB': "hey", 'innuC': "hello", 'innuD': "sup", 'innuE': "whadup"},
		]; 

actualPolite = [   {"story": "actual",
				"ptype": "warmup",
				'innuA': "seeya", 'innuB': "bye", 'innuC': "later", 'innuD': "ttyl", 'innuE': "peaceout"},
		]; 


actualVocab = [{"story": "vocab1", "ptype": "actual", "target": "ADHESIVE", "test1":"glue","test2":"puissance","test3":"tradition","test4":"argument","test5":"latent","answer":"test3"},
				{"story": "vocab2", "ptype": "actual", "target": "DREARY", "test1":"old","test2":"bloom","test3":"gloomy","test4":"correct","test5":"possible","answer":"test3"},
		];
//todo task javascript read in file for warmups and questions


//if (Math.floor(Math.random() * 2)){
//	//condition: actual
//	stories = actual_warmup.randomize().concat(actual.randomize()); //warmup comes first, but otherwise randomize
//}else{
//	//condition: epistemic
//	stories = epistemic_warmup.randomize().concat(epistemic.randomize()); // warmup comes first, but otherwise randomize
//}
storiesEQ = warmupEQ.concat(actualEQ);
storiesEyes = warmupEyes.concat(actualEyes);
storiesInnu = warmupInnu.concat(actualInnu);
storiesPolite = warmupPolite.concat(actualPolite);
storiesVocab = actualVocab;




var experiment = {
    times: {},
    timer: function(stamp) {
		this.times[stamp] = (new Date()).getTime();
	},
    storiesEQ: storiesEQ,
    totalTrials: storiesEQ.length,
    storiesEyes: storiesEyes,
    storiesInnu: storiesInnu,
    storiesPolite: storiesPolite,
    storiesVocab: storiesVocab,
    //totalEyesTrials: storiesEyes.length,    
    trial: 0, //first trial will be trial number 0
    trialsEQ: [],
    trialsEyes: [],
    trialsInnu: [],
    trialsPolite: [],
    trialsVocab: [],
    demographics: {},
	//**current_story: "",
	
	start: function() {
		var story = this.storiesEQ[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#s1').html(story.s1);
		this.timer("starttrial");
		showSlide("EQquestions");
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

	recordEyes: function(trial, answer) {
		//feeling = this.storiesEyes[this.trial].answer
		results={"a1": this.getEyeAnswer(answer)};
		this.trialsEyes.push({	"trial": trial,
							"story": this.storiesEyes[this.trial].story, 	//empath# or warmup#
							"ptype": this.storiesEyes[this.trial].ptype, 	//actual or warmup
							//"s1": this.storiesEyes[this.trial].s1,			//"statement"
							"rt": this.times.stoptrial - this.times.starttrial,
							"results": results});						
	},

	recordInnu: function(trial) {
		var userRankings = $( "#sortableI" ).sortable( "toArray" );
		results={"a1": this.getInnuAnswer(userRankings, trial)};
		this.trialsInnu.push({	"trial": trial,
							"story": this.storiesInnu[this.trial].story, 	
							"ptype": this.storiesInnu[this.trial].ptype, 	
							"rt": this.times.stoptrial - this.times.starttrial,
							"results": results});						
	},

	recordPolite: function(trial) {
		var userRankings = $( "#sortableP" ).sortable( "toArray" );
		results={"a1": this.getPoliteAnswer(userRankings, trial)};
		this.trialsPolite.push({	"trial": trial,
							"story": this.storiesPolite[this.trial].story, 	
							"ptype": this.storiesPolite[this.trial].ptype, 	
							"rt": this.times.stoptrial - this.times.starttrial,
							"results": results});						
	},

	recordVocab: function(trial, answer) {
		results={"a1": answer};
		this.trialsPolite.push({	"trial": trial,
							"story": this.storiesPolite[this.trial].story, 	
							"ptype": this.storiesPolite[this.trial].ptype, 	
							"rt": this.times.stoptrial - this.times.starttrial,
							"results": results});						
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
		//record demographic data
		this.demographics.prevCompletion = $("#prevCompletion").val();
		this.demographics.gender = $("#gender").val();
		this.demographics.age = $("#age").val();
		this.demographics.primaryLanguage = $("#primaryLanguage").val();
		this.demographics.firstLanguage = $("#firstLanguage").val();
		this.demographics.country = $("#country").val();
		this.demographics.computers = $("#computers").val();
		this.demographics.televisions = $("#televisions").val();
		this.demographics.comments = $("#comments").val();

		//finish up:
        showSlide("finished");
//		slideStage++;
//		console.log(slideStage);
        setTimeout(function() { turk.submit(experiment) }, 1500);
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
		showSlide("EQquestions"); //odd
    },

    nextEyes: function(answer) {
    	////todo adjust answer and image update
    	experiment.recordEyes(this.trial, answer); //send trial number as argument since this.trial may get updates before we record!
		//advance, and see if we're done:
		this.trial++;
	        $('.bar').css('width', (200.0 * this.trial/this.totalTrials) + 'px');	//advance the completion bar at top
		if (this.trial >= this.totalTrials) {
			//showNextSlide(); 
			showSlide('Innuinstructions');
//			slideStage++;
//			console.log(slideStage);
			this.totalTrials = storiesInnu.length; //odd
			this.trial = 0;  						//odd
			return;}
		if (this.trial>1){
			$('#marble_init').hide();
		}
		
		//make everything editable again:
		$(':input').prop('disabled',false);

		var story = this.storiesEyes[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#ansA').html(story.expressA);
		$('#ansB').html(story.expressB);
		$('#ansC').html(story.expressC);
		$('#ansD').html(story.expressD);
		var imagesrc = "images/" + story.image + ".png";
		document.getElementById("eyesImage").src=imagesrc;

		//make answers invisible but continue button visible
		
		this.timer("starttrial");
		showSlide("Eyesquestions");
		
    },

    
    nextInnu: function() {
	    experiment.recordInnu(this.trial); //send trial number as argument since this.trial may get updates before we record!
		//advance, and see if we're done:
		this.trial++;
	        $('.bar').css('width', (200.0 * this.trial/this.totalTrials) + 'px');	//advance the completion bar at top
		if (this.trial >= this.totalTrials)  {
			//showNextSlide(); 
			showSlide('Politeinstructions');
//			slideStage++;
//			console.log(slideStage);
			this.totalTrials = storiesPolite.length; //odd
			this.trial = 0;  						//odd
			return;}
		if (this.trial>1){
			$('#marble_init').hide();
		}
		
		//make everything editable again:
		$(':input').prop('disabled',false);

		var story = this.storiesInnu[this.trial];
		$( "#sortableI" ).sortable('refresh');
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#innuA').html(story.innuA);
		$('#innuB').html(story.innuB);
		$('#innuC').html(story.innuC);
		$('#innuD').html(story.innuD);
		$('#innuE').html(story.innuE);

		
		//reset values
		////rb1.reset();
		//make answers invisible but continue button visible
		
		this.timer("starttrial");
		showSlide("Innuquestions");
		
    },

    nextPolite: function() {
	    experiment.recordPolite(this.trial); //send trial number as argument since this.trial may get updates before we record!
		//advance, and see if we're done:
		this.trial++;
	        $('.bar').css('width', (200.0 * this.trial/this.totalTrials) + 'px');	//advance the completion bar at top
		if (this.trial >= this.totalTrials) {
			//showNextSlide(); 
			showSlide('Vocabinstructions');
//			slideStage++;
//			console.log(slideStage);
			this.totalTrials = storiesVocab.length; //odd
			this.trial = 0;  						//odd
			return;}
		if (this.trial>1){
			$('#marble_init').hide();
		}
		
		//make everything editable again:
		$(':input').prop('disabled',false);

		var story = this.storiesVocab[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#politeA').html(story.testA);
		$('#politeB').html(story.testB);
		$('#politeC').html(story.testC);
		$('#politeD').html(story.testD);
		$('#politeE').html(story.testE);

		
		//reset values
		////rb1.reset();
		//make answers invisible but continue button visible
		
		this.timer("starttrial");
		showSlide("Politequestions");
		
    },


    nextVocab: function(answer) {
	    experiment.recordVocab(this.trial, answer); //send trial number as argument since this.trial may get updates before we record!
		//advance, and see if we're done:
		this.trial++;
	        $('.bar').css('width', (200.0 * this.trial/this.totalTrials) + 'px');	//advance the completion bar at top
		if (this.trial >= this.totalTrials) {this.background(); return;}
		if (this.trial>1){
			$('#marble_init').hide();
		}
		
		//make everything editable again:
		$(':input').prop('disabled',false);

		var story = this.storiesVocab[this.trial];
		$('#target').html(story.target);
		//**this.current_story = story.shortname; //for checking when we've changed.
		$('#test1').html(story.test1);
		$('#test2').html(story.test2);
		$('#test3').html(story.test3);
		$('#test4').html(story.test4);
		$('#test5').html(story.test5);

		//reset values
		////rb1.reset();
		//make answers invisible but continue button visible
		
		this.timer("starttrial");
		showSlide("Vocabquestions");
		
    },


	
	
	
    background: function() {
    	showSlide("askInfo");
//		slideStage++;
//		console.log(slideStage);
    },
	
    //this fuction get's called to add a time stamp: each time we move on to the next phase.
    times: {},
    timer: function(stamp) {
	this.times[stamp] = (new Date()).getTime();
    }
};


$(document).keypress(function(e) {
  if(e.which == 13) {
    // enter pressed
    alert("Hi there!");
  }
});

document.onkeypress = function(event) {
	//skip slide:
	showNextSlide();
}
