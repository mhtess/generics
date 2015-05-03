// so called elicitation task...
// histogrammed sliders

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
      for (i=0; i<exp.numKinds; i++){
        $("#text_response"+i).val('')
      }


      this.stims = exp.stims.slice(stim_num*exp.numKinds,stim_num*exp.numKinds+exp.numKinds);

      // pick the first "stim" to grab attributes
      this.stim = this.stims[0]
      this.trialNum = stim_num;
      this.stimtype = this.stim.context;


      this.stimtype == 'bare' ? this.adjective = '' : null;      
      this.stimtype == 'danger' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'distinct' ? this.adjective = 'distinctive ': null;
      this.stimtype == 'irrelevant' ? this.adjective = this.stim.extraneous + ' ': null;
      this.stimtype == 'danger-distinct' ? this.adjective = 'dangerous ' : null;
      this.stimtype == 'nondistinctive' ? this.adjective = this.stim.extraneous + ' ': null;



       var query_prompt = "What percentage of <em>" + this.stims[0].category + "</em> do you think has <strong>" + 
        this.adjective + this.stim.color + " " + this.stim.part + "</strong>?\n";

      this.danger = (utils.upperCaseFirst(this.stim.color)+ " " +this.stim.dangerous.substr(this.stim.dangerous.indexOf(" ") + 1));
      this.irrelevant = (utils.upperCaseFirst(this.stim.color)+ " " +this.stim.irrelevant.substr(this.stim.irrelevant.indexOf(" ") + 1));
      this.nondistinct = "More than " + this.stim.distinctgen.substr(this.stim.distinctgen.indexOf(" ") + 1);

      this.stimtype=='danger' ? this.evidence_prompt=this.danger:null;
      this.stimtype=='distinct' ? this.evidence_prompt=this.stim.distinctive:null;
      this.stimtype=='irrelevant' ? this.evidence_prompt=this.stim.irrelevant:null;
      this.stimtype=='danger-distinct' ? this.evidence_prompt=(this.danger + " " + this.stim.distinctgen):null;
      this.stimtype=='nondistinctive' ? this.evidence_prompt=(this.irrelevant + " " + this.nondistinct):null;
      this.stimtype=='bare' ? this.evidence_prompt="":null;





      $(".evidence").html(this.evidence_prompt);
      $("#vertical_question").html(query_prompt);

      for (i=0; i<exp.numKinds; i++){
        $("#kindName").html("<em>"+utils.upperCaseFirst(this.stims[i].category)+"</em>")
      };

       // this.init_radiios();
       // exp.sliderPost = null; //erase current slider value


      // this.bins = ["0% - 10%", "10% - 20%", "20% - 30%", "30% - 40%", "40% - 50%",
      //             "50%-60%", "60% - 70%", "70% - 80%", "80% - 90%", "90% - 100%"];

      this.bins = [
          {
            "min" : 0,
            "max" : 10
          },
          {
            "min" : 10,
            "max" : 20
          },
          {
            "min" : 20,
            "max" : 30
          },
          {
            "min" : 30,
            "max" : 40
          },
          {
            "min" : 40,
            "max" : 50
          },
          {
            "min" : 50,
            "max" : 60
          },
                    {
            "min" : 60,
            "max" : 70
          },
                    {
            "min" : 70,
            "max" : 80
          },
                    {
            "min" : 80,
            "max" : 90
          },
                    {
            "min" : 90,
            "max" : 100
          }
        ]


      this.binsredux = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

      exp.bin_order=='hi2lo' ? this.bins = this.bins.reverse() : null

      this.n_sliders = this.bins.length;

      var bin_labels = "<td></td>";
      var sliders_and_top_label = "<td class='thin'>likely</td>";
      for (var i=0; i<this.bins.length; i++) {
        bin_labels += "<td style='padding:5px 5px' class='bin_label'>" + this.bins[i].min + " - " + this.bins[i].max + "% </td>";
        sliders_and_top_label += "<td rowspan='3'><div id='vslider" + i + "' class='vertical_slider'>|</div></td>";
      }
      $("#sliders_and_top_label").html(sliders_and_top_label);
      $("#bin_labels").html(bin_labels);




      // $(".slider_row").remove();
      //   $("#multi_slider_table").append('<td class="slider_target" id="labels">' + 
      //     "very unlikely<br><br><br>very likely</td>");

      // for (var i=0; i<this.n_sliders; i++) {
      //   var bin = this.bins[i];
      //   $("#multi_slider_table").append('<td><td class="slider_target" id="sentence' +  i + 
      //     '">' + bin + '</td><td rowspan="5"><div id="slider' + i + 
      //     '" class="hslider">-------[ ]--------</div></td>');
      //   utils.match_row_height("#multi_slider_table", ".slider_target");
      // }

      // for (var i=0; i<this.n_sliders; i++) {
      //   var bin = this.bins[i];
      //   $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + 
      //     i + '">' + bin + '</td><td colspan="2"><div id="slider' + i + 
      //     '" class="slider">-------[ ]--------</div></td></tr>');
      //   utils.match_row_height("#multi_slider_table", ".slider_target");
      // }

      this.init_sliders(this.bins);
      exp.sliderPost = utils.fillArray(-1,10);//[];
    },


    button : function() {


      if (exp.sliderPost.indexOf(-1)>-1) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },

    init_sliders : function(stim) {
      for (var i=0; i<this.bins.length; i++) {
        utils.make_slider("#vslider" + i, this.make_slider_callback(i), "vertical");
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },

    log_responses : function() {
      console.log(exp.sliderPost)
        exp.data_trials.push({
          "trial_type" : "binnedHistogram",
          "bin_00" : exp.sliderPost[0],
          "bin_10" : exp.sliderPost[1],
          "bin_20" : exp.sliderPost[2],
          "bin_30" : exp.sliderPost[3],
          "bin_40" : exp.sliderPost[4],
          "bin_50" : exp.sliderPost[5],
          "bin_60" : exp.sliderPost[6],
          "bin_70" : exp.sliderPost[7],
          "bin_80" : exp.sliderPost[8],
          "bin_90" : exp.sliderPost[9],
          "trialNum": this.trialNum,
          "rt":this.rt,
          "context": this.stimtype,
          "category": this.stims[0].category,
          "color": this.stim.color,
          "part":this.stim.part,
          "binOrder":exp.bin_order
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


  //var all_contexts = utils.flatten(contexts.map(function(x) {return utils.fillArray(x,10);}));
  //var all_contexts = utils.fillArray(contexts,10) // 10 item types (e.g. tails) x 3 lists
  //all_contexts = all_contexts.map(function(x) {return _.shuffle(x);}) // for each item, each list is randomly assigned

 // exp.bin_order = _.sample(["hi2lo", "lo2hi"]);
  exp.bin_order = 'lo2hi'
  exp.numKinds = 1; // number of kinds to display per screen

  exp.trials = [];
  exp.catch_trials = [];
  // one between subjects condition:
  // original cover story vs. elaborate cover story
  // original cs paired with a Plain presentation of prior elicitation, which is basically
  //  cbg minus the evidence sentence
  // elaborate cs paired with evidence about category and property
  exp.instructions = "elaborate_instructions";
  exp.condition = "catprop"

//  exp.stimtype = _.shuffle(["bare","danger-distinct","nondistinctive"]); //because there is list1, list2, list3
 // exp.stimtype = all_contexts;
//  exp.determiner = _.shuffle(["generic","some","most"]);

//  exp.numTrials = utils.flatten(allstims).length / exp.numKinds;
  exp.numTrials = 12;

  var contexts = utils.flatten(utils.fillArray(["bare","danger-distinct","nondistinctive"],exp.numTrials/3));

  var flatstims = _.shuffle(utils.flatten(allstims)); // shuffle stims
  var context_assign = _.shuffle(contexts)

  for ( var i=0; i< exp.numTrials; i+=1 ){
    flatstims[i*exp.numKinds].context = context_assign[i]
  };

  exp.stims = flatstims;

    // allstims.map(function (x) {
    //   var context_assign = _.shuffle(contexts);
    //   x[0].context = context_assign[0];
    //   x[1].context = context_assign[1];
    //   x[2].context = context_assign[2];
    //   return x;
    //   });
//  exp.numTrials = 20;

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
   exp.structure=["i0","elaborate_instructions","implied_prevalence",'subj_info', 'thanks'];
 
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