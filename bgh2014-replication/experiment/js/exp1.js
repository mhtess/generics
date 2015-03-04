// directish replication of BGH (2014), adult condition

// structure
// practice trials: 4 trials
// main trials: 4 blocks of 8 trials each
// 1 quantifier / block (all, some, most, generic)


Object.prototype.getKeyByValue =function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

function mark(el, otherEls) {
    el.style.border=='' ? 
    $('#'+el.id).css({"border":'2px solid red',
                    'background-color': 'white',
                    'opacity': '1'}) : 
    $('#'+el.id).css({"border":'',
                    'background-color': 'white',
                    'opacity': '0.5'})

//el.style.border = "2px solid red": el.style.border='';

    // var tableCells = ['table0','table1','table2','table3'];
    // tableCells.splice(tableCells.indexOf(el),1)
    otherEls.map(function(cell){$('#'+cell).css({"border":'',
      'background-color': 'white','opacity': '0.5'})})

}

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      $("#total-num").html(exp.numTrials);  
     }
  });

  slides.practice_instructions = slide({
    name : "practice_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.intermediate_motivation = slide({
    name : "intermediate_motivation",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.implied_prevalence = slide({
    name: "implied_prevalence",

  present : exp.stims2.shift(),

  present_handle : function(stim) {

      ['table0','table1','table2','table3'].map(function(cell){
          $('#'+cell).css({"border":'',
                    'background-color': 'white',
                    'opacity': '1'})})


      this.stim = stim;
      this.startTime = Date.now();

      this.stim.prevalence = this.stim[0]["prevalence"]
      this.stim.category = this.stim[1]["kind"]
      this.stim.property = this.stim[1]["property"]
      this.stim.propertyName = this.stim[1]["propertyName"]
      this.stim.proptype = _.sample(["color","part","color-part"])
      this.stim.colorword = colors.getKeyByValue(this.stim[2])
      this.stim.categoryName = this.stim[3]["category"]
      this.stim.determiner = this.stim[4]
      this.stim.propSizes = this.stim[5]

      var colorPart;

      $(".err").hide();
      $("input[name=radio_button]").prop('checked', false); 


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

      this.stim.colorpartword = colors.getKeyByValue(this.stim.colorPartColor)

      this.stim.determiner == 'generic' ? 
        this.stim.np = utils.upperCaseFirst(this.stim.categoryName) :
        this.stim.np = utils.upperCaseFirst(this.stim.determiner) + " " + this.stim.categoryName

      this.stim.proptype == 'part' ? 
        this.utterance = this.stim.np + " have " + this.stim.propertyName:
        this.stim.proptype == 'color' ? 
          this.utterance = this.stim.np + " are " + this.stim.colorword:
          this.stim.proptype == 'color-part' ?
            this.utterance = this.stim.np + " have " + this.stim.colorpartword +" "+ this.stim.colorPart:
            null


      $(".utterance").html(this.utterance);


      $(".err").hide();
      $("#text_response").val('')


      var scale = 0.4;
      var cells = [['svg0a','svg1a','svg2a','svg3a','svg4a','svg5a'],
                  ['svg0b','svg1b','svg2b','svg3b','svg4b','svg5b'],
                  ['svg0c','svg1c','svg2c','svg3c','svg4c','svg5c'],
                  ['svg0d','svg1d','svg2d','svg3d','svg4d','svg5d']];

      cells.map(function(tablecells){
        tablecells.map(function(cell){$('#'+cell).empty()})});



      var genusOptions = {
        "col1":{"mean":this.stim.color},
        "col2":{"mean":this.stim.color},
        "col3":{"mean":this.stim.color},
        "col4":{"mean":this.stim.color},
        "col5":{"mean":this.stim.color},
        "tar1":0, // never has a tail
        "tar2":0, // never has a crest
        "prop1":{"mean":this.stim.propSizes[0]}, // mean size, unif(0, 0.5, 1)
        "prop2":{"mean":this.stim.propSizes[1]},
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      var negGenusOptions = {
        "col1":{"mean":"#FFFFFF"},
        "col2":{"mean":"#FFFFFF"},
        "col3":{"mean":"#FFFFFF"},
        "col4":{"mean":"#FFFFFF"},
        "col5":{"mean":"#FFFFFF"},
        "tar1":0, // never has a tail
        "tar2":0, // never has a crest
        "prop1":{"mean":this.stim.propSizes[0]}, // mean size, unif(0, 0.5, 1)
        "prop2":{"mean":this.stim.propSizes[1]},
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      var genus = new Ecosystem.Genus(this.stim.category, genusOptions)
      var negGenus = new Ecosystem.Genus(this.stim.category, negGenusOptions)

      genusOptions[this.stim.colorPartLabel].mean = this.stim.colorPartColor
      this.stim.proptype == 'part' ? genusOptions[this.stim.property] = 1 : null

      this.stim.prevalences = _.shuffle(prevalences)

      this.prevalenceCells = _.object(_.zip(['table0','table1','table2','table3'],this.stim.prevalences))
      _.map(_.zip(cells, this.stim.prevalences), function(pieces){
          var places = pieces[0];
          var prev = pieces[1];
          var animalsWithProperties = Math.round(prev*6)
          var properties = _.shuffle(utils.fillArray(true,animalsWithProperties).concat(
                                     utils.fillArray(false,6-animalsWithProperties)))
          _.zip(places,properties).map(function(x){x[1] ? 
                                            genus.draw(x[0], {}, scale):
                                            negGenus.draw(x[0],{}, scale)});
      })

    },

    button : function() {

      var responses = ['table0','table1','table2','table3'].map(
        function(cell){return $('#'+cell).css("opacity") == '1' ? 1 : 0})

      if (responses.reduce(function(a, b){return a + b;})!=1) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();

        _stream.apply(this);
      }

    },

        log_responses : function() {

      var prevObj = this.prevalenceCells
      var responses = ['table0','table1','table2','table3'].map(
        function(cell){return prevObj[cell]*($('#'+cell).css("opacity") == '1' ? 1 : 0)})

      var response = responses.reduce(function(a, b){return a + b;})

      exp.data_trials.push({
        "trial_type" : "implied_prevalence",
        "trial_num": this.trialNum,
        "response" : response,
        "rt":this.rt,
        "stim_proptype":this.stim.proptype,
        "stim_determiner": this.stim.determiner,
        "stim_category": this.stim.category,
        "stim_name": this.stim.categoryName,
        "stim_color": this.stim.colorword,
        "stim_colorpart":this.stim.colorPart,
        "stim_colorpartcolor":this.stim.colorpartword
      });
    },

    end : function() {

      this.present = exp.stims2.shift();
      //debugger;
      //exp.stims.shift();
    }

  });

  slides.truth_conditions = slide({
    name: "truth_conditions",


    present :  exp.stims1.shift(),//exp.stims[0],

    present_handle : function(stim) {

      this.startTime = Date.now();
      this.stim = stim;

      this.stim.prevalence = this.stim[0]["prevalence"]
      this.stim.category = this.stim[1]["kind"]
      this.stim.property = this.stim[1]["property"]
      this.stim.propertyName = this.stim[1]["propertyName"]
      this.stim.proptype = _.sample(["color","part","color-part"])
      this.stim.colorword = colors.getKeyByValue(this.stim[2])
      this.stim.categoryName = this.stim[3]["category"]
      this.stim.determiner = this.stim[4]
      this.stim.propSizes = this.stim[5]

      var colorPart;

      $(".err").hide();
      $("input[name=radio_button]").prop('checked', false); 


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

      this.stim.colorpartword = colors.getKeyByValue(this.stim.colorPartColor)

      this.stim.determiner == 'generic' ? 
        this.stim.np = utils.upperCaseFirst(this.stim.categoryName) :
        this.stim.np = utils.upperCaseFirst(this.stim.determiner) + " " + this.stim.categoryName

      this.stim.proptype == 'part' ? 
        this.utterance = this.stim.np + " have " + this.stim.propertyName:
        this.stim.proptype == 'color' ? 
          this.utterance = this.stim.np + " are " + this.stim.colorword:
          this.stim.proptype == 'color-part' ?
            this.utterance = this.stim.np + " have " + this.stim.colorpartword +" "+ this.stim.colorPart:
            null

      $(".utterance").html(this.utterance);

      var scale = 0.5;
      var cells = ['svg0','svg1','svg2','svg3','svg4','svg5'];
      cells.map(function(cell){$('#'+cell).empty()});

      var genusOptions = {
        "col1":{"mean":this.stim.color},
        "col2":{"mean":this.stim.color},
        "col3":{"mean":this.stim.color},
        "col4":{"mean":this.stim.color},
        "col5":{"mean":this.stim.color},
        "tar1":0, // never has a tail
        "tar2":0, // never has a crest
        "prop1":{"mean":this.stim.propSizes[0]}, // mean size, unif(0, 0.5, 1)
        "prop2":{"mean":this.stim.propSizes[1]},
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      var negGenusOptions = {
        "col1":{"mean":"#FFFFFF"},
        "col2":{"mean":"#FFFFFF"},
        "col3":{"mean":"#FFFFFF"},
        "col4":{"mean":"#FFFFFF"},
        "col5":{"mean":"#FFFFFF"},
        "tar1":0, // never has a tail
        "tar2":0, // never has a crest
        "prop1":{"mean":this.stim.propSizes[0]}, // mean size, unif(0, 0.5, 1)
        "prop2":{"mean":this.stim.propSizes[1]},
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      var negGenus = new Ecosystem.Genus(this.stim.category, negGenusOptions)

      genusOptions[this.stim.colorPartLabel].mean = this.stim.colorPartColor
      this.stim.proptype == 'part' ? genusOptions[this.stim.property] = 1 : null



      var genus = new Ecosystem.Genus(this.stim.category, genusOptions)


      var animalsWithProperties = Math.round(this.stim.prevalence*6)
      var properties = _.shuffle(utils.fillArray(true,animalsWithProperties).concat(
                                 utils.fillArray(false,6-animalsWithProperties)))


      _.zip(cells,properties).map(function(x){x[1] ? 
                                            genus.draw(x[0], {}, scale):
                                            negGenus.draw(x[0],{}, scale)});


    },
    button : function() {
      if ($("input[name=radio_button]:checked").val()==undefined) {
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
        "response" : $("input[name=radio_button]:checked").val(),
        "rt":this.rt,
        "stim_type": this.stimtype,
        "stim_prevalence": this.prevalence,
        "stim_determiner": this.determiner,
   //     "stim_category": this.stim.category,
   //     "stim_color": this.stim.color,
   //     "stim_part":this.stim.part
      });
    },

    end : function() {
      this.present = exp.stims1.shift();
      //exp.stims.shift();
    }

  });

  slides.practice_tc = slide({
    name: "practice_tc",
    present :  _.shuffle(["apples","bananas", "boat", "house"]),
    present_handle : function(stim) {

      this.startTime = Date.now();
      this.stim = stim;
      $(".err").hide();
      $("input[name=radio_button]").prop('checked', false); 
      var practiceUtterances={
        "apples":"These apples are green.",
        "bananas":"This is a picture of bananas.",
        "boat":"This boat is brown.",
        "house":"This house has a blue roof."
      };
      var practiceSolutions={
        "apples":0,
        "bananas":1,
        "boat":1,
        "house":0
      };
      this.solution = practiceSolutions[this.stim];
      this.utterance = practiceUtterances[this.stim];
      $(".practiceUtterance").html(this.utterance);
      $("#practiceImg").attr("src","stims_raw/"+this.stim+".png");
    },
    button : function() {
      if ($("input[name=radio_button]:checked").val()==undefined) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this);
      }
    },
    log_responses : function() {

      exp.data_trials.push({
        "trial_type" : "practice",
      //  "trialNum":this.trialNum,
        "response" : $("input[name=radio_button]:checked").val(),
        "correctResponse": this.solution,
        "rt":this.rt,
        "stim_type": this.stim
      });
    }
  });

  slides.practice_ip = slide({
    name: "practice_ip",
    present :  _.shuffle([{"apples":"There are 4 apples."},
        {"bananas":"There are 3 bananes."},
        {"boat":"This boat is brown."},
        {"house":"This house has a white roof."}]),
    present_handle : function(stim) {

      ['table0p','table1p','table2p','table3p'].map(function(cell){
          $('#'+cell).css({"border":'',
                    'background-color': 'white',
                    'opacity': '1'})})


      this.startTime = Date.now();
      this.stim = stim;
      this.stim.kind = Object.keys(this.stim);
      this.stim.utterance = this.stim[this.stim.kind];
      $(".err").hide();
      this.stimorder = _.shuffle(["apples","bananas", "boat", "house"]);


      $(".practiceUtterance").html(this.stim.utterance);

      _.zip(['svg0p','svg1p','svg2p','svg3p'],this.stimorder).map(function(cell){
        $('#'+cell[0]).attr("src","stims_raw/"+cell[1]+".png")
      });
        
    },
    button : function() {
      if ($("input[name=radio_button]:checked").val()==undefined) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this);
      }
    },

    button : function() {

      var responses = ['table0p','table1p','table2p','table3p'].map(
        function(cell){return $('#'+cell).css("opacity") == '1' ? 1 : 0})

      if (responses.reduce(function(a, b){return a + b;})!=1) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();

        _stream.apply(this);
      }

    },

        log_responses : function() {

      var prevObj = this.prevalenceCells
      var responses = _.zip(['table0p','table1p','table2p','table3p'],
        this.stimorder).map(
        function(cell){return ($('#'+cell[0]).css("opacity") == '1' ? cell[1] : null)})


      exp.data_trials.push({
        "trial_type" : "implied_prevalence",
        "trial_num": this.trialNum,
        "response" : responses.join(''),
        "correct": responses.join('')==this.stim.kind ? 1 : 0,
        "rt":this.rt,
        "stim_proptype":this.stim.proptype,
        "stim_determiner": this.stim.determiner,
        "stim_category": this.stim.category,
        "stim_name": this.stim.categoryName,
        "stim_color": this.stim.colorword,
        "stim_colorpart":this.stim.colorPart,
        "stim_colorpartcolor":this.stim.colorpartword
      });
    }


    // log_responses : function() {

    //   exp.data_trials.push({
    //     "trial_type" : "practice",
    //   //  "trialNum":this.trialNum,
    //     "response" : $("input[name=radio_button]:checked").val(),
    //     "correctResponse": this.solution,
    //     "rt":this.rt,
    //     "stim_type": this.stim
    //   });
    // }
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
  exp.condition = "implied_prevalence";
//  exp.stimtype = _.shuffle(["bare","danger","irrelevant"]);
//  exp.stimtype = ["bare","danger/distinct","nondistinctive"]; //because there is list1, list2, list3
  var determiners = _.shuffle([utils.fillArray("generic",8),
                              utils.fillArray("some",8),
                              utils.fillArray("most",8),
                              utils.fillArray("all",8)])

    var testdeterminers = _.shuffle([utils.fillArray("generic",2),
                              utils.fillArray("some",2),
                              utils.fillArray("most",2),
                              utils.fillArray("all",2)])
  exp.numTrials = testanimalNames.length;
  var shuffledStims = _.shuffle(testanimalNames);
  // exp.stims = [_.zip(_.shuffle(prevlevObj),_.shuffle(propertyObj),_.shuffle(colors),shuffledStims.slice(0,8), determiners.pop(),_.shuffle(propertySizes)),
  //             _.zip(_.shuffle(prevlevObj),_.shuffle(propertyObj),_.shuffle(colors),shuffledStims.slice(8,16),determiners.pop(),_.shuffle(propertySizes)),
  //             _.zip(_.shuffle(prevlevObj),_.shuffle(propertyObj),_.shuffle(colors),shuffledStims.slice(16,24),determiners.pop(),_.shuffle(propertySizes)),
  //             _.zip(_.shuffle(prevlevObj),_.shuffle(propertyObj),_.shuffle(colors),shuffledStims.slice(24,32),determiners.pop(),_.shuffle(propertySizes))];


   exp.stims1 = [_.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(0,2), testdeterminers.pop(), _.shuffle(propertytestSizes)),
              _.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(2,4),testdeterminers.pop(),_.shuffle(propertytestSizes)),
              _.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(4,6),testdeterminers.pop(),_.shuffle(propertytestSizes)),
              _.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(6,8),testdeterminers.pop(),_.shuffle(propertytestSizes))];

    var testdeterminers = _.shuffle([utils.fillArray("generic",2),
                              utils.fillArray("some",2),
                              utils.fillArray("most",2),
                              utils.fillArray("all",2)])
  exp.numTrials = testanimalNames.length;
  var shuffledStims = _.shuffle(testanimalNames);
   exp.stims2 = [_.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(0,2), testdeterminers.pop(), _.shuffle(propertytestSizes)),
              _.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(2,4),testdeterminers.pop(),_.shuffle(propertytestSizes)),
              _.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(4,6),testdeterminers.pop(),_.shuffle(propertytestSizes)),
              _.zip(_.shuffle(testprevlev),_.shuffle(testpropertyObj),_.shuffle(testcolors),shuffledStims.slice(6,8),testdeterminers.pop(),_.shuffle(propertytestSizes))];



//  exp.stims = [["a","b"],["c","d"]]; // list of blocks of stims


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
// "i0", "practice_instructions","practice","instructions",
   exp.structure=["practice_ip", exp.condition,  "intermediate_motivation", exp.condition, 
              "intermediate_motivation", exp.condition, "intermediate_motivation", exp.condition, 
                        'subj_info', 'thanks'];
   // exp.structure=["i0",  "instructions", exp.condition, exp.condition, 
   //           exp.condition, exp.condition, 
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