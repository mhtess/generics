// so called elicitation task...

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      $("#total-num").html(exp.numTrials);  
     }
  });

  slides.cbg_instructions = slide({
    name : "cbg_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.elaborate_instructions = slide({
    name : "elaborate_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.implied_prevalence = slide({
    name: "implied_prevalence",

    present : _.range(exp.numTrials),
    //this gets run only at the beginning of the block
    present_handle : function(stim_num) {
      this.startTime = Date.now();

      $(".err").hide();
      $("#text_response").val('')

      this.stim = exp.stims[stim_num]; // allstims should be randomized, or stim_num should be
      this.trialNum = stim_num;
      this.prevalence = exp.prevalence_levels[this.stim.list].splice(0,1)[0] // grab prevalence level for this list

      // OBSOLETE
      //  the following commands work only because there are "3 lists" of stimuli, and there are 3 exp.stimtypes (also 3 exp.deteminers)
      //this.determiner = exp.determiner[this.stim.list] // exp.determiner already randomized, grab which stimtype corresponds to list #_this.stim
 //     this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      // NEW
    //  this.stimtype = exp.stimtype[stim_num%10][this.stim.list]
      this.stimtype = exp.stims[stim_num].context

      this.stimtype == 'bare' ? this.adjective = '' : null;      
      this.stimtype == 'danger' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'distinct' ? this.adjective = 'distinctive ': null;
      this.stimtype == 'irrelevant' ? this.adjective = this.stim.extraneous + ' ': null;
      this.stimtype == 'danger-distinct' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'nondistinctive' ? this.adjective = this.stim.extraneous + ' ': null;

      //console.log(this.stimtype)

      //var query_prompt = "What percentage of animals do you think have " + this.stim.color + " " + this.stim.part + "?\n";

      // if (exp.condition=='catprop'){
      //   //this.evidence_prompt =  "A different team has recently reported finding an animal with "+ this.adjective + this.stim.color + " " + this.stim.part + " on the island. \n"
      //   var query_prompt = "In your expert opinion, what percentage of animals on this island do you think have " + 
      //                       this.adjective + this.stim.color + " " + this.stim.part + "?\n";
      // } else{
       /// this.evidence_prompt = utils.upperCaseFirst(this.stim.color) + " " + this.stim.part + " "
        var query_prompt = "The island has 100,000 other animals on it. How many <strong>other animals</strong> do you think have " + this.adjective + 
                          this.stim.color + " " + this.stim.part + "?\n";
      // }
      this.evidence_prompt = this.prevalence+ "% of "  + this.stim.category + " have " + this.adjective + 
                              this.stim.color + " " + this.stim.part + ".\n";

      this.stimtype=='danger' ? this.evidence_prompt+=this.stim.dangerous:null;
      this.stimtype=='distinct' ? this.evidence_prompt+=this.stim.distinctive:null;
      this.stimtype=='irrelevant' ? this.evidence_prompt+=this.stim.irrelevant:null;

      // this.stimtype=='danger-distinct' ? this.evidence_prompt+=(utils.upperCaseFirst(this.stim.color) + " " + this.stim.part + " " + 
      //   this.stim.dangerfrag +" "+ this.stim.distinctgen):null;

      // this.stimtype=='nondistinctive' ? this.evidence_prompt+=( utils.upperCaseFirst(this.stim.color)+ " " +
      //           this.stim.irrelevant.substr(this.stim.irrelevant.indexOf(" ") + 1)  + ' ' + 
      //           "Other animals " + this.stim.nondistinctive.split(' ').slice(2).join(' ')):null;

      this.stimtype=='danger-distinct' ? this.evidence_prompt+=(this.stim.dangerous + " " + this.stim.dangdistinctive):null;

      this.stimtype=='nondistinctive' ? this.evidence_prompt+=(this.stim.irrelevant + " " + this.stim.nondistinctive):null;



      // if (exp.condition=='catprop'){
      //   this.evidence_prompt+= " Your team just identified a new animal on the island, which they're calling " + this.stim.category + ".";
      // };


      $(".evidence").html(this.evidence_prompt);
      $(".query").html(query_prompt);

       // this.init_radiios();
       // exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      response = $("#text_response").val();
      if (!(response<=100000 && response>=0 && response!='')) {
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
        "trial_type" : "prior_elicitation",
        "trial_prompt" : exp.condition,
        "trial_num": this.trialNum,
        "response" : $("#text_response").val(),
        "rt":this.rt,
        "stim_type": this.stimtype,
        "stim_determiner": this.determiner,
        "stim_category": this.stim.category,
        "stim_color": this.stim.color,
        "stim_part":this.stim.part,
        "stim_prev":this.prevalence
      });
    }
  });

  slides.truth_conditions = slide({
    name: "truth_conditions",


    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.range(exp.numTrials),

    //this gets run only at the beginning of the block
    present_handle : function(stim_num) {
      this.startTime = Date.now();
      $(".err").hide();
      $('input[name="radio_button"]').prop('checked', false);

      this.stim = exp.stims[stim_num]; // allstims should be randomized, or stim_num should be
      this.trialNum = stim_num;

      //  the following commands work only because there are "3 lists" of stimuli, and there are 3 exp.stimtypes (also 3 exp.deteminers)
      this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      this.determiner = exp.determiner[this.stim.list] // exp.determiner already randomized, grab which stimtype corresponds to list #_this.stim

      this.prevalence = exp.prevalence_levels[this.stim.list].splice(0,1)[0] // grab prevalence level for this list
      
      var evidence_prompt = this.prevalence+ "% of "  + this.stim.category + " have " + this.stim.color + " " + this.stim.part + ".\n";

      if (this.determiner=='generic'){
        var query_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.stim.color + " " + this.stim.part + ".\n";
      }
      else{
        var query_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.stim.color + " " + this.stim.part + ".\n";
      }

      if (this.stimtype == 'danger'){
        evidence_prompt+=this.stim.danger +"\n No other animals on this island have this kind of " + this.stim.part
      }

      if (this.stimtype == 'irrelevant'){
        evidence_prompt+=this.stim.irrelevant +"\n Other animals on this island also have this kind of " + this.stim.part
      }

      $(".evidence").html(evidence_prompt);
      $(".query").html(query_prompt);

       // this.init_radiios();
       // exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (!($("input:radio[name=radio_button]").is(":checked"))) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "truth_conditions",
        "trialNum":this.trialNum,
        "response" : $("input:radio[name=radio_button]:checked").val(),
        "rt":this.rt,
        "stim_type": this.stimtype,
        "stim_prevalence": this.prevalence,
        "stim_determiner": this.determiner,
        "stim_category": this.stim.category,
        "stim_color": this.stim.color,
        "stim_part":this.stim.part
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
        comments : $("#comments").val(),
      };
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

  var prev_levels = ["10","10","30","30","50","50","70","70","90","90"];
  var contexts = ["bare","danger-distinct","nondistinctive"];
  //var all_contexts = utils.flatten(contexts.map(function(x) {return utils.fillArray(x,10);}));
  //var all_contexts = utils.fillArray(contexts,10) // 10 item types (e.g. tails) x 3 lists
  //all_contexts = all_contexts.map(function(x) {return _.shuffle(x);}) // for each item, each list is randomly assigned

  exp.trials = [];
  exp.catch_trials = [];
  // one between subjects condition:
  // original cover story vs. elaborate cover story
  // original cs paired with a Plain presentation of prior elicitation, which is basically
  //  cbg minus the evidence sentence
  // elaborate cs paired with evidence about category and property
  exp.instructions = _.sample(["cbg_instructions","elaborate_instructions"])//can randomize between subject conditions here
  exp.instructions = "elaborate_instructions";
  if (exp.instructions=='cbg_instructions'){
    exp.condition = "plain"
  } else {
    exp.condition = "catprop"
  }

//  exp.stimtype = _.shuffle(["bare","danger-distinct","nondistinctive"]); //because there is list1, list2, list3
 // exp.stimtype = all_contexts;

//  exp.determiner = _.shuffle(["generic","some","most"]);

  exp.numTrials = utils.flatten(allstims).length;
  var stims_with_context = 
    allstims.map(function (x) {
      var context_assign = _.shuffle(contexts);
      x[0].context = context_assign[0];
      x[1].context = context_assign[1];
      x[2].context = context_assign[2];
      return x;
      });
//  exp.numTrials = 20;

  exp.stims = _.shuffle(utils.flatten(stims_with_context)); // shuffle stims
  exp.prevalence_levels = [_.shuffle(prev_levels),_.shuffle(prev_levels),_.shuffle(prev_levels)];

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
 // exp.structure=["i0", "instructions","two_afc","single_trial","two_afc","single_trial", "one_slider", "multi_slider", 'subj_info', 'thanks'];
   exp.structure=["i0",exp.instructions,"implied_prevalence",'subj_info', 'thanks'];
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