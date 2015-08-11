var fs = require('fs');
// var csvtojson = require('csvtojson');
var babyparse = require('babyparse');

function readCSV(filename){
  return babyparse.parse(fs.readFileSync(filename, 'utf8'));
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
 console.log('writing to csv')
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
// fs.writeSync(csvFile,'Item,Value,Probability\n')
 fs.writeSync(csvFile,'Parameter,Property, Category, Negation,Value,Probability\n')
 supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), csvFile);})
 fs.closeSync(csvFile);
 console.log('writing complete.')
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

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
};

var softmax = function(prob, softmaxparam){
  var exponentiated = _.map([prob, 1-prob], function(p){return Math.pow(p,softmaxparam)})
  return exponentiated[0]/(exponentiated[0]+exponentiated[1])
};


module.exports = {
  readCSV: readCSV,
  isNumber: isNumber,
  fillArray: fillArray,
  erpWriter:erpWriter,
  softmax:softmax,
  naturalpriorERPWriter:naturalpriorERPWriter,
  naturalcasepriorERPWriter: naturalcasepriorERPWriter,
  closest:closest
};