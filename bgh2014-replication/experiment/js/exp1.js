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

    present : _.zip(_.shuffle([
                          {"prevalence":0}, {"prevalence":0},
                          {"prevalence":0.33},{"prevalence":0.33},
                          {"prevalence":0.66},{"prevalence":0.66},
                          {"prevalence":1},{"prevalence":1}]),
                    _.shuffle([
                      {"kind":"fish","property":"tar1","propertyName":"fangs"},{"kind":"fish","property":"tar2","propertyName":"fins"},
                      {"kind":"flower","property":"tar1","propertyName":"thorns"},{"kind":"flower","property":"tar2","propertyName":"spots"},
                      {"kind":"bug","property":"tar1","propertyName":"antennae"},{"kind":"bug","property":"tar2","propertyName":"wings"},
                      {"kind":"bird","property":"tar1","propertyName":"tails"},{"kind":"bird","property":"tar2","propertyName":"crests"}]),
                    // _.shuffle([
                    //       {"proptype":"color"}, {"proptype":"color"},
                    //       {"proptype":"color"},{"proptype":"part"},
                    //       {"proptype":"part"},{"proptype":"part"},
                    //       {"proptype":"color-part"},{"proptype":"color-part"}]),
                    _.shuffle(colors)),


    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      this.startTime = Date.now();
      this.stim = stim;

      this.stim.prevalence = this.stim[0]["prevalence"]
      this.stim.category = this.stim[1]["kind"]
      this.stim.property = this.stim[1]["property"]
      this.stim.propertyName = this.stim[1]["propertyName"]
      //this.stim.proptype = this.stim[2]["proptype"]
      this.stim.proptype = _.sample(["color","part","color-part"])

      var colorPart;

      $(".err").hide();
      //cells.map(function(x){}))
      $('input[name="radio_button"]').prop('checked', false);

      this.stim.proptype == 'part' ? 
        this.utterance = "Crullets have " + this.stim.propertyName:
        this.utterance = 'dance'

      $("#utterance").html(this.utterance);

      var scale = 0.5;
      var cells = ['svg0','svg1','svg2','svg3','svg4','svg5'];
      cells.map(function(cell){$('#'+cell).empty()});


      // stim.prototype can be color, color part, or part

      // if its color, set the color to be that color

      // if its color-part,
      // --> sample an appropriate body part
      // --> sample a color
      this.stim.proptype == 'color' ?
          this.stim.color = this.stim[2] :
          this.stim.color = "#FFFFFF"

      if (this.stim.proptype == 'color-part') {
           colorPart = _.sample(animalColorParts[this.stim.category]);
           this.stim.colorPart = colorPart[0];
           this.stim.colorPartLabel = colorPart[1];
           this.stim.colorPartColor = _.sample(colors);
         } else {
          this.stim.colorPart = null
          this.stim.colorPartLabel = "col1" //just to set it equal to something
          this.stim.colorPartColor = this.stim.color
      } // no distinguishing color)


      var genusOptions = {
        "col1":{"mean":this.stim.color},
        "col2":{"mean":this.stim.color},
        "col3":{"mean":this.stim.color},
        "col4":{"mean":this.stim.color},
        "col5":{"mean":this.stim.color},
        "tar1":0, // never has a tail
        "tar2":0, // always has a crest
        "prop1":{"mean":0, "var":0.05}, //low height variance
        "prop1":{"mean":0, "var":0.5}, //high fatness variance
        "var":0.01, //overall variance (overwritten by any specified variances)
      };

      var negGenusOptions = {
        "col1":{"mean":"#FFFFFF"},
        "col2":{"mean":"#FFFFFF"},
        "col3":{"mean":"#FFFFFF"},
        "col4":{"mean":"#FFFFFF"},
        "col5":{"mean":"#FFFFFF"},
        "tar1":0, // never has a tail
        "tar2":0, // always has a crest
        "prop1":{"mean":0, "var":0.05}, //low height variance
        "prop1":{"mean":0, "var":0.5}, //high fatness variance
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      var negGenus = new Ecosystem.Genus(this.stim.category, negGenusOptions)

      genusOptions[this.stim.colorPartLabel].mean = this.stim.colorPartColor
      this.stim.proptype == 'part' ? genusOptions[this.stim.property] = 1 : null
      var genus = new Ecosystem.Genus(this.stim.category, genusOptions)


      var animalsWithProperties = Math.round(this.stim.prevalence*6)
      var properties = _.shuffle(utils.fillArray(true,animalsWithProperties).concat(
                                 utils.fillArray(false,6-animalsWithProperties)))




      // console.log(properties)
      // console.log(negGenus.propsAndParams)
      _.zip(cells,properties).map(function(x){x[1] ? 
                                            genus.draw(x[0], {}, scale):
                                            negGenus.draw(x[0],{}, scale)});

       console.log(this.stim.prevalence, this.stim.property)
       console.log(this.stim.proptype)
       console.log(this.stim.colorPartColor)
       console.log(this.stim.colorPartLabel)

      // _.zip(cells,properties).map(function(x){x[1]=="tar1" ? 
      //                                       genus.draw(x[0],{"tar1":1}, scale):
      //                                         x[1]=="tar2" ?
      //                                        genus.draw(x[0],{"tar2":1}, scale):
      //                               genus.draw(x[0],{}, scale)});


     // $(".query").html(this.query_prompt);

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
   //     "stim_category": this.stim.category,
   //     "stim_color": this.stim.color,
   //     "stim_part":this.stim.part
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