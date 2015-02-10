// direct replication of BGH (2014), adult condition

// structure
// practice trials: 4 trials
// main trials: 4 blocks of 8 trials each
// 1 quantifier / block (all, some, most, generic)


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
      //this.stimtype = exp.stimtype[0]; // exp.stimtype between-subjects var
      // BAD
      //this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      // BETTER
      this.stimtype = exp.stims[stim_num].context

      //this.stimtype = exp.stimtype[0]; // exp.stimtype between-subjects var

      this.stimtype == 'bare' ? this.adjective = '' : null;      
      this.stimtype == 'danger' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'distinct' ? this.adjective = 'distinctive ': null;
      this.stimtype == 'irrelevant' ? this.adjective = this.stim.extraneous + ' ': null;
      this.stimtype == 'danger-distinct' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'nondistinctive' ? this.adjective = this.stim.extraneous + ' ': null;




      var query_prompt = "What percentage of "  + this.stim.category + " do you think have " + this.adjective + this.stim.color + " " + this.stim.part + "?\n";


      this.stimtype == 'danger' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'distinct' ? this.adjective = 'distinctive ': null;
      this.stimtype == 'irrelevant' ? this.adjective = this.stim.extraneous + ' ': null;

      this.determiner=='generic' ?
        this.evidence_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n" :
        this.evidence_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n";

      this.stimtype=='danger' ? this.evidence_prompt+=this.stim.dangerous:null;
      this.stimtype=='distinct' ? this.evidence_prompt+=this.stim.distinctive:null;
      this.stimtype=='irrelevant' ? this.evidence_prompt+=this.stim.irrelevant:null;
      this.stimtype == 'danger-distinct' ? this.evidence_prompt+=(this.stim.dangerous + ' ' + this.stim.dangdistinctive):null;
      this.stimtype=='nondistinctive' ? this.evidence_prompt+=(this.stim.irrelevant + ' ' + this.stim.nondistinctive):null;



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

  slides.truth_conditions = slide({
    name: "truth_conditions",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present : _.shuffle([
                {"prevalence":"0"},
                {"prevalence":"0"},
                {"prevalence":"0.33"},
                {"prevalence":"0.33"},
                {"prevalence":"0.66"},
                {"prevalence":"0.66"},
                {"prevalence":"1"},
                {"prevalence":"1"}]),


    //this gets run only at the beginning of the block
    present_handle : function(stim_num) {
      this.startTime = Date.now();
      $(".err").hide();
      $('input[name="radio_button"]').prop('checked', false);


      var cells = ['a1','a2','a3','a4','a5','a6'];
      var papers = cells.map(function(x){return Raphael(x,200,200)});
      var morphs = [0,0,0,0,0,0];
      var creaturepaths = utils.fillArray(creaturestims["c1"],6)
      // var creaturepaths = morphs.map(function(morph){
      //   return utils.intermediatePath(creaturepath,creature2path,morph)
      // });

      var zipped = utils.zip([papers,creaturepaths]);


      var creatures = zipped.map(function(papercreature)
        {return papercreature[0].path(papercreature[1])});


      creatures.map(function(creature){
        creature.attr("fill","#00CC33"); creature.transform("s0.6")});
      // creatures.map(function(creature){
      //   creature.attr("fill","#f00");});



      $(".evidence").html(this.evidence_prompt);
      $(".query").html(this.query_prompt);

      // this.stim = exp.stims[stim_num]; // allstims should be randomized, or stim_num should be
      // this.trialNum = stim_num;

      // //  the following commands work only because there are "3 lists" of stimuli, and there are 3 exp.stimtypes (also 3 exp.deteminers)
      // //this.determiner = exp.determiner[this.stim.list] // exp.determiner already randomized, grab which stimtype corresponds to list #_this.stim
      // this.determiner = exp.determiner[0] // exp.determiner between-subjects var
      // // BAD
      // //this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      // // BETTER
      // this.stimtype = exp.stims[stim_num].context

      // //this.stimtype = exp.stimtype[0]; // exp.stimtype between-subjects var
      // this.prevalence = exp.prevalence_levels[this.stim.list].splice(0,1)[0] // grab prevalence level for this list

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

      // this.determiner=='generic' ?
      //   this.query_prompt = utils.upperCaseFirst(this.stim.category) + " have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n":
      //   this.query_prompt = utils.upperCaseFirst(this.determiner) + " " + this.stim.category +" have " + this.adjective + this.stim.color + " " + this.stim.part + ".\n";

      // this.stimtype=='danger' ? this.evidence_prompt+=this.stim.dangerous:null;
      // this.stimtype=='distinct' ? this.evidence_prompt+=this.stim.distinctive:null;
      // this.stimtype=='irrelevant' ? this.evidence_prompt+=this.stim.irrelevant:null;
      // this.stimtype == 'danger-distinct' ? this.evidence_prompt+=(this.stim.dangerous + ' ' + this.stim.dangdistinctive):null;
      // this.stimtype=='nondistinctive' ? this.evidence_prompt+=(this.stim.irrelevant + ' ' + this.stim.nondistinctive):null;



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
  var prev_levels = ["0","0","0.33","0.33","0.66","0.66","1","1"];

  exp.trials = [];
  exp.catch_trials = [];
//  exp.condition = _.sample(["truth_conditions", "implied_prevalence"]); //can randomize between subject conditions here
  exp.condition = "truth_conditions";
//  exp.stimtype = _.shuffle(["bare","danger","irrelevant"]);
//  exp.stimtype = ["bare","danger/distinct","nondistinctive"]; //because there is list1, list2, list3
  exp.determiner = _.shuffle(["generic","some","most","all"]);

  // exp.numTrials = utils.flatten(allstims).length;

  // var stims_with_context = 
  //   allstims.map(function (x) {
  //     var context_assign = _.shuffle(contexts);
  //     x[0].context = context_assign[0];
  //     x[1].context = context_assign[1];
  //     x[2].context = context_assign[2];
  //     return x;
  //     });

  // exp.stims = _.shuffle(utils.flatten(stims_with_context)); // shuffle stims

//  exp.prevalence_levels = [_.shuffle(prev_levels),_.shuffle(prev_levels),_.shuffle(prev_levels)];

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  // console.log(exp.instructions)
 // exp.structure=["i0", "two_afc","single_trial","two_afc","single_trial", "one_slider", "multi_slider", 'subj_info', 'thanks'];
   // exp.structure=["i0", "instructions", exp.condition, 
   //                      "signpost", exp.condition, 
   //                      "signpost", exp.condition,
   //                      "signpost", exp.condition,
   //                      'subj_info', 'thanks'];
   exp.structure = [exp.condition];

   // exp.structure=["i0", "instructions", exp.condition, 
   //                      'subj_info', 'thanks'];

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