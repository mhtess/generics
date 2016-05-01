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

  slides.practice_ip_instructions = slide({
    name : "practice_ip_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.ip_instructions = slide({
    name : "ip_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.practice_tc_instructions = slide({
    name : "practice_tc_instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.tc_instructions = slide({
    name : "tc_instructions",
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


  slides.truth_conditions = slide({
    name: "truth_conditions",


    present :  exp.stims,//exp.stims[0],

    present_handle : function(stim) {

      this.startTime = Date.now();
      this.stim = stim;

      this.stim.proptype = _.sample(["part","color-part"])
      this.stim.colorTag = colors[this.stim.color]

      var colorPart;

      $(".err").hide();
      $("input[name=radio_button]").prop('checked', false); 


      // stim.prototype can be color, color part, or part
      // if its color, set the color to be that color
      // if its color-part,
      // --> sample an appropriate body part
      // --> sample a color
      this.stim.proptype == 'color' ?
          null :
          this.stim.color = "#FFFFFF"

      if (this.stim.proptype == 'color-part') {
           colorPart = _.sample(animalColorParts[this.stim.kind]);
           this.stim.colorPart = colorPart[0];
           this.stim.colorPartLabel = colorPart[1];
           this.stim.colorPartColor = _.sample(colors);
         } else {
          this.stim.colorPart = null
          this.stim.colorPartLabel = "col1" //just to set it equal to something
          this.stim.colorPartColor = this.stim.color
      } // no distinguishing color)

    
      this.stim.colorpartword = colors.getKeyByValue(this.stim.colorPartColor)

      this.stim.np = this.stim.determiner == 'generic' ? 
         utils.upperCaseFirst(this.stim.category) :
         utils.upperCaseFirst(this.stim.determiner) + " " + this.stim.category

      this.stim.feature = this.stim.proptype == 'part' ? this.stim.propertyName : 
                      this.stim.proptype == 'color-part' ? this.stim.colorpartword +" "+ this.stim.colorPart:
                      this.stim.proptype == 'color' ? this.stim.colorword +" bodies":
                      "[[feature error]]"

      this.stim.originStory = generateOrigins[this.stim.origins](this.stim.np, this.stim.feature)
      this.stim.eventStory = eventOutcomes[this.stim.eventOutcome]

       this.utterance = this.stim.proptype == 'part' ? this.stim.np + " have " + this.stim.propertyName:
                        this.stim.proptype == 'color' ? this.stim.np + " are " + this.stim.colorword:
                        this.stim.proptype == 'color-part' ? this.stim.np + " have " + this.stim.colorpartword +" "+ this.stim.colorPart:
                       "error"

      $(".prompt").html("These are " + this.stim.category + ".");

      var scale = 0.5;
      var cells = ['svg0','svg1','svg2','svg3','svg4','svg5'];

      cells.map(function(cell){$('#'+cell).empty()});

      this.genusOptions = {
        "col1":{"mean":this.stim.color},
        "col2":{"mean":this.stim.color},
        "col3":{"mean":this.stim.color},
        "col4":{"mean":this.stim.color},
        "col5":{"mean":this.stim.color},
        "tar1":0, // never has a tail
        "tar2":0, // never has a crest
        "prop1":{"mean":this.stim.prop1size}, // mean size, unif(0, 0.5, 1)
        "prop2":{"mean":this.stim.prop2size},
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      this.negGenusOptions = {
        "col1":{"mean":"#FFFFFF"},
        "col2":{"mean":"#FFFFFF"},
        "col3":{"mean":"#FFFFFF"},
        "col4":{"mean":"#FFFFFF"},
        "col5":{"mean":"#FFFFFF"},
        "tar1":0, // never has a tail
        "tar2":0, // never has a crest
        "prop1":{"mean":this.stim.prop1size}, // mean size, unif(0, 0.5, 1)
        "prop2":{"mean":this.stim.prop2size},
        "var":0.001, //overall variance (overwritten by any specified variances)
      };

      var negGenus = new Ecosystem.Genus(this.stim.kind, this.negGenusOptions)

      this.genusOptions[this.stim.colorPartLabel].mean = this.stim.colorPartColor

      this.stim.proptype == 'part' ? this.genusOptions[this.stim.property] = 1 : null

      var genus = new Ecosystem.Genus(
        this.stim.kind, 
        this.genusOptions)

      var animalsWithProperties = Math.round(this.stim.prevalence*6)
      var properties = _.shuffle(utils.fillArray(true,animalsWithProperties).concat(
                                 utils.fillArray(false,6-animalsWithProperties)))

      // cells = ['svg0','svg1','svg2'];

      // debugger;
      // genus.draw("svg0", {}, scale)
      this.stim.origins == "intrinsic" ?
        cells.map(function(x){genus.draw(x, {}, scale)}) : 
        cells.map(function(x){negGenus.draw(x, {}, scale)})

      $('#radio1').parent().hide();
      $('#radio2').parent().hide();

      this.flag = 0

      // _.zip(cells,properties).map(function(x){x[1] ? 
      //                                       genus.draw(x[0], {}, scale):
      //                                       negGenus.draw(x[0],{}, scale)});


    },
    button : function() {

      if (this.flag == 0) {
        // after showing 6 dobles, show origins.
        ['svg0','svg1','svg2','svg3','svg4','svg5'].map(function(cell){$('#'+cell).empty()});
        $(".prompt").html(this.stim.originStory);

        var genus = new Ecosystem.Genus(this.stim.kind, this.genusOptions)
        var negGenus = new Ecosystem.Genus(this.stim.kind, this.negGenusOptions)

        if (this.stim.origins == "intrinsic") {
          genus.draw("svg0", {}, 0.2)
          genus.draw("svg1", {}, 0.4)
          genus.draw("svg2", {}, 0.6)
        } else { 
          negGenus.draw("svg0", {}, 0.5)
          negGenus.draw("svg1", {}, 0.3)
          genus.draw("svg2", {}, 0.5)
        }

        this.flag = 1
      } else if (this.flag==1) {

        var cells = ['svg0','svg1','svg2','svg3','svg4','svg5']
        $(".prompt").html(this.stim.eventStory);
        cells.map(function(cell){$('#'+cell).empty()});
        var genus = new Ecosystem.Genus(this.stim.kind, this.genusOptions);
        var negGenus = new Ecosystem.Genus(this.stim.kind, this.negGenusOptions)

        if (this.stim.eventOutcome=="maintained") {
          cells.map(function(x){genus.draw(x, {}, 0.5)});
        } else {
          cells.map(function(x){negGenus.draw(x, {}, 0.5)});
        };
      
        this.flag = 2

      } else if (this.flag==2) { 

        $(".prompt").html("Do you agree or disagree that:<br>" + this.utterance);

        $('#radio1').parent().show();
        $('#radio2').parent().show();
        this.flag = 3

      } else if (this.flag==3) { 
        
        if ($("input[name=radio_button]:checked").val()==undefined) {
          $(".err").show();
        } else {
          this.rt = (Date.now() - this.startTime)/1000;
          this.log_responses();

          /* use _stream.apply(this); if and only if there is
          "present" data. (and only *after* responses are logged) */
          _stream.apply(this);
        }

      }


    },

    log_responses : function() {

     this.stim.proptype == 'part' ? 
        this.stim.colorsave = 'white' : 
        this.stim.proptype == 'color' ? 
          this.stim.colorsave = this.stim.colorword :
          this.stim.proptype == 'color-part' ?
          this.stim.colorsave = this.stim.colorpartword : 
            null

     this.stim.proptype == 'part' ? 
        this.stim.propsave = this.stim.propertyName : 
        this.stim.proptype == 'color' ? 
          this.stim.propsave = 'full' :
          this.stim.proptype == 'color-part' ?
          this.stim.propsave = this.stim.colorPart : 
            null


      exp.data_trials.push({
        "trial_type" : "truth_conditions",
        "response" : $("input[name=radio_button]:checked").val(),
        "rt":this.rt,
        "stim_prevalence": this.stim.prevalence,
        "stim_word": this.stim.determiner,
        "stim_proptype":this.stim.proptype,
        "stim_category": this.stim.category,
        "stim_name": this.stim.categoryName,
        "stim_color": this.stim.colorsave,
        "stim_part":this.stim.propsave
      });
    }//,

    // end : function() {
    //   this.present = exp.stims1.shift();
    //   //exp.stims.shift();
    // }

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
      $("#practiceUtterance").html(this.utterance);
      $("#practiceImg").attr("src","stims_raw/"+this.stim+".png");
    },
    button : function() {
      if ($("input[name=radio_button]:checked").val()==undefined) {
        $(".err").show();
      } else {
        this.rt = (Date.now() - this.startTime)/1000;
        this.log_responses();
        _stream.apply(this);
      }
    },
    log_responses : function() {

      exp.catch_trials.push({
        "trial_type" : "practice",
        "response" : $("input[name=radio_button]:checked").val(),
        "correctResponse": this.solution,
        "rt":this.rt,
        "stim_type": this.stim
      });
    }
  });

  slides.practice_ip = slide({
    name: "practice_ip",
    present :  _.shuffle([{"item":"apples",
          "utterance":"There are 4 apples.",
          "alternatives":["apples","apples2","bananas","boat"]},
        {"item":"bananas",
        "utterance":"There are 3 bananas.",
          "alternatives":["apples","bananas5","bananas","house-greyRoof"]},
        {"item":"boat",
        "utterance":"This boat is brown.",
            "alternatives":["boat-red","boat","apples2","house"]},
        {"item":"house","utterance":"This house has a white roof.",
            "alternatives":["house-greyRoof","boat-red","bananas5","house"]}]),


    present_handle : function(stim) {

      ['table0p','table1p','table2p','table3p'].map(function(cell){
          $('#'+cell).css({"border":'',
                    'background-color': 'white',
                    'opacity': '1'})})


      this.startTime = Date.now();
      this.stim = stim;
      this.stim.kind = this.stim.item;
      this.stim.utterance = this.stim.utterance;
      this.stimorder = _.shuffle(this.stim.alternatives);
      $(".err").hide();

      $(".practiceUtterance").html(this.stim.utterance);

      _.zip(['svg0p','svg1p','svg2p','svg3p'],this.stimorder).map(function(cell){
        $('#'+cell[0]).attr("src","stims_raw/"+cell[1]+".png")
      });
        
    },

    button : function() {

      var responses = ['table0p','table1p','table2p','table3p'].map(
        function(cell){return $('#'+cell).css("opacity") == '1' ? 1 : 0})

      if (responses.reduce(function(a, b){return a + b;})!=1) {
        $(".err").show();
      } else {
        this.rt = (Date.now() - this.startTime)/1000;
        this.log_responses();

        _stream.apply(this);
      }

    },

  log_responses : function() {

      var prevObj = this.prevalenceCells
      var responses = _.zip(['table0p','table1p','table2p','table3p'],
        this.stimorder).map(
        function(cell){return ($('#'+cell[0]).css("opacity") == '1' ? cell[1] : null)})

      exp.catch_trials.push({
        "trial_type" : "implied_prevalence",
        "response" : responses.join(''),
        "correct": responses.join('')==this.stim.kind ? 1 : 0,
        "rt":this.rt,
        "category": this.stim.item,
        "utterance": this.stim.utterance
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
          "time_in_minutes" : (Date.now() - exp.startT)/60000,
          "fingerprintData" : fingerprint
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  // var prev_levels = ["0","0","0.33","0.33","0.66","0.66","1","1"];
  var prev_levels = ["1","1","1","1","1","1","1","1"];

  exp.trials = [];
  exp.catch_trials = [];
  // exp.condition = _.sample(["truth_conditions", "implied_prevalence"]); //can randomize between subject conditions here
  // exp.condition = "predictive_prevalence"
  exp.condition = "truth_conditions"

  exp.practice = "practice_tc";
  exp.practiceinstructions = "practice_tc_instructions";
  exp.instructions = "tc_instructions";

//  exp.stimtype = _.shuffle(["bare","danger","irrelevant"]);
//  exp.stimtype = ["bare","danger/distinct","nondistinctive"]; //because there is list1, list2, list3
  var determiners = _.map(utils.fillArray("generic",8), function(x){return {determiner: x}})


  var conditions = [
    {
      origins: "intrinsic",
      eventOutcome: "maintained"
    },
    {
      origins: "intrinsic",
      eventOutcome: "lost"
    },
    {
      origins: "extrinsic",
      eventOutcome: "maintained"
    },
    {
      origins: "extrinsic",
      eventOutcome: "lost"
    }
  ]

  var prevlevObj = [{"prevalence":0}, {"prevalence":0},
                        // {"prevalence":0.33},{"prevalence":0.33},
                        // {"prevalence":0.66},{"prevalence":0.66},
                        {"prevalence":1},{"prevalence":1}];


  var propertyObj = [{"kind":"fish","property":"tar1","propertyName":"fangs"},//{"kind":"fish","property":"tar2","propertyName":"whiskers"},
                    // {"kind":"flower","property":"tar1","propertyName":"thorns"},{"kind":"flower","property":"tar2","propertyName":"spots"},
                    //{"kind":"bug","property":"tar1","propertyName":"antennae"},
                    {"kind":"bug","property":"tar2","propertyName":"wings"},
                    {"kind":"bird","property":"tar1","propertyName":"tails"},
                    {"kind":"bird","property":"tar2","propertyName":"crests"}];


  var ntrials = 4

  exp.numTrials = ntrials//animalNames.length;

  var shuffledStims = _.shuffle(animalNames);


  exp.stims = _.map(_.zip(
      _.shuffle(prevlevObj).slice(0,ntrials),
      _.shuffle(propertyObj).slice(0,ntrials),
      _.shuffle(_.map(_.keys(colors), function(c){return {color: c}})).slice(0,ntrials),
      shuffledStims.slice(0,ntrials), 
      determiners.slice(0,ntrials),
      _.shuffle(propertySizes).slice(0,ntrials),
      _.shuffle(conditions, conditions)
      ), function(lst){return _.extend(lst[0], lst[1], lst[2], lst[3], lst[4], lst[5], lst[6])})

  console.log(exp.stims)

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:

   // exp.structure=["i0",
   //                 exp.practiceinstructions,
   //                 exp.practice,
   //                 exp.instructions, 
   //                 exp.condition,  
   //                 "intermediate_motivation", 
   //                 exp.condition, 
   //                 "intermediate_motivation", 
   //                 exp.condition, 
   //                 "intermediate_motivation", 
   //                 exp.condition, 
   //                 'subj_info', 
   //                 'thanks'];
  exp.structure = ['truth_conditions',"thanks"];

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