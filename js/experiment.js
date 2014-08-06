/*TODO:
	- progress bar, if necessary
	- input from excel spreadsheet instead of writing out arrays manually
	- disable phone use
			potentially with this in html header:
				<script type="text/javascript">
				  <!--
				  if (screen.width <= 800) {
				    window.location = "http://m.domain.com";
				  }
				  //-->
				</script>
	- record times in experiment variable

*/


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

function showNextSlide() {
    $(".slide").hide();
    nextID = slides[slideStage];
    $("#"+nextID).show();
    
    //check for special slide commands:
    if(slides[slideStage] == 'questions'){  //if 'questions' slide, start experiment
    	isRecording = true;
    }
    if(slides[slideStage] == 'finished'){   //if 'finished' slide, submit experiment to turk
    	experiment.timer("endtrial");
    	isRecording = false;
    	setTimeout(function() { turk.submit(experiment) }, 1500);
    }

    slideStage++;
}



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


/*
experiment = {
	trials:  [ {story: story0, intro: introduction sentence, words: full sentence, wordsTimes: [(word, time), (word, time)]}, 
	]

}
*/

var experiment = {
	times: {},
    timer: function(stamp) {
		this.times[stamp] = (new Date()).getTime();
	},
    //stories: stories, //TODO: fix with proper sentences when you gather them.
    totalTrials: stories.length,
    trials: [],
    demographics: {},
	//**current_story: "",
	
	start: function() {
		console.log("started");
		//var story = this.stories[this.trial];
		//**this.current_story = story.shortname; //for checking when we've changed.
		//$('#s1').html(story.s1);
		this.timer("starttrial");
		//this.nextSentence();
		//showSlide("questions");
	},


	record: function(fullSent, wordTimes, prevStoryNumber) {
		//if 
		console.log("RECORDED!");

		this.trials.push({ "story": prevStoryNumber,
							//"intro": storiesX[prevStoryNumber][0],
							"fullStory": fullSent,
							"wordTimes": wordTimes});
	},

};

var storyNumber = 0;
var wordNumber = -1;  //0 = "Ready?" prompt, 1 = Introduction Sentence, 2+ = Words in sentence.
var currentWordTimes = [];
var fullSentence = ""; //TODO: modify with master list of sentences

//storiesX is an array of arrays of the word parts to be displayed. 
	///It is made at the start during consent, to reduce any lag.
storiesX = [["Ready?", "This is Tom and Sally.", "Tom", "gave", "Sally", "a", "flower."], 
			["Ready?", "Here comes Roger and Nimmy.", "Nimmy", "walked", "faster", "than", "Roger."],
			["Ready?", "This is a question...", "Answer - ", "Yes or No?"],
			];


function nextWordX(pressTime, prevWord, prevStoryNumber, prevWordNumber) { //spacebar was clicked - so display the next word. next -- record stop time
		currentWordTimes.push([prevWord, pressTime]);
		fullSentence = fullSentence + " " + prevWord;

	//see if prevWord was the final word in the sentence.
		//if prevWord is not final word:
		console.log(storiesX);
		console.log(prevWordNumber);
		console.log(storiesX[prevStoryNumber]);
		if(wordNumber < storiesX[prevStoryNumber].length-1){
			//display the nextWord ---and wait for key press.
			wordNumber++;
			$('#word').html(storiesX[prevStoryNumber][wordNumber]);
			//console.log("WORD DISPLAYED:");
			console.log(storiesX[prevStoryNumber][wordNumber]);
		}
		//else, when lastWord is the final word in the sentence:
		else {
			//update currentStory with getNextSentence
			storyNumber++;
			wordNumber = -1;
			console.log("story number and word number RESET-ED");

			//if done with all stories, go to end slide:
			if(storyNumber >= storiesX.length){
				showNextSlide(); //go to Finished Slide
			}
			//else record story data and prompt the next sentence:
			experiment.record(fullSentence, currentWordTimes, prevStoryNumber);
			currentWordTimes = [];
			fullSentence = "";
			nextWordX((new Date()).getTime(), '', storyNumber, wordNumber) //TODO: this line is necessary, but it's funky in turk info

		}//and display the "Ready?" ---so when they press space, the intro sentence is displayed (a word in next story)
				//(while "ready?" is displayed, when space hit, nextWordX will be called and the word in currentstory will display)

	};


$(document).keypress(function(e) {
  if(e.which == 32) {
    // spacebar pressed
    var pressTime = (new Date()).getTime();
    var wordOnScreen = $('#word').html();
    
    console.log("----------------------------------------");
    if(isRecording){
	    nextWordX(pressTime, wordOnScreen, storyNumber, wordNumber);
	}
  }
});



//start whole experiment now - from first (conscent) slide.
showNextSlide();