// direct replication of CBG exp 1: generics in 3 contexts {bare, dangerous and distinctive, nondistinctive control}

// proper item level randomization
// each 3 body part stimulus-set paired with a random permutation of the contexts

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      $("#total-num").html(exp.numTrials);  
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.implied_prevalence = slide({
    name: "implied_prevalence",

   // present : _.shuffle(_.range(numTrials)),
  present : _.range(exp.numTrials),
    //this gets run only at the beginning of the block
    present_handle : function(stim_num) {
      this.startTime = Date.now();

      $(".err").hide();
      $("#text_response").val('')

      this.stim = exp.stims[stim_num]; // allstims should be randomized, or stim_num should be
      this.trialNum = stim_num;

      //  the following commands work only because there are "3 lists" of stimuli, and there are 3 exp.stimtypes (also 3 exp.deteminers)
      //this.determiner = exp.determiner[this.stim.list] // exp.determiner already randomized, grab which stimtype corresponds to list #_this.stim
      this.determiner = exp.determiner[0] // exp.determiner between-subjects var
      this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      //this.stimtype = exp.stimtype[0]; // exp.stimtype between-subjects var

      var query_prompt = "What percentage of "  + this.stim.category + " do you think have " + this.stim.color + " " + this.stim.part + "?\n";


      this.stimtype == 'danger' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'distinct' ? this.adjective = 'distinctive ': null;
      this.stimtype == 'irrelevant' ? this.adjective = this.stim.extraneous + ' ': null;

      this.determiner=='generic' ?
        this.evidence_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n" :
        this.evidence_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n";

      this.stimtype=='danger' ? this.evidence_prompt+=this.stim.dangerous:null;
      this.stimtype=='distinct' ? this.evidence_prompt+=this.stim.distinctive:null;
      this.stimtype=='irrelevant' ? this.evidence_prompt+=this.stim.irrelevant:null;


      $(".evidence").html(this.evidence_prompt);
      $(".query").html(query_prompt);

       // this.init_radiios();
       // exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      response = $("#text_response").val();
      if (!(response<=100 && response>=0 && response!='')) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);


      //   exp.data_trials.push({
      //     "trial_type" : "single_trial",
      //     "response" : response
      //   });
      //   exp.go(); //make sure this is at the *end*, after you log your data
      // }
      }

    },

        log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "implied_prevalence",
        "trial_num": this.trialNum,
        "response" : $("#text_response").val(),
        "rt":this.rt,
        "stim_type": this.stimtype,
        "stim_determiner": this.determiner,
        "stim_category": this.stim.category,
        "stim_color": this.stim.color,
        "stim_part":this.stim.part
      });
    }
  });

  slides.generalization = slide({
    name: "generalization",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.range(exp.numTrials),

    //this gets run only at the beginning of the block
    present_handle : function(stim_num) {
      this.startTime = Date.now();
      $(".err").hide();

      // $('input[name="radio_button1"]').prop('checked', false);
      // $('input[name="radio_button2"]').prop('checked', false);

      this.stim = exp.stims[stim_num]; // allstims should be randomized, or stim_num should be
      this.trialNum = stim_num;


      //  the following commands work only because there are "3 lists" of stimuli, and there are 3 exp.stimtypes (also 3 exp.deteminers)
      //this.determiner = exp.determiner[this.stim.list] // exp.determiner already randomized, grab which stimtype corresponds to list #_this.stim
      this.word = this.stim.word // exp.determiner between-subjects var
      // BAD
      //this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      // BETTER
      this.stimtype = this.stim.property_type
      //this.prevalence = exp.stims[stim_num].prevalence

    //  this.prevalence = exp.prev_levels[]

      //this.stimtype = exp.stimtype[0]; // exp.stimtype between-subjects var
  //    this.prevalence = exp.prevalence_levels[this.stim.list].splice(0,1)[0] // grab prevalence level for this list

      // this.stimtype == 'bare' ? this.adjective = '' : null;      
      // this.stimtype == 'danger' ? this.adjective = 'dangerous ' : null;
      // this.stimtype == 'distinct' ? this.adjective = 'distinctive ': null;
      // this.stimtype == 'irrelevant' ? this.adjective = this.stim.extraneous + ' ': null;
      // this.stimtype == 'danger-distinct' ? this.adjective = 'dangerous ' : null;
      // this.stimtype == 'nondistinctive' ? this.adjective = this.stim.extraneous + ' ': null;

      // this.evidence_prompt = this.prevalence+ "% of "  + this.stim.category + " have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n";

      // if (this.determiner=='generic'){
      //   var query_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.stim.color + " " + this.stim.part + ".\n";
      // }
      // else{
      //   var query_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.stim.color + " " + this.stim.part + ".\n";
      // }

      // if (this.stimtype == 'danger'){
      //   evidence_prompt+=this.stim.danger +"\n No other animals on this island have this kind of " + this.stim.part
      // }

      // if (this.stimtype == 'irrelevant'){
      //   evidence_prompt+=this.stim.irrelevant +"\n Other animals on this island also have this kind of " + this.stim.part
      // }

      // this.determiner=='generic' ?
      //   (this.stimtype=='bare' ?
      //     this.query_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.stim.color + " " + this.stim.part + ".\n" :
      //     this.query_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n"
      //     ) :
      //   (this.stimtype=='bare' ?
      //     this.query_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.stim.color + " " + this.stim.part + ".\n":
      //     this.query_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n"
      //   );
    
     var speaker1 = (exp.qud == 'property') ? 
      "I was walking in the park the other day, and I came across an animal with " + this.stim.property + ". <strong>What has " + this.stim.property +"?</strong>" :
      "I was talking with my friend the other day, and I could not remember anything about "+ this.stim.category + ".  <strong>Tell me about " + this.stim.category + ".</strong>"


    var speaker2 = (this.word=='generic') ?
        utils.upperCaseFirst(this.stim.category) + " have " + this.stim.property + ".\n":
        utils.upperCaseFirst(this.word) + " " + this.stim.category +" have " + this.stim.property + ".\n";

      // this.stimtype=='danger' ? this.evidence_prompt+=this.stim.dangerous:null;
      // this.stimtype=='distinct' ? this.evidence_prompt+=this.stim.distinctive:null;
      // this.stimtype=='irrelevant' ? this.evidence_prompt+=this.stim.irrelevant:null;
      // this.stimtype == 'danger-distinct' ? this.evidence_prompt+=(this.stim.dangerous + ' ' + this.stim.dangdistinctive):null;
      // this.stimtype=='nondistinctive' ? this.evidence_prompt+=(this.stim.irrelevant + ' ' + this.stim.nondistinctive):null;




      $("#speaker1").html(exp.speakers[stim_num*2]+ ' says: "'+ speaker1 +'"');
      $("#speaker2").html(exp.speakers[stim_num*2+1]+ ' says: "'+ speaker2 +'"');

      //  this.n_sliders = 1;//exp.numKinds;
      // $(".slider_row").remove();
      // for (var i=0; i<this.n_sliders; i++) {
      //   var sentence = '';
      //   $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
      //   utils.match_row_height("#multi_slider_table", ".slider_target");
      // }

      // this.init_sliders(this.n_sliders);
      // // exp.sliderPost = [];



      // var sentences = {
      //   "prevalence": "A large number of " + this.stim.category + " have " + this.stim.color + " " + this.stim.part + ", compared to other animals on this island.",
      //   "salience":  utils.upperCaseFirst(this.stim.color) + " " +this.stim.part + " "+ isare+ " an important aspect of " + this.stim.category + ", compared to other aspects of "+ this.stim.category +".",
      // };


      // // RADIO BUTTON DEPENDENT MEASURE
      // $("#paraphrase1").html(sentences[exp.sentence_order[0]])
      // $("#paraphrase2").html(sentences[exp.sentence_order[1]])






      $(".slider_row").remove();

      // FIRST QUESTION
      // $("#query1").html("How well did Robert answer Justine's request?");
      // var firstqueryendpoints = ["not a very good answer","a very good answer"];

      // $("#multi_slider_table0").append('<tr class="slider_row"><td class="slider_target" id="sentence0">'+firstqueryendpoints[0] +'</td><td colspan="2"><div id="slider0" class="slider">-------[ ]--------</div></td><td class="slider_targetright">'+firstqueryendpoints[1]+'</td></tr>');
      // utils.match_row_height("#multi_slider_table0", ".slider_target");


      // SECOND QUESTION
       var isare = ''
          this.stim.property.split(' ')[1] == 'fur' ? isare = 'does' : isare = 'do';

      var query_prompt = this.stim.query=='prevalence' ? 
       "What percentage of "  + this.stim.category + " do you think have " + this.stim.property + "?\n" :
       "Consider other possible characteristics of " + this.stim.category + ". How "+ isare + " "+ this.stim.property + " rank among all the other characteristics in terms of importance?"

      $("#query1").html(query_prompt);

      this.stim.query=='prevalence' ?
        $("#query1").css("padding-right","200px"):
        $("#query1").css("padding-right","150px")


      var endpoints = this.stim.query=='prevalence' ? 
        ["0%","100%"] :
        ["not a very important characteristic","a very important characteristic"]


      $("#multi_slider_table0").append('<tr class="slider_row"><td class="slider_target" id="sentence0">'+endpoints[0] +'</td><td colspan="2"><div id="slider0" class="slider">-------[ ]--------</div></td><td class="slider_targetright">'+endpoints[1]+'</td></tr>');
      utils.match_row_height("#multi_slider_table0", ".slider_target");


      this.n_sliders = 1;
      this.init_sliders(this.n_sliders);
      exp.sliderPost = utils.fillArray(-1,this.n_sliders);

    },

    // SLIDER DEPENDENT MEASURE
    button : function() {
      if (exp.sliderPost.indexOf(-1)>-1) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },
    init_sliders : function(n_sliders) {
      for (var i=0; i<n_sliders; i++) {
      //  var sentence_type = this.sentence_types[i];
        utils.make_slider("#slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },

    // RADIO BUTTON DEPENDENT MEASURE
    // button : function() {
    //   if ((!($("input:radio[name=radio_button1]").is(":checked"))) ||
    //     (!($("input:radio[name=radio_button2]").is(":checked")))) {
    //     $(".err").show();
    //   } else {
    //     this.rt = Date.now() - this.startTime;
    //     this.log_responses();

    //     /* use _stream.apply(this); if and only if there is
    //     "present" data. (and only *after* responses are logged) */
    //     _stream.apply(this);
    //   }
    // },



    log_responses : function() {

      // var response_label0 = exp.sentence_order[0];
      // var response_label1 = exp.sentence_order[1];

      exp.data_trials.push({
        "trial_type" : "generalization",
        "trialNum":this.trialNum,
        "response" : exp.sliderPost[0], // slider dependent measure
        // response_label0 : $("input:radio[name=radio_button1]:checked").val(), // radio button dependent measure
        // response_label1 : $("input:radio[name=radio_button2]:checked").val(), // radio button dependent measure
        "rt":this.rt,
        "qud":exp.qud,
        "query":this.stim.query,
        "word": this.word,
        "stimtype": this.stimtype,
        "category": this.stim.category,
        "property": this.stim.property
      });
    }
  });

  slides.one_slider = slide({
    name : "one_slider",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : [
      {subject: "dog", object: "ball"},
      {subject: "cat", object: "windowsill"},
      {subject: "bird", object: "shiny object"},
    ],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      $(".prompt").html(stim.subject + "s like " + stim.object + "s.");
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "one_slider",
        "response" : exp.sliderPost
      });
    }
  });

  slides.multi_slider = slide({
    name : "multi_slider",
    present : _.shuffle([
      {"critter":"Wugs", "property":"fur"},
      {"critter":"Blicks", "property":"fur"}
    ]),
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim; //FRED: allows you to access stim in helpers

      this.sentence_types = _.shuffle(["generic", "negation", "always", "sometimes", "usually"]);
      var sentences = {
        "generic": stim.critter + " have " + stim.property + ".",
        "negation": stim.critter + " do not have " + stim.property + ".",
        "always": stim.critter + " always have " + stim.property + ".",
        "sometimes": stim.critter + " sometimes have " + stim.property + ".",
        "usually": stim.critter + " usually have " + stim.property + "."
      };

      this.n_sliders = this.sentence_types.length;
      $(".slider_row").remove();
      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + sentence + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
        utils.match_row_height("#multi_slider_table", ".slider_target");
      }

      this.init_sliders(this.sentence_types);
      exp.sliderPost = [];
    },

    button : function() {
      if (exp.sliderPost.length < this.n_sliders) {
        $(".err").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },

    init_sliders : function(sentence_types) {
      for (var i=0; i<sentence_types.length; i++) {
        var sentence_type = sentence_types[i];
        utils.make_slider("#slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.sentence_types.length; i++) {
        var sentence_type = this.sentence_types[i];
        exp.data_trials.push({
          "trial_type" : "multi_slider",
          "sentence_type" : sentence_type,
          "response" : exp.sliderPost[i]
        });
      }
    },
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val(),
        comments : $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.debrief =  slide({
    name : "debrief",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.catch_trials.push({
        debrief : $("#importance_debrief").val()
      });

      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "qud":exp.qud,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  //var prev_levels = ["10","10","30","30","50","50","70","70","90","90"];
  var contexts = ["bare","danger","distinct"];
  // exp.prev_levels = {"bare":_.shuffle(["5","15","25","35","45","55","65","75","85","95"]),
  //                   contexts[1]:_.shuffle(["5","15","25","35","45","55","65","75","85","95"]),
  //                   contexts[2]:_.shuffle(["5","15","25","35","45","55","65","75","85","95"])};

  exp.sentence_order = _.shuffle(["prevalence","salience"]);
  exp.qud = _.sample(["category","property"])

  // var unique_stimuli = [
  // {"word":"generic","query":"prevalence","property_class":"biological"},
  // {"word":"generic","query":"salience","property_class":"biological"},
  // {"word":"generic","query":"prevalence","property_class":"accidental"},
  // {"word":"generic","query":"salience","property_class":"accidental"},
  
  // {"word":"most","query":"prevalence","property_class":"biological"},
  // {"word":"most","query":"salience","property_class":"biological"},
  // {"word":"most","query":"prevalence","property_class":"accidental"},
  // {"word":"most","query":"salience","property_class":"accidental"},
  
  // {"word":"all","query":"prevalence","property_class":"biological"},
  // {"word":"all","query":"salience","property_class":"biological"},
  // {"word":"all","query":"prevalence","property_class":"accidental"},
  // {"word":"all","query":"salience","property_class":"accidental"},

  // {"word":"some","query":"prevalence","property_class":"biological"},
  // {"word":"some","query":"salience","property_class":"biological"},
  // {"word":"some","query":"prevalence","property_class":"accidental"},
  // {"word":"some","query":"salience","property_class":"accidental"}
  // ];

  var unique_stimuli = [
  {"word":"generic","query":"prevalence","property_class":"biological"},
  {"word":"generic","query":"salience","property_class":"biological"},
  
  {"word":"most","query":"prevalence","property_class":"biological"},
  {"word":"most","query":"salience","property_class":"biological"},
  
  {"word":"all","query":"prevalence","property_class":"biological"},
  {"word":"all","query":"salience","property_class":"biological"},
  {"word":"some","query":"prevalence","property_class":"biological"},
  {"word":"some","query":"salience","property_class":"biological"}
  ];

  exp.speakers = _.shuffle(["Robert","Justine","Erin","Desmond","Daniel","Kyle","Claire",
  "Sara","Karen","Rosemary","Josiah","Sal","Sid","Kyla","Molly","Judith","Gregory",
  "Nathan","Val","Sophie","Barbara","Alex","Allison","Tom","Josh","Carrie","Ken","Mary","Brandon",
  "Maria","Albert","James"])


  var stimtypes = _.shuffle(_.flatten([unique_stimuli, unique_stimuli]));

  // var accidental_stims = _.map(_.shuffle(accidental).slice(0,16),
  //   function(x){return {"property_type":"accidental","property":x}})

  // choose a random list for the color properties and a random list for the "extraneous" property
  var color_other_stim_lists = _.sample([0,1,2],2)

  var stims_color_and_other = allstims.map(function(x){
    var color = x[color_other_stim_lists[0]].color + ' ' + x[color_other_stim_lists[0]].part
    var colorstim = {"property_type":"color",
                  "property":color};
    var other = x[color_other_stim_lists[1]].extraneous + ' ' + x[color_other_stim_lists[1]].part;
    var otherbiostim = {"property_type":"otherbio",
                  "property":other}
    return [colorstim,otherbiostim]
  })

  stims_color_and_other = _.flatten(_.shuffle(stims_color_and_other).slice(0,8))

  var stims_color_other_accidental = _.shuffle(stims_color_and_other)
  // var stims_color_other_accidental = _.shuffle(_.flatten([accidental_stims, stims_color_and_other]))
  console.log(_.map(stims_color_other_accidental, function(x){return x.property}))


  var totalStims = 16
  var creatures = _.map(_.shuffle(creatureNames),function(x){return {"category":x.category}}).slice(0,totalStims)

  var zippedStim = _.zip(stimtypes, stims_color_other_accidental, creatures)

//  console.log(_.map(x, function(x){return x[1].property}))
//  debugger;
// each entry has a "word", "query", "property" and a property_type tag
  exp.stims = _.map(zippedStim,
    function(pieces){return {"word":pieces[0].word,
                            "query":pieces[0].query,
                            "property_class":pieces[0].property_class,
                            "property_type":pieces[1].property_type,
                            "property":pieces[1].property,
                            "category":pieces[2].category}});


//  console.log(_.map(y, function(x){return x.property}))

  console.log(_.map(exp.stims, function(x){return x.property}))

  var stims_with_context =
    allstims.map(function (x) {
      var context_assign = _.shuffle(contexts);
      x[0].context = context_assign[0];
     // x[0].prevalence = exp.prev_levels[0]
      x[1].context = context_assign[1];
      x[2].context = context_assign[2];
      return x;
      });


  exp.trials = [];
  exp.catch_trials = [];
//  exp.condition = _.sample(["truth_conditions", "implied_prevalence"]); //can randomize between subject conditions here
  exp.condition = "generalization";
//  exp.stimtype = _.shuffle(["bare","danger","irrelevant"]);
//  exp.stimtype = ["bare","danger/distinct","nondistinctive"]; //because there is list1, list2, list3
//  exp.determiner = _.shuffle(["generic","some","most"]);
//  exp.determiner = ["generic","generic","generic"];
//  exp.instructions = "elaborate_instructions";

  exp.numTrials = exp.stims.length;

//  exp.prevalence_levels = [_.shuffle(prev_levels),_.shuffle(prev_levels),_.shuffle(prev_levels)];
 // debugger;

  // var stims_with_context = []
  // for (i = 0; i < allstims.length; i++){
  //   var context_assign = _.shuffle(contexts);
  //   allstims[i][0].context = context_assign[0]
  //   allstims[i][1].context = context_assign[1]
  //   allstims[i][2].context = context_assign[2]
  //   allstims[i][0].prevalence = prev_levels[0][i]
  //   allstims[i][1].prevalence = prev_levels[1][i]
  //   allstims[i][2].prevalence = prev_levels[2][i]
  // }
  // var stims_with_context = allstims


  // var stims_with_context =
  //   allstims.map(function (x) {
  //     var context_assign = _.shuffle(contexts);
  //     x[0].context = context_assign[0];
  //    // x[0].prevalence = exp.prev_levels[0]
  //     x[1].context = context_assign[1];
  //     x[2].context = context_assign[2];
  //     return x;
  //     });

  // exp.stims = _.shuffle(utils.flatten(stims_with_context)); // shuffle stims

  // _.map(contexts,
  //   function(c){
  //   _.map(_.zip(_.filter(exp.stims, function(x){return x.context==c}),
  //         _.shuffle(prev_levels)),
  //       function(y){y[0].prevalence=y[1]})})

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  console.log(exp.instructions)
 // exp.structure=["i0", "two_afc","single_trial","two_afc","single_trial", "one_slider", "multi_slider", 'subj_info', 'thanks'];
   exp.structure=["i0", "instructions",exp.condition,'subj_info','thanks'];
 //  exp.structure=['debrief','subj_info','thanks'];

   //exp.structure=['subj_info', 'thanks'];
 
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}