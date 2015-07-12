var fs = require('fs');
var babyparse = require('babyparse');


var erpWriter = function(erp, filename) {
 var supp = erp.support([]);
 var csvFile = fs.openSync(filename, 'w');
 supp.forEach(function(s) {supportWriter(s, Math.exp(erp.score([], s)), csvFile);})
 fs.closeSync(csvFile);
}

var supportWriter = function(s, p, handle) {
 var l = s.length;
 for (var i = 0; i < l-1; i++) {
   fs.writeSync(handle, s[i].join(',')+','+p+'\n');
 }
 var e = s[l-1];
 var k = e.length;
 for (i = 0; i < k; i++) {
   fs.writeSync(handle, e[i].join(',')+','+p+'\n');
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
