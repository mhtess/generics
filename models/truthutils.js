var fs = require('fs');
// var csvtojson = require('csvtojson');
var babyparse = require('babyparse');

function readCSV(filename){
  return babyparse.parse(fs.readFileSync(filename, 'utf8'));
};

function writeCSV(jsonCSV, filename){
  fs.writeFileSync(filename, babyparse.unparse(jsonCSV) + "\n");
};

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
function closest(arr, closestTo){

    var closest = Math.max.apply(null, arr); //Get the highest number in arr in case it match nothing.
    for(var i = 0; i < arr.length; i++){ //Loop the array
        if(arr[i] >= closestTo && arr[i] < closest) closest = arr[i]; //Check if it's higher than your number, but lower than your closest value
    }
    return closest; // return the value
};

var erpWriter = function(erp, filename) {
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
// fs.writeSync(csvFile,'Item,Value,Probability\n')
 fs.writeSync(csvFile,'Parameter,Property, Category, Negation,Value,Probability\n')
 supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), csvFile);})
 fs.closeSync(csvFile);
}

var naturalpriorERPWriter = function(erp, filename) {
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
 fs.writeSync(csvFile,'Property,Parameter,Value,Probability\n')
 supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), csvFile);})
 fs.closeSync(csvFile);
}

var naturalcasepriorERPWriter = function(erp, filename) {
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
 fs.writeSync(csvFile,'Property,Category,Parameter,Value,Probability\n')
 supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), csvFile);})
 fs.closeSync(csvFile);
}

var supportWriter = function(s, p, handle) {
 var sLst = _.pairs(s);
 var l = sLst.length;

 for (var i = 0; i < l; i++) {
   fs.writeSync(handle, sLst[i].join(',')+','+p+'\n');
 }
}

var writeERP = function(myERP){
  return _.map(myERP.support([]),
          function(value){
            value.concat(Math.exp(myERP.score([], value)))
          }
          )
};

function readInPrevalencePrior(){
	var filepath = 'data/prevalencePrior_16props.csv'
	var priordata = readCSV(filepath).data;

	var sortedData = _.object(
		_.map(priordata.slice(1), function(lst){
			return[lst[1], lst.slice(2)]
		}))

	_.extend(sortedData,
		{"dont attacks swimmers": sortedData["attacks swimmers"].slice(0).reverse(),
		"dont carry malaria": sortedData["carry malaria"].slice(0).reverse(),
		"dont eat people": sortedData["eat people"].slice(0).reverse(),
		"dont carry lyme disease": sortedData["carry lyme disease"].slice(0).reverse(),
		"dont have beautiful feathers": sortedData["have beautiful feathers"].slice(0).reverse()
			})

	return sortedData
};

function readTruthJudgements(){
	var filepath = "/Users/mht/Documents/research/generics/analysis/real-kinds-truth-1-trials-n100-webpplfriendly.csv";
//	var filepath = "/Users/mht/Documents/research/generics/analysis/real-kinds-truth-1-trials-webpplfriendly.csv";

	var gendata = readCSV(filepath).data;


	var gdata = _.object(_.map(gendata.slice(1),
		function(lst){return [lst[1], lst.slice(2)]})
	)

	return gdata


}

function readInBothTCIPDataSets(){
	var dfilepath = "/Users/mht/Documents/research/generics/cbg2010-replication/data/";
	var dfile = dfilepath + "cbgR-exp9-trials.csv";
	var dfile2 = dfilepath + "cbgR-exp12-trials.csv";

	var tcData = readCSV(dfile).data
	var ipData = readCSV(dfile2).data;

	var contextCol = tcData[0].indexOf('stim_type');
	var prevalenceCol = tcData[0].indexOf("stim_prevalence");

	var tcContexts = _.uniq(_.map(tcData.slice(1),function(x){return x[contextCol]}))
	var ipContexts = _.uniq(_.map(ipData.slice(1),function(x){return x[contextCol]}))


	var isTask = function(row, desired_task){
		var taskCol = tcData[0].indexOf('trial_type');
		return row[taskCol]==desired_task
	}
	var isQuantifier = function(row, desired_quantifier){
		var quantifierCol = tcData[0].indexOf('stim_determiner');
		return row[quantifierCol]==desired_quantifier
	}
	var isContext = function(row, desired_context){
		return row[contextCol]==desired_context
	}
	var isPrevalence = function(x, desired_prevlev){
		return x[prevalenceCol] == desired_prevlev
	}
	var filterByTaskContextQuantifier = function(dataArray, task, context, quantifier){
		return _.filter(dataArray,
			function(item){
				return (isTask(item,task) & isContext(item,context) & isQuantifier(item,quantifier));
				})
	};

	var tcStructured = _.map(tcContexts,
		function(context)
						{return filterByTaskContextQuantifier(tcData, 
																'truth_conditions', 
																context, 
																'generic')}
						);
	var ipStructured = _.map(ipContexts,
		function(context)
					{return filterByTaskContextQuantifier(ipData, 
															'implied_prevalence', 
															context, 
															'generic')});


	return [tcStructured, ipStructured]


};


