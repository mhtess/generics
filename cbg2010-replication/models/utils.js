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


module.exports = {
  readCSV: readCSV,
  writeCSV: writeCSV,
  readInBothTCIPDataSets: readInBothTCIPDataSets,
  isNumber: isNumber
};