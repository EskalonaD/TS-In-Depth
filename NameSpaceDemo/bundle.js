// /// <reference path="utility-functions.ts" />        //terminal to $ tsc app.ts --target ES5 --outFile bundle.js try-fix
var r = Utility.Fees.calculateFee(45);
console.log(r);
var util = Utility.Fees;
r = util.calculateFee(10);
console.log(r);
