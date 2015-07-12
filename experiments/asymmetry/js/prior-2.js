// so called elicitation task...
// same as experiment-11, 6 kinds / page

function make_slides(f) {
  var slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",     
    start: function() {
      $(".err").hide();
      $("#total-num").html(exp.nTrials);  
     },
    button : function() {
        exp.go();
    }
  });

  slides.instructions2 = slide({
    name : "instructions2",
    button : function() {
      this.log_responses();
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
    log_responses : function() {
      exp.catch_trials.push({
        "training_feedback" : $("#feedback").val()
      });
    }
  });

    slides.instructions3 = slide({
    name : "instructions3",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.twostep_prevalence = slide({
    name: "twostep_prevalence",

   // present : _.shuffle(_.range(numTrials)),
    present : exp.stims,
    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      // debugger;
      this.startTime = Date.now();
      $(".err").hide();
      $(".training_err").hide();

      $(".question0").css({"font-size":"20px"});
      $(".question1").css({"font-size":"20px"});
      this.stim =  stim; // allstims should be randomized, or stim_num should be
      this.trialNum = exp.stimscopy.indexOf(stim);
     // this.determiner = exp.determiner[0] // exp.determiner between-subjects var
      var existential_question = 'The robot says: "We recently discovered animals called ' + stim.category +'.' +
          '<br> How likely is it that there is a ' +stim.exemplar + ' that has <strong><em>' + stim.property + '</strong></em>?"'

      var prevalence_question = 'The robot says: "Suppose there is a ' + stim.exemplar +' that has ' + stim.property + '.' +
          "<br>What percentage of "  + this.stim.category + " do you think have <strong><em>" + this.stim.property + "</strong></em>?\n";

      $(".question0").html(existential_question);
      $(".question1").html(prevalence_question);

      this.n_sliders = 2;

      this.init_sliders(this.n_sliders);
      // exp.sliderPost = [];
      exp.sliderPost = utils.fillArray(-1,this.n_sliders);//[];
      $(".slider_number").html("---")

    },

    init_sliders : function(n_sliders) {
      for (var i=0; i<n_sliders; i++) {
        utils.make_slider("#single_slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
        (i==1) ? $(".slider_number").html(Math.round(exp.sliderPost[i]*100)+"%") : null
      };
    },

    button : function() {
      if (exp.sliderPost.indexOf(-1)>-1) {
        $(".err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        this.log_responses();
        _stream.apply(this);
      }
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "twostep_elicitation",
        "trial_num": this.trialNum,
        "response0" : exp.sliderPost[0],
        "response1" : exp.sliderPost[1],
        "rt":this.rt,
        "stim_type": this.stim.type,
        "stim_property": this.stim.property,
        "stim_category": this.stim.category
      });
    }
  });

  slides.twostep_training = slide({
    name: "twostep_prevalence",

   // present : _.shuffle(_.range(numTrials)),
    present :  [ { 
      category:"glippets",
      exemplar:"glippet",
      property:"are female",
      question0:"<strong>This is a practice trial. (1 of 1)</strong><br>"+ 
      'The robot begins by randomly picking an animal name from the animals on the island it knows. <br>The robot will say: <em>We recently discovered animals called glippets.</em> The robot will ask you two questions in order to learn about animal properties. ' +
      ' The 1st question is about how likely it is that <em>at least one</em> of this animal species has the property. <br>Suppose the robot wants to learn about the property "female"; it would ask you:' + 
      '<br> <strong><em>How likely is it that there is a glippet that is female</strong></em>?' +
      // " Since you don't know anything about glippets (except that they are a kind of animal), base your judgment on the property: <em>is female</em>.</p>"+
      "<br> We are showing how you might respond below. Even though we don't know anything about glippets, we know that basically all animals have female members. So we would say it's very likely.",
      question1:'The 2nd question is about how many of this kind of animal have the property, assuming that at least one does. <br>The robot says: <em>Suppose there is a glippet that is female.</em>' +
          "<br><strong><em>What percentage of glippets do you think are female?</strong></em><br>"+
          "Since we know that approximately half of every species is female, the best response is likely to be about half. <br>Set this slider to reflect this."
    }]
    ,
    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      // debugger;
      this.startTime = Date.now();
      $(".training_err").hide();

      $(".err").hide();
      this.stim =  stim; // allstims should be randomized, or stim_num should be

      $(".question0").html(stim.question0);
      $(".question0").css({"font-size":"16px"});

      $(".question1").html(stim.question1);
      $(".question1").css({"font-size":"16px"});

      this.n_sliders = 2;

      this.init_sliders(this.n_sliders);
      // exp.sliderPost = [];
      exp.sliderPost = utils.fillArray(-1,this.n_sliders);//[];
      $(".slider_number").html("---")

      var label = "#single_slider0";

      $(label+ ' .ui-slider-handle').show();
      $(label).slider({value:0.99});
      $(label).css({"background":"#99D6EB"});
      $(label + ' .ui-slider-handle').css({
        "background":"#667D94",
        "border-color": "#001F29"
      })
      // $(label).unbind("mousedown");



    },

    init_sliders : function(n_sliders) {
      for (var i=0; i<n_sliders; i++) {
        utils.make_slider("#single_slider" + i, this.make_slider_callback(i));
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
        (i==1) ? $(".slider_number").html(Math.round(exp.sliderPost[i]*100)+"%") : null
      };
    },

    button : function() {
      if (!(exp.sliderPost[1] < 0.70 & exp.sliderPost[1]>0.20)) {
        $(".training_err").show();
      } else {
        this.rt = Date.now() - this.startTime;
        // this.log_responses();
        _stream.apply(this);
      }
    }

    // log_responses : function() {
    //   exp.data_trials.push({
    //     "trial_type" : "implied_prevalence",
    //     "trial_num": this.trialNum,
    //     "response0" : exp.sliderPost[0],
    //     "response1" : exp.sliderPost[1],
    //     "rt":this.rt,
    //     "stim_type": this.stim.type,
    //     "stim_determiner": this.determiner,
    //     "stim_property": this.stim.property,
    //     "stim_category": this.stim.category
    //   });
    // }
  });

  slides.slider_training = slide({
    name : "vertical_sliders",
    present : [
    { 
      category:"glippets",
      exemplar:"glippet",
      property:"are female",
      bins:exp.bins,
      question:"<strong>This is a practice trial. (1 of 2)</strong><br>"+ 
      'The robot comes up to you and says: "There is an animal on the island called a glippet."' +
      ' The robot wants to learn about glippets, and asks you:' + 
      '"What % of glippets do you think <strong><em>are female</strong></em>?"' +
      '<p>Below are 7 slider bars, corresponding to 7 different <em>percentages</em> of glippets that could be female.' +
      " Since you don't know anything about glippets (except that they are an animal), you will have to base your judgment on the property: <em>are female</em>.</p>"+
      '<p>We filled out two bars for you: First consider "40-60%". This bar represents '+
      "how likely we think it is that about half of glippets are female. We think this is very likely (all the animals we know about are about half female) so we place the slider bar high."+
      ' Next, think about "95-100%". This is the statement that almost all glippets are female. We think this is very unlikely so we place the slider bar low. ' +
      ' Go through in fill in the remaining slider bars with realisitic values.</p>',
      bars: [3,6],
      vals: [0.99, 0.01]
    },
    {
      category:"sapers",
      exemplar:"saper",
      property:"have fins",
      bins:exp.bins,
      question:"<strong>This is a practice trial. (2 of 2)</strong><br>"+ 
      'The robot comes up to you and says: "There is an animal on the island called a saper."' +
      ' The robot wants to learn about sapers, and asks you:' + 
      '"What % of glippets do you think <strong><em>have fins</strong></em>?"' +
      "<p>Again, since we do not know anything about sapers, we need to think about the property: <em>have fins</em>.</p> First, fish have fins, and within a species of fish (like goldfish), 100% of those fish have fins, so we put the rightmost bar high."+
      ' Now, there are plenty of animals, like dogs, who do not have fins. In fact, 0% of dogs have fins. So we also put that bar high.'+
      ' Finally, note that we put the 0% bar a little higher than the 100% bar. This is because we believe it is a litte more likely for a species to not have fins than to have fins.'+
      ' Go through in fill in the remaining slider bars.</p>',
      bars: [0,6],
      vals: [0.99, 0.7]
    }
    // ,
    // { 
    //   category:"krivels",
    //   exemplar:"krivel",
    //   property:"lay eggs",
    //   bins:exp.bins
    // }
    ],
    present_handle : function(stim) {
      $(".err").hide();

      $(".warning").hide();
      this.stim = stim;

      $("#vertical_question").html(stim.question);
      $("#vertical_question").css("font-size", 16);
      $("#sliders").empty();
      $("#bin_labels").empty();
    
      this.n_sliders = stim.bins.length
      $("#sliders").append('<td> \
            <div id="slider_endpoint_labels"> \
              <div class="top">likely</div> \
              <div class="bottom">unlikely</div>\
            </div>\
          </td>')
      $("#bin_labels").append('<td></td>')
      for (var i=0; i<stim.bins.length; i++) {
        $("#sliders").append("<td><div id='vslider" + i + "' class='vertical_slider'>|</div></td>");
        $("#bin_labels").append("<td class='bin_label'>" + stim.bins[i].min + " - " + stim.bins[i].max + "</td>");
      }

      var reminder = "<em>[For each interval, rate how likely you think it is for that % of " + stim.category + 
        " to have <strong>" + stim.property + "</strong>.]</em>"

      $("#vertical_reminder").html(reminder)

      this.init_sliders(stim);
      exp.sliderPost = utils.fillArray(-1,7);//[];

      var label = "#vslider"+stim.bars[0];
      $(label+ ' .ui-slider-handle').show();
      $(label).slider({value:stim.vals[0]});
      $(label).css({"background":"#99D6EB"});
      $(label + ' .ui-slider-handle').css({
        "background":"#667D94",
        "border-color": "#001F29"
      })
      $("#vslider"+stim.bars[0]).unbind("mousedown");


      var label = "#vslider"+stim.bars[1];
      $(label+ ' .ui-slider-handle').show();
      $(label).slider({value:stim.vals[1]});
      $(label).css({"background":"#99D6EB"});
      $(label + ' .ui-slider-handle').css({
        "background":"#667D94",
        "border-color": "#001F29"
      })
      $("#vslider"+stim.bars[1]).unbind("mousedown");

      exp.sliderPost[stim.bars[0]]=0
      exp.sliderPost[stim.bars[1]]=0
    },

    button : function() {
      var overTen = function(val){
        return val > 0.2
      }

      if (exp.sliderPost.indexOf(-1)>-1) {
        $(".err").show();
      } else if (_.filter(exp.sliderPost, overTen).length > 0) {
          $(".err").hide();
        $(".warning").show();
      } else {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
      }
    },

    init_sliders : function(stim) {
      for (var i=0; i<stim.bins.length; i++) {
        utils.make_slider("#vslider" + i, this.make_slider_callback(i), "vertical");
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.stim.bins.length; i++) {
        exp.data_trials.push({
          "trial_type" : "vertical_slider",
          "question" : this.stim.question,
          "response" : exp.sliderPost[i],
          "min" : this.stim.bins[i].min,
          "max" : this.stim.bins[i].max
        });
      }
    },
  });

  slides.vertical_sliders = slide({
    name : "vertical_sliders",
    present : _.map(_.zip(
      exp.stims, utils.fillArray(exp.bins, exp.stims.length)
      ),
    function(lst){return _.extend(lst[0], {bins: lst[1]})}),
    present_handle : function(stim) {
      $(".err").hide();
      this.stim = stim;

      var question = 'The robot says: "There is an animal on the island called a ' + stim.exemplar +'.' +
          '<br> What % of ' +stim.category + ' do you think have <strong><em>' + stim.property + '</strong></em>?"'

      $("#vertical_question").html(question);
      $("#sliders").empty();
      $("#bin_labels").empty();
    
      this.n_sliders = stim.bins.length
      $("#sliders").append('<td> \
            <div id="slider_endpoint_labels"> \
              <div class="top">likely</div> \
              <div class="bottom">unlikely</div>\
            </div>\
          </td>')
      $("#bin_labels").append('<td></td>')
      for (var i=0; i<stim.bins.length; i++) {
        $("#sliders").append("<td><div id='vslider" + i + "' class='vertical_slider'>|</div></td>");
        $("#bin_labels").append("<td class='bin_label'>" + stim.bins[i].min + " - " + stim.bins[i].max + "</td>");
      }

      var reminder = "<em>[For each interval, rate how likely you think it is for that % of " + stim.category + 
        " to have <strong>" + stim.property + "</strong>.]</em>"

      $("#vertical_reminder").html(reminder)

      this.init_sliders(stim);
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

    init_sliders : function(stim) {
      for (var i=0; i<stim.bins.length; i++) {
        utils.make_slider("#vslider" + i, this.make_slider_callback(i), "vertical");
      }
    },
    make_slider_callback : function(i) {
      return function(event, ui) {
        exp.sliderPost[i] = ui.value;
      };
    },
    log_responses : function() {
      for (var i=0; i<this.stim.bins.length; i++) {
        exp.data_trials.push({
          "trial_type" : "vertical_slider",
          "question" : this.stim.question,
          "response" : exp.sliderPost[i],
          "min" : this.stim.bins[i].min,
          "max" : this.stim.bins[i].max
        });
      }
    },
  });
    

  slides.priors = slide({
    name: "priors",

    present :exp.stims.shift(),
    //this gets run only at the beginning of the block

    present_handle : function(stim) {
      console.log(exp.stims)
      $(".err").hide();

      console.log(stim);

      this.col = stim[1]


      this.animals = stim[0]


      this.property = this.col ==''? "animal": stim[0];


      // hide columns
      // first trial? hide the rest of the columns : otherwise, hide all of them
      this.col!='' ? 
      _.map(exp.columnNames.slice(exp.columnNames.indexOf(this.col)),
            function(x){
        $(".prop"+x).hide();
      }) :  _.map(exp.columnNames,
            function(x){
        $(".prop"+x).hide()})

      //erase current columns enetries

      var column = this.col
      _.map([0,1,2,3,4,5,6,7,8,9,10], 
                  function(y){return $("#text_response"+y+column.toLowerCase()).val("")
                });

      $(".prop"+this.col).show();

      // fix certain animal names in the table
      this.col == '' ? 
      _.map(_.zip(_.range(exp.numberOfGivenAnimals), this.animals),
        function(x){
          $("#text_response"+x[0]).val(
            utils.upperCaseFirst(x[1])
            );
          document.getElementById('text_response'+x[0]).disabled=true;}) : null

      this.col == '' ? 
      _.map([8,9,10],
        function(x){
          document.getElementById('text_response'+x).disabled=false;
                  $("#text_response"+x).val("");
                }) : null

      this.startTime = Date.now();

      $("#head" + this.col).html(this.property.property);

      this.col ==''?
        $(".query").html("Listed below are " +exp.numberOfGivenAnimals + " kinds of animals. Some of these animals were recently discovered from a remote island. Add 3 of your own to the list.") :
        $(".query").html("For each kind of animal, what percentage of the species do you think have " + this.property.property + "?")


      // load column names into page
      // _.zip(this.properties,this.columns).map(function(x){
      //   $("#head" + x[1]).html(x[0]);
      // })

    },

    button : function() {


      var isComplete = function(lst){
        return lst.every(function(x){return x!=''})
      }

      // figure out which columns are currently visible
      
      var columnsOn = exp.columnNames.filter(function(x){
        return $(".prop"+x).is(":visible");
      })


      var column = this.col;
      // check animal names
//      if (columnsOn.length==0) {
      if (column=='') {
        
        var responses = _.map([0,1,2,3,4,5,6,7,8,9,10], 
          function(y){return $("#text_response"+y).val()
        })

        if (isComplete(responses)){
            // freeze column
            _.map([0,1,2,3,4,5,6,7,8,9, 10],
              function(x){document.getElementById('text_response'+x).disabled=true;}
              )
            // get next column to reveal
            //var nextCol = this.columns.shift();            
            //$(".prop"+nextCol).show();
            //$("#err1").hide();

            this.rt = Date.now() - this.startTime;
            this.log_responses();

            /* use _stream.apply(this); if and only if there is
            "present" data. (and only *after* responses are logged) */
            _stream.apply(this);

        } else {

            $("#err1").show();
          
         }

      } else {
    
        // // check numeric responses for columns that are "on"
        // var responses = _.flatten(_.map(columnsOn,
        //   function(x){return _.map([0,1,2,3,4,5,6,7,8,9], 
        //     function(y){return $(("#text_response"+y+x.toLowerCase())).val()
        //   })
        // }))

        var responses = _.map([0,1,2,3,4,5,6,7,8,9,10], 
            function(y){return $("#text_response"+y+column.toLowerCase()).val()
          });

        var valid = responses.every(function(x){return (x<=100 && x>=0 && x!='');})

        if (!valid) {

          $("#err2").show();
        
        } else {


            this.rt = Date.now() - this.startTime;
            this.log_responses();

            /* use _stream.apply(this); if and only if there is
            "present" data. (and only *after* responses are logged) */
            _stream.apply(this);


          // if (this.columns.length!=0) {

          //   // freeze column
          //   _.map([0,1,2,3,4,5,6,7,8,9],
          //     function(x){document.getElementById('text_response'+x + 
          //                 columnsOn[columnsOn.length-1].toLowerCase() ).disabled=true;}
          //     )

          //   var nextCol = this.columns.shift();            
            
          //   $(".prop"+nextCol).show();


          //   $("#err2").hide();

          // } else {
          //   this.rt = Date.now() - this.startTime;
          //   this.log_responses();

          //   /* use _stream.apply(this); if and only if there is
          //   "present" data. (and only *after* responses are logged) */
          //   _stream.apply(this);
          // }


        }
      }


    },

    log_responses : function() {

    var animals = _.map([0,1,2,3,4,5,6,7,8,9,10], 

      function(y){return $("#text_response"+y).val()
    
    })

    // get numeric responses for columns that are "on"

    var column = this.col;
    var property = this.property;
    var rt = this.rt;

    var responses = _.map([0,1,2,3,4,5,6,7,8,9,10], 

        function(y){return $(("#text_response"+y+column.toLowerCase())).val()
      
      })

    column != '' ?

      _.map(_.zip(animals,responses),
        
          function(y){exp.data_trials.push({
                        "trial_type" : "priors",
                        "trial_number": (6%(1+_.flatten(exp.properties).indexOf(property)))/6,
                         "animal": y[0],
                         "property": property.property,
                         "type":property.type,
                         "prevalence": y[1],
                         "rt":rt/1000,
                         "animal_index": animals.indexOf(y[0]),
                         "property_index": _.flatten(exp.properties).indexOf(property)
          })}) : 

    null;


    // _.map(_.zip(animals,responses),
      
    //   function(x){_.map(_.zip(x[1],exp.properties),

    //     function(y){exp.data_trials.push({
    //                   "trial_type" : "priors",
    //                    "animal": x[0],
    //                    "property":y[1],
    //                    "prevalence":y[0],
    //                   // "rt":this.rt,
    //                    "animal_index":animals.indexOf(x[0]),
    //                    "property_index":exp.properties.indexOf(y[1])
    //     })})})
    

    },

    end : function() {
      this.present = exp.stims.shift();
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
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val(),
        comments : $("#comments").val()
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
  exp.nTrials = 12;
  exp.propTypes = ["accidental", "color", "vague", "part"]

  exp.bins = [
          {
            "min" : 0,
            "max" : "5%"
          },
          {
            "min" : 5,
            "max" : "25%"
          },
          {
            "min" : 25,
            "max" : "40%"
          },
          {
            "min" : 40,
            "max" : "60%"
          },
          {
            "min" : 60,
            "max" : "75%"    
          },
          {
            "min" : "75",
            "max" : "95%"    
          },
          {
            "min" : 95,
            "max" : "100%"
          }
        ]


  var stims = [{"Ducks":"have wings"},
                {"Leopards":"have spots"},
                {"Swans":"are white"},
                {"Cardinals":"are red"},
                {"Kangaroos":"have pouches"},
                {"Robins":"lay eggs"},
                {"Lions":"have manes"}, 
                {"Mosquitos":"carry malaria"}, 
                {"Sharks":"attacks swimmers"},
                {"Ticks":"carry Lyme disease"},
                {"Tigers":"eat people"},
                {"Peacocks":"have beautiful feathers"}]

var i,j,chunk = exp.nTrials/exp.propTypes.length;
var stimArray=[]
var shufStims = _.shuffle(stimsForPrior2)

for (i=0,j=shufStims.length; i<j; i+=chunk) {
    stimArray.push(shufStims.slice(i,i+chunk));
}

var properties = _.shuffle(_.flatten(_.map(
  _.zip(exp.propTypes,stimArray),
  function(typeAndStims){
    var substims = typeAndStims[1]
    var type = typeAndStims[0]
    return _.map(substims,
      function(s){
        var prefix = type=="part" ? "" : s[type]+" "
        return {property: prefix+s.part,
                type: type}
      }
      )
  }
  )
))
  var creatures = _.map(_.shuffle(creatureNames).slice(0,exp.nTrials),
    function(x){return {category: x.category, exemplar: x.exemplar}}
    )

exp.stims =_.map(_.zip(creatures, properties),
  function(cp){
    return _.extend(cp[1], cp[0])
  })

  exp.stimscopy = exp.stims.slice(0);


  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //blocks of the experiment:
   exp.structure=["i0","instructions","twostep_training","instructions2","twostep_prevalence",'subj_info', 'thanks'];
 
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