function readInBareTCIPDataSets(){
	var dfilepath = "/Users/mht/Documents/research/generics/cbg2010-replication/data/";
	var dfile = dfilepath + "cbgR-exp9-trials.csv";
	var dfile2 = dfilepath + "cbgR-exp12-trials.csv";

	var tcData = readCSV(dfile).data
	var ipData = readCSV(dfile2).data;

	var contextCol = tcData[0].indexOf('stim_type');
	var prevalenceCol = tcData[0].indexOf("stim_prevalence");

	var tcContexts = _.uniq(_.map(tcData.slice(1),function(x){return x[contextCol]}))
	var ipContexts = _.uniq(_.map(ipData.slice(1),function(x){return x[contextCol]}))


	var isTask = function(row, desired_task){
		var taskCol = tcData[0].indexOf('trial_type');
		return row[taskCol]==desired_task
	}
	var isQuantifier = function(row, desired_quantifier){
		var quantifierCol = tcData[0].indexOf('stim_determiner');
		return row[quantifierCol]==desired_quantifier
	}
	var isContext = function(row, desired_context){
		return row[contextCol]==desired_context
	}
	var isPrevalence = function(x, desired_prevlev){
		return x[prevalenceCol] == desired_prevlev
	}
	var filterByTaskContextQuantifierPrevalence = function(dataArray, task, context, quantifier, prevalence){
		return _.filter(dataArray,
			function(item){
				return (isTask(item,task) & isContext(item,context) & isQuantifier(item,quantifier) & isPrevalence(item, prevalence));
				})
	};

	var filterByTaskContextQuantifier = function(dataArray, task, context, quantifier){
		return _.filter(dataArray,
			function(item){
				return (isTask(item,task) & isContext(item,context) & isQuantifier(item,quantifier));
				})
	};

	var tcStructured = _.map([10,30,50,70,90],
		function(prev)
						{return filterByTaskContextQuantifierPrevalence(tcData, 
																'truth_conditions', 
																'bare', 
																'generic',
																prev)}
						);
	var ipStructured = _.map(ipContexts,
		function(context)
					{return filterByTaskContextQuantifier(ipData, 
															'implied_prevalence', 
															'bare', 
															'generic')});


	return [tcStructured, ipStructured]


};



function readInAccidentalTCIPDataSets(){
	var dfilepath = "/Users/mht/Documents/research/generics/cbg2010-replication/data/";
	var dfile = dfilepath + "cbg-exp14-trials.csv";

	var data = readCSV(dfile).data

	var contextCol = data[0].indexOf('stim_type');
	var prevalenceCol = data[0].indexOf("stim_prevalence");

	var isTask = function(row, desired_task){
		var taskCol = data[0].indexOf('trial_type');
		return row[taskCol]==desired_task
	}
	var isQuantifier = function(row, desired_quantifier){
		var quantifierCol = data[0].indexOf('stim_determiner');
		return row[quantifierCol]==desired_quantifier
	}
	var isContext = function(row, desired_context){
		return row[contextCol]==desired_context
	}
	var isPrevalence = function(x, desired_prevlev){
		return x[prevalenceCol] == desired_prevlev
	}
	var filterByTaskPrevalence = function(dataArray, task, prevalence){
		return _.filter(dataArray,
			function(item){
				return (isTask(item,task) & isPrevalence(item, prevalence));
				})
	};

	var filterByTask = function(dataArray, task){
		return _.filter(dataArray,
			function(item){
				return isTask(item,task);
				})
	};

	var tcStructured = _.map([10,30,50,70,90],
		function(prev)
						{return filterByTaskPrevalence(data, 
																'truth_conditions', 
																prev)}
						);
	var ipStructured = filterByTask(data,'implied_prevalence');

	return [tcStructured, ipStructured]

};





function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
};


function expectation(myERP, keys){
	return _.map(keys,
		function(sentence){
			
			var expectedProbs = _.map(myERP.support(),
				function(supportValue){
					var currScore = Math.exp(myERP.score([], supportValue));
					var posteriorProb = supportValue[sentence]
					return currScore*posteriorProb
				})
			return [sentence ,_.reduce(expectedProbs, function(memo, num){ return memo + num; }, 0)]
		})
}

var softmax = function(prob, softmaxparam){
  var exponentiated = _.map([prob, 1-prob], function(p){return Math.pow(p,softmaxparam)})
  return exponentiated[0]/(exponentiated[0]+exponentiated[1])
};


module.exports = {
  readCSV: readCSV,
  writeCSV: writeCSV,
  writeERP:writeERP,
  readInBothTCIPDataSets: readInBothTCIPDataSets,
  readInBareTCIPDataSets:readInBareTCIPDataSets,
  readInAccidentalTCIPDataSets:readInAccidentalTCIPDataSets,
  readInPrevalencePrior:readInPrevalencePrior,
  readTruthJudgements:readTruthJudgements,
  isNumber: isNumber,
  fillArray: fillArray,
  erpWriter:erpWriter,
  expectation: expectation,
  softmax:softmax,
  naturalpriorERPWriter:naturalpriorERPWriter,
  naturalcasepriorERPWriter: naturalcasepriorERPWriter,
  closest:closest
};