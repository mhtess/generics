var fs = require('fs');
var babyparse = require('babyparse');


var erpWriter = function(erp, filename) {
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
 fs.writeSync(csvFile,'Parameter,Item,Prevalence,Value,Probability\n')
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

function readCSV(filename){
  return babyparse.parse(fs.readFileSync(filename, 'utf8'));
};

function writeCSV(jsonCSV, filename){
  fs.writeFileSync(filename, babyparse.unparse(jsonCSV) + "\n");
};

function wpParseFloat(x){
  return parseFloat(x);
};



module.exports = {
  readCSV: readCSV,
  writeCSV: writeCSV,
  wpParseFloat: wpParseFloat,
  erpWriter:erpWriter
};
