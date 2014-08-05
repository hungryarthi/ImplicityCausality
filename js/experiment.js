
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

isRecording = false;

//now show the first (consent) slide:

function showNextSlide() {
    $(".slide").hide();
    nextID = slides[slideStage];
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

actualStatements = [{"story": "story1", "sentpos": "He said 1positive.", "sent-neg": "He said 1negative.", "sent-neu": "He said 1neutral.", "sent-int": "He said 1interference."},
					{"story": "story2", "sentpos": "He said 2positive.", "sent-neg": "He said 2negative.", "sent-neu": "He said 2neutral.", "sent-int": "He said 2interference."},
					{"story": "story3", "sentpos": "He said 3positive.", "sent-neg": "He said 3negative.", "sent-neu": "He said 3neutral.", "sent-int": "He said 3interference."},
					{"story": "story4", "sentpos": "She said 1positive.", "sent-neg": "She said 1negative.", "sent-neu": "She said 1neutral.", "sent-int": "She said 1interference."},
					{"story": "story5", "sentpos": "She said 2positive.", "sent-neg": "She said 2negative.", "sent-neu": "She said 2neutral.", "sent-int": "She said 2interference."},
					{"story": "story6", "sentpos": "She said 3positive.", "sent-neg": "She said 3negative.", "sent-neu": "She said 3neutral.", "sent-int": "She said 3interference."},
];

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
stories = randomOrder(actualStatements);

function randomOrder(statements) {
	console.log("randomize later");
	return statements;
}

var keypressed = false;
var wordTesting = false;

var experiment = {
	times: {},
    timer: function(stamp) {
		this.times[stamp] = (new Date()).getTime();
	},
    stories: stories,
    totalTrials: stories.length,
    
    //totalEyesTrials: storiesEyes.length,    
    trial: 0, //first trial will be trial number 0
    trials: [],
    demographics: {},
	//**current_story: "",
	
	start: function() {
		console.log("started");
		//var story = this.stories[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		//$('#s1').html(story.s1);
		//this.timer("starttrial");
		this.nextSentence();
		//showSlide("questions");
	},

	checkForNextWord: function(spacebarTime) {
		if(!wordTesting) {
			return;
		}
		console.log("word testing!");
		//nextWord(spacebarTime);
	},

	nextWord: function(sentence) {
		wordTesting = true;
		console.log(sentence);
		var words = sentence.split(" ");
		console.log(words);
		current = 0;
		rxnTimes = [];
		while(current < words.length) {
			//console.log("while current<length");
			$('#word').html(words[current]);
			//console.log(keypressed);
			var t1 = new Date().getTime();
			scraps = [];
			scrap = 0;
			while(!keypressed){
			//	rxnTime = (new Date()).getTime();
				//keep looping until a key is pressed;
				scrap = new Date().getTime();
				scraps.push(scrap);
				//if(isInfinite(t1,3000)){
        		//	alert('Loop stopped after 3 seconds')
        		//	break;
    			//} 
			}

			
			//console.log(keypressed);
			//console.log("___________");
			//rxnTime = new Date().getTime();
			keypressed = false;
			here = current + sentence;
			rxnTimes.push(here);
			current++;
		}
		$('#word').html("done...ready?");
		wordTesting = false;
		console.log(rxnTimes);
		return rxnTimes;
	},

	//need a record of the current word displayed

	nextWordX: function(pressTime, prevWord, prevStoryNumber, prevWordNumber) { //spacebar was clicked - so display the next word. next -- record stop time
		console.log(pressTime); //record time here, with previous word
		console.log((new Date()).getTime);
		console.log("******");

		//see what trial the last word was in
		//see if prevWord was the final word in the sentence.
			//if prevWord is not final word:
				//display the nextWord ---and wait for key press.
			//else, when lastWord is the final word in the sentence:
				//update currentStory with getNextSentence
				//and display the "Ready?" ---so when they press space, the intro sentence is displayed (a word in next story)
					//(while "ready?" is displayed, when space hit, nextWordX will be called and the word in currentstory will display)






	},

	nextSentence: function() {
		$('#word').html("Ready?????");
		var sentence = this.stories[this.trial].sentpos; //TODO: depending on the trial number, we should choose sentPos, sentNeg, etc.
		this.timer("starttrial"); //TODO: show intro story sentence, and then word by word.
		//rxnTimes = nextWord(sentence); //show next word and record time between each word
		rxnTimes = this.nextWord(sentence); //show next word and record time between each word
		experiment.record(rxnTimes, this.trial);

		this.trial++;
		$('.bar').css('width', (200.0 * this.trial/this.totalTrials) + 'px');	//advance the completion bar at top
		
		if (this.trial >= this.totalTrials) {
			showNextSlide(); //completed all the sentences, so show final slides
			return;}
		
		//if there is another sentence to check:
		if(this.trial < this.stories.length){
			this.nextSentence();
		} else {
			showNextSlide();

		}
	},
	
	record: function(trial, emp) {
		// results={"a1": emp};
		// this.trialsEQ.push({	"trial": trial,
		// 					"story": this.storiesEQ[this.trial].story, 	//empath# or warmup#
		// 					"ptype": this.storiesEQ[this.trial].ptype, 	//actual or warmup
		// 					"s1": this.storiesEQ[this.trial].s1,			//"statement"
		// 					"rt": this.times.stoptrial - this.times.starttrial,
		// 					"results": results});						//"a1": stronglyagree/slightlyagree/slightlydisagree/stronglydisagree
	},


    
    end: function() {
		//finish up:
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment) }, 1500);
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

storyNumber = 0;
wordNumber = 0;  //0 = "Ready?" prompt, 1 = Introduction Sentence, 2+ = Words in sentence.

storiesX = [{"Ready?", "This is Tom and Sally.", "Tom", "gave", "Sally", "a", "flower."}, 
			{"Ready?", "Here comes Roger and Nimmy.", "Nimmy", "walked", "faster", "than", "Roger."},
			{"Ready?", "This is a question...", "Answer - ", "Yes or No?"},
			];

$(document).keypress(function(e) {
  if(e.which == 32) {
    // spacebar pressed
    var pressTime = (new Date()).getTime();
    var wordOnScreen = $('#word').html();
    keypressed = true;

    console.log("----------------------------------------");
    console.log(pressTime);
    console.log(wordOnScreen);
    console.log(this.storyNumber);
    console.log(this.wordNumber);
    nextWordX(pressTime, wordOnScreen, this.storyNumber, this.wordNumber);
    //checkForNextWord((new Date()).getTime());
  }
});

//i=0;
//document.onkeypress = function(event) {
	//console.log("HELLO");
	//skip slide:
	//showNextSlide();
	/*console.log(i);
	stamp = "stamp"+i.toString();
	console.log(stamp);
	console.log(new Date().getTime());
	timer(stamp);
	i++;
	console.log(times);*/
	// stamp = "stamp"+i.toString();
	// console.log(new Date().getTime());
	// i++;
	// $('#word').html(stamp);

	//this.keypressed=true;
//};


function isInfinite(t1,timeLimit){
    	var t2 = new Date().getTime();
   	 	if(t2-t1> timeLimit){
       		return true;
   		}
    	else return false;
	};


//start whole experiment - from conscent slide.
showNextSlide();