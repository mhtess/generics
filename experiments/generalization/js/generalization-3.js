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

  slides.block_break = slide({
    name : "block_break",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });



  slides.generalization = slide({
    name: "generalization",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
  //  present : _.range(exp.numTrials),
    present: exp.stims.shift(),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      this.startTime = Date.now();
      $(".err").hide();

      // $('input[name="radio_button1"]').prop('checked', false);
      // $('input[name="radio_button2"]').prop('checked', false);

//      this.stim = exp.stims[stim_num]; // allstims should be randomized, or stim_num should be
      this.stim = stim;
//      this.trialNum = stim_num;


      //  the following commands work only because there are "3 lists" of stimuli, and there are 3 exp.stimtypes (also 3 exp.deteminers)
      //this.determiner = exp.determiner[this.stim.list] // exp.determiner already randomized, grab which stimtype corresponds to list #_this.stim
      this.word = this.stim.word // exp.determiner between-subjects var
      // BAD
      //this.stimtype = exp.stimtype[this.stim.list]; // exp.stimtype already randomized, grab which stimtype corresponds to list #_this.stim
      // BETTER
      this.stimtype = this.stim.property_type

      this.qud = this.stim.qud
      this.query = this.stim.query

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
    
     // var speaker1 = (this.qud == 'property') ? 
     //  "I was talking to my friend the other day and we got into an argument what animals have "+ this.stim.property+". It was sort of embarrassing because I know there are tons of animals with " + this.stim.property+ " but I couldn't remember any of them. <strong>What would you say has "+this.stim.property+"</strong>?":
     //  "I was talking with my friend the other day and we got into an argument about " +this.stim.category+ ". It was sort of embarrassing because I couldn't remember anything about " +this.stim.category +". <strong>What would you say "+this.stim.category+" are like?</strong>"
     // // "I was walking in the park the other day, and I came across an animal with " + this.stim.property + ". <strong>Name an animal with " + this.stim.property +".</strong>" :
     // // "I was talking with my friend the other day, and I could not remember anything about "+ this.stim.category + ".  <strong>Tell me about " + this.stim.category + ".</strong>"

     var speaker1 = (this.qud == 'property') ? 
      "I was walking in the park the other day and I came across a kind of animal with "+ this.stim.property+". <strong>What has "+this.stim.property+"</strong>?":
      "I was reading about animals the other day and I came across a kind of animal called " +this.stim.category+ ". <strong>What are " +this.stim.category+" like?</strong>"
     // "I was walking in the park the other day, and I came across an animal with " + this.stim.property + ". <strong>Name an animal with " + this.stim.property +".</strong>" :
     // "I was talking with my friend the other day, and I could not remember anything about "+ this.stim.category + ".  <strong>Tell me about " + this.stim.category + ".</strong>"



    // var speaker2 = (this.word=='generic') ?
    //     utils.upperCaseFirst(this.stim.category) + " have " + this.stim.property + ".\n":
    //     utils.upperCaseFirst(this.word) + " " + this.stim.category +" have " + this.stim.property + ".\n";

    var speaker2 = (this.qud=='property') ?
         utils.upperCaseFirst(this.stim.category)+ " have " + this.stim.property + ".\n":
         utils.upperCaseFirst(this.stim.category)+ " have " + this.stim.property + ".\n"


      // this.stimtype=='danger' ? this.evidence_prompt+=this.stim.dangerous:null;
      // this.stimtype=='distinct' ? this.evidence_prompt+=this.stim.distinctive:null;
      // this.stimtype=='irrelevant' ? this.evidence_prompt+=this.stim.irrelevant:null;
      // this.stimtype == 'danger-distinct' ? this.evidence_prompt+=(this.stim.dangerous + ' ' + this.stim.dangdistinctive):null;
      // this.stimtype=='nondistinctive' ? this.evidence_prompt+=(this.stim.irrelevant + ' ' + this.stim.nondistinctive):null;




      $("#speaker1").html(this.stim.speaker1+ ' says: "'+ speaker1 +'"');
      $("#speaker1").html(this.stim.speaker1+ ', a visitor to the zoo, says: "'+ speaker1 +'"');

      var expertStatus = (this.qud=='property') ?
          'many different animals' : this.stim.category

      $("#speaker2").html(this.stim.speaker2+ ', a teacher at the zoo and <em>an expert on '+ expertStatus+'</em>, says: <br>"'+ speaker2 +'"');

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

       var isare = (this.stim.property.split(' ')[1] == 'fur' || this.stim.property.split(' ')[1] == 'skin') ? 
          isare = 'is' : isare = 'are';


      var queries = {"prevalence":"Other animals have "+ this.stim.property+ ".<br> What percentage of "  + this.stim.category + " do you think have " + this.stim.property + "?\n",
      "salience":utils.upperCaseFirst(this.stim.category) + " have other properties.<br> How important of a property do you think " + this.stim.property + " " + isare + "?"//" <em>"+ this.stim.property + "</em> rank among all the other characteristics in terms of <em>importance</em>?"
    };

      var endpoints = {"prevalence":["0%","100%"],
      "salience":["not very important","very important"]
    };


      // FIRST QUESTION

      $("#query1").html(queries[exp.query_order[0]]);


      $("#multi_slider_table0").append('<tr class="slider_row"><td class="slider_target" id="sentence0">'+endpoints[exp.query_order[0]][0] +'</td><td colspan="2"><div id="slider0" class="slider">-------[ ]--------</div></td><td class="slider_targetright">'+endpoints[exp.query_order[0]][1]+'</td></tr>');
      utils.match_row_height("#multi_slider_table0", ".slider_target");


      // SECOND QUESTION

      // var query_prompt = this.query=='prevalence' ? 
      //  "Other animals have "+ this.stim.property+ ". What percentage of "  + this.stim.category + " do you think have " + this.stim.property + "?\n" :
      //  //"Consider other potential characteristics of " + this.stim.category + ". How "+ isare + " <em>"+ this.stim.property + "</em> rank among all the other characteristics in terms of <em>importance</em>?"
      //   utils.upperCaseFirst(this.stim.category) + " have other properties. How important do you think " + this.stim.property + " " + isare + "?"//" <em>"+ this.stim.property + "</em> rank among all the other characteristics in terms of <em>importance</em>?"


      $("#query2").html(queries[exp.query_order[1]]);

      // this.query=='prevalence' ?
      //   $("#query1").css("padding-right","200px"):
      //   $("#query1").css("padding-right","150px")


      // var endpoints = this.query=='prevalence' ? 
      //   ["0%","100%"] :


      $("#multi_slider_table1").append('<tr class="slider_row"><td class="slider_target" id="sentence1">'+endpoints[exp.query_order[1]][0] +'</td><td colspan="2"><div id="slider1" class="slider">-------[ ]--------</div></td><td class="slider_targetright">'+endpoints[exp.query_order[1]][1]+'</td></tr>');
      utils.match_row_height("#multi_slider_table1", ".slider_target");

      exp.query_order[0] == 'prevalence' ? 
        $("#multi_slider_table0").css("padding-left","37px") :
        $("#multi_slider_table1").css("padding-left","37px")


      this.n_sliders = 2;
      this.init_sliders(this.n_sliders);
      exp.sliderPost = utils.fillArray(-1,this.n_sliders);

    },

    // SLIDER DEPENDENT MEASURE
    button : function() {
      if (exp.sliderPost.indexOf(-1)>-1) {
        $(".err").show();
      } else {
        this.rt = (Date.now() - this.startTime)/1000;
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

      var response_label0 = exp.query_order[0];
      var response_label1 = exp.query_order[1];
      var trial_data = {
        "trial_type" : "generalization",
    //    "trialNum":this.trialNum,
        // response_label0 : $("input:radio[name=radio_button1]:checked").val(), // radio button dependent measure
        // response_label1 : $("input:radio[name=radio_button2]:checked").val(), // radio button dependent measure
        "rt":this.rt,
        "qud":this.qud,
        "word": this.word,
        "stimtype": this.stimtype,
        "category": this.stim.category,
        "property": this.stim.property,
        "prevalenceFirst": exp.query_order[0]=='prevalence'
      }

      trial_data[response_label0] =  exp.sliderPost[0]; // slider dependent measure
      trial_data[response_label1] =  exp.sliderPost[1]; // slider dependent measure

      exp.data_trials.push(trial_data);
    },

    end : function() {
      this.present = exp.stims.shift();
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
    present : ["single trial"],
    present_handle : function(stim) {
      $(".err").hide();
    },
    button : function() {
//    if (($("#importance_debrief1").val() == '') ||($("#importance_debrief2").val() == '')) {
    if ($("#check").val() == 99) {

      $(".err").show();
    } else {
      this.submit();

      /* use _stream.apply(this); if and only if there is
      "present" data. (and only *after* responses are logged) */
//      _stream.apply(this);
    }
    },

    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.catch_trials.push({
        // debrief1 : $("#importance_debrief1").val(),
        // debrief2 : $("#importance_debrief2").val()
        debrief : $("#check").val()

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
          "query":exp.query,
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

  exp.query_order = _.shuffle(["prevalence","salience"]);

  console.log(exp.query_order[0])


//  exp.qud = _.sample(["category","property"])

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
  var totalStims = 16

  var unique_stimuli = [
  {"word":"generic","qud":"category","property_class":"biological"},
  {"word":"generic","qud":"property","property_class":"biological"}
  ];

  //   var unique_stimuli_query2 = [
  // {"word":"generic","qud":"category","query":"salience","property_class":"biological"},
  // {"word":"generic","qud":"property","query":"salience","property_class":"biological"}
  // ];

  var makeBlock = function(){
     return _.shuffle(_.flatten([unique_stimuli, unique_stimuli, unique_stimuli, unique_stimuli]))
  }

  var speakers = _.shuffle(["Robert","Justine","Erin","Desmond","Daniel","Kyle","Claire",
  "Sara","Karen","Rosemary","Josiah","Sal","Sid","Kyla","Molly","Judith","Gregory",
  "Nathan","Val","Sophie","Barbara","Alex","Allison","Tom","Josh","Carrie","Ken","Mary","Brandon",
  "Maria","Albert","James"]).slice(0,totalStims*2)

  function split(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
    }
    return out;
  }

  var speakerPairs = split(speakers, totalStims)

  var vague = _.shuffle(vagueProperties)

  // 2 sets of (totalStims/2) stimuli each, everything shuffled
  var shuffledslicedVague = _.flatten([_.shuffle(vague[0]).slice(0,totalStims/2), _.shuffle(vague[1]).slice(0,totalStims/2)])


  var stimtypes = _.flatten([makeBlock(), makeBlock()]);
  // var accidental_stims = _.map(_.shuffle(accidental).slice(0,16),
  //   function(x){return {"property_type":"accidental","property":x}})

  // choose a random list for the color properties and a random list for the "extraneous" property
//   var color_other_stim_lists = _.sample([0,1,2],2)


//   var stims_color_and_other = allstims.map(function(x){
//     // var color = x[color_other_stim_lists[0]].color + ' ' + x[color_other_stim_lists[0]].part
//     // var colorstim = {"property_type":"color",
//     //               "property":color};
//     var other = x[color_other_stim_lists[1]].extraneous + ' ' + x[color_other_stim_lists[1]].part;
//     var otherbiostim = {"property_type":"otherbio",
//                   "property":other}
// //    return [colorstim,otherbiostim]
//     return otherbiostim
//   })

  // stims_color_and_other = _.flatten(_.shuffle(stims_color_and_other).slice(0,8))

  // var stims_color_other_accidental = _.shuffle(stims_color_and_other)


  // var stims_color_other_accidental = _.shuffle(_.flatten([accidental_stims, stims_color_and_other]))

  var creatures = _.map(_.shuffle(creatureNames),function(x){return {"category":x.category,
                                                  "exemplar":x.exemplar}}).slice(0,totalStims)

//  var blockedCreatures = [creatures.splice(0,totalStims/2), creatures]
  var zippedStim = _.zip(_.flatten(stimtypes), 
    _.flatten(creatures), 
    _.flatten(shuffledslicedVague),
    speakerPairs)

//  console.log(_.map(x, function(x){return x[1].property}))
//  debugger;
// each entry has a "word", "query", "property" and a property_type tag
  var stimsCompiledFlat = _.map(zippedStim,
    function(pieces){return {"word":pieces[0].word,
                            "qud":pieces[0].qud,
                            "property_class":pieces[0].property_class,
                           // "query":pieces[0].query,
                            "category":pieces[1].category,
                            "exemplar":pieces[1].exemplar,
                            "property_type":"vague",
                            "property":pieces[2],
                            "speaker1":pieces[3][0],
                            "speaker2":pieces[3][1]}});

  exp.stims = [stimsCompiledFlat]

//  console.log(_.map(y, function(x){return x.property}))


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

  exp.numTrials = _.flatten(exp.stims).length;

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

 // exp.structure=["i0", "two_afc","single_trial","two_afc","single_trial", "one_slider", "multi_slider", 'subj_info', 'thanks'];
   exp.structure=["i0", "instructions",exp.condition,"debrief",'subj_info','thanks'];
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