// so called elicitation task...
// same as experiment-11, 6 kinds / page

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

  slides.instructions2 = slide({
    name : "instructions2",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

    slides.instructions3 = slide({
    name : "instructions3",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.priors = slide({
    name: "priors",

    present :exp.stims.shift(),
    //this gets run only at the beginning of the block

    present_handle : function(stim) {
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
                        "trial_number": (6%(1+exp.properties.indexOf(property)))/6,
                         "animal": y[0],
                         "property": property,
                         "prevalence": y[1],
                         "rt":rt/1000,
                         "animal_index": animals.indexOf(y[0]),
                         "property_index": exp.properties.indexOf(property)
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

  exp.numberOfProperties = 6;
  exp.numberOfGivenAnimals = 8;
  exp.nTrials = 2;
  exp.propTypes = 3; // accidental, color, vague

  // exp.properties = _.shuffle(
  //                   _.flatten(
  //                     [_.sample(["is black","is red","lays eggs",
  //                                 "has manes","attacks swimmers","carries malaria",
  //                                 "is fast","is loyal"],exp.numberOfProperties-1),
  //                       _.sample(["is male","is female"])
  //                       ]
  //                       )
  //                   )

  // exp.properties = _.shuffle(["have wings","have spots","are white","are red",
  //                             "have pouches","lay eggs","have manes",
  //                             "carry malaria", "attacks swimmers","carry Lyme disease","eat people",
  //                             "have beautiful feathers",
  //                             "are adults","are juvelines","are male","are female",
  //                             "don't carry malaria","don't carry Lyme disease",
  //                             "don't attack swimmers", "don't have beautiful feathers"]);

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


  var ant = _.map(stimsForPrior, 
    function(lst){
      var b = _.shuffle(lst)
      return [b.slice(0,2), b.slice(2,4)]//(exp.numberOfProperties*exp.nTrials)/exp.propTypes)
  })

  var properties = _.map(_.zip(ant[0],ant[1],ant[2]),
    function(x){return _.shuffle(_.flatten(x))})

  var creatures = _.map(_.shuffle(creatureNames).slice(0,(8-3)*2),
    function(x){return x.category})
  var knownCreatures = _.shuffle(realAnimals).slice(0,6)
  var expanimals = [[_.shuffle(_.flatten([creatures.splice(0,5),
                                knownCreatures.splice(0,3)]))],
                    [_.shuffle(_.flatten([creatures, knownCreatures]))]]

  exp.properties = _.map(_.flatten(properties),function(x){return x.property})

  exp.columnNames = ["A","B","C","D","E","F"]

  exp.stims = _.map(_.zip(expanimals,exp.properties),function(x){return _.zip(_.flatten(x,true),
    _.flatten(["",exp.columnNames]))})


  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  //blocks of the experiment:
   exp.structure=["i0","instructions","priors", "priors",'subj_info', 'thanks'];
 
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