function make_slides(f) {
  var slides = {};
  var numTrials = 30;

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      $("#total-num").html(numTrials);  
     }
  });

  slides.instructions = slide({
    name : "instructions",
    // start: function(){
    //   $("#total-num").html(15);  
    // },
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.single_trial = slide({
    name: "single_trial",
    start: function() {
      $(".err").hide();
      $(".display_condition").html("You are in " + exp.condition + ".");
    },
    button : function() {
      response = $("#text_response").val();
      if (response.length == 0) {
        $(".err").show();
      } else {
        exp.data_trials.push({
          "trial_type" : "single_trial",
          "response" : response
        });
        exp.go(); //make sure this is at the *end*, after you log your data
      }
    },
  });

  slides.two_afc = slide({
    name: "2AFC",


    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : [
      {category: "morseths", color: "silver", part: "fur", danger:"This fur sheds particles that get lodged in your lungs and make it impossible to breathe.", irrelvant:"This fur is very curly and rough to the touch."},
      {category: "blins", color: "red", part: "scales", danger:"These scales secrete a strong venom that kills you on the spot.", irrelvant:"These scales are soft, flexible, and very shiny."},
      {category: "zorbs", color: "orange", part: "tail", danger:"These tails are so long and muscular that they can suffocate you in a matter of minutes.", irrelvant:"These tails are very long and usually get curled up in a ball."},
      {category: "daiths", color: "gold", part: "stripes", danger:"These stripes deliver a powerful electric shock that's deadly to anyone within a few feet.", irrelvant:"These stripes are very thin and closely spaced"},
      {category: "moxes", color: "green", part: "shell", danger: "These shells are so heavy that they would immediately crush your bones.", irrelvant:"These shalls have an octagonal shape and are very light."},
      {category: "ludinos", color: "yellow", part: "legs", danger: "These legs are so powerful that a single blow could kill you.", irrelvant:"These legs are very long and covered with bumpy skin."},
      {category: "cheebas", color: "blue", part: "ears", danger: "These ears are the home to dangerous parasites that can make you go deaf.", irrelvant:"These ears are small and and round."},
      {category: "lorches", color: "purple", part: "feathers", danger: "These feathers are as sharp as needles and can easily get loged in you, causing massive bleeding.", irrelvant:"These feathers are wide and very smooth to the touch."},
      {category: "glippets", color: "copper", part: "spots", danger: "These spots are the home to a contagious fungus that is deadly to anyone who becomes infected with it.", irrelvant:"These spots are very sensitive and cover most of their bodies."},
      {category: "krivels", color: "pink", part: "teeth", danger: "These teeth are razor sharp and so powerful that a single bite can be lethal.", irrelvant:"These teeth are long and narrow."}
    ],

    present : [
      {category: "ollers", color: "yellow", part: "fur", danger:"This fur sheds particles that get lodged in your lungs and make it impossible to breathe.", irrelvant:"This fur is very curly and rough to the touch."},
      {category: "reesles", color: "blue", part: "scales", danger:"These scales secrete a strong venom that kills you on the spot.", irrelvant:"These scales are soft, flexible, and very shiny."},
      {category: "taifels", color: "purple", part: "tail", danger:"These tails are so long and muscular that they can suffocate you in a matter of minutes.", irrelvant:"These tails are very long and usually get curled up in a ball."},
      {category: "mooks", color: "copper", part: "stripes", danger:"These stripes deliver a powerful electric shock that's deadly to anyone within a few feet.", irrelvant:"These stripes are very thin and closely spaced"},
      {category: "luzaks", color: "orange", part: "shell", danger: "These shells are so heavy that they would immediately crush your bones.", irrelvant:"These shalls have an octagonal shape and are very light."},
      {category: "ackles", color: "silver", part: "legs", danger: "These legs are so powerful that a single blow could kill you.", irrelvant:"These legs are very long and covered with bumpy skin."},
      {category: "elleps", color: "pink", part: "ears", danger: "These ears are the home to dangerous parasites that can make you go deaf.", irrelvant:"These ears are small and and round."},
      {category: "plovs", color: "gold", part: "feathers", danger: "These feathers are as sharp as needles and can easily get loged in you, causing massive bleeding.", irrelvant:"These feathers are wide and very smooth to the touch."},
      {category: "sapers", color: "red", part: "spots", danger: "These spots are the home to a contagious fungus that is deadly to anyone who becomes infected with it.", irrelvant:"These spots are very sensitive and cover most of their bodies."},
      {category: "zoovs", color: "green", part: "teeth", danger: "These teeth are razor sharp and so powerful that a single bite can be lethal.", irrelvant:"These teeth are long and narrow."}
    ],

    present : [
      {category: "kweps", color: "copper", part: "fur", danger:"This fur sheds particles that get lodged in your lungs and make it impossible to breathe.", irrelvant:"This fur is very curly and rough to the touch."},
      {category: "dorbs", color: "yellow", part: "scales", danger:"These scales secrete a strong venom that kills you on the spot.", irrelvant:"These scales are soft, flexible, and very shiny."},
      {category: "trufts", color: "green", part: "tail",danger:"These tails are so long and muscular that they can suffocate you in a matter of minutes.", irrelvant:"These tails are very long and usually get curled up in a ball."},
      {category: "frams", color: "silver", part: "stripes", danger:"These stripes deliver a powerful electric shock that's deadly to anyone within a few feet.", irrelvant:"These stripes are very thin and closely spaced"},
      {category: "javs", color: "purple", part: "shell", danger: "These shells are so heavy that they would immediately crush your bones.", irrelvant:"These shalls have an octagonal shape and are very light."},
      {category: "feps", color: "pink", part: "legs", danger: "These legs are so powerful that a single blow could kill you.", irrelvant:"These legs are very long and covered with bumpy skin."},
      {category: "kazzes", color: "orange", part: "ears", danger: "These ears are the home to dangerous parasites that can make you go deaf.", irrelvant:"These ears are small and and round."},
      {category: "noobs", color: "red", part: "feathers", danger: "These feathers are as sharp as needles and can easily get loged in you, causing massive bleeding.", irrelvant:"These feathers are wide and very smooth to the touch."},
      {category: "stups", color: "gold", part: "spots", danger: "These spots are the home to a contagious fungus that is deadly to anyone who becomes infected with it.", irrelvant:"These spots are very sensitive and cover most of their bodies."},
      {category: "thups", color: "blue", part: "teeth", danger: "These teeth are razor sharp and so powerful that a single bite can be lethal.", irrelvant:"These teeth are long and narrow."}
    ],

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      $(".evidence").html("30% of "  + stim.category + " have " + stim.color + " " + stim.part + ".");
      $(".query").html(utils.upperCaseFirst(stim.category) + " have " + stim.color + " " + stim.part + ".");

       // this.init_radiios();
       // exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (!($("input:radio[name=radio_button]").is(":checked"))) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "2AFC",
        "response" : $("input:radio[name=radio_button]:checked").val(),
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
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["truth-conditions", "implied-prevalence"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "two_afc","single_trial", "one_slider", "multi_slider", 'subj_info', 'thanks'];
  
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