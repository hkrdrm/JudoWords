var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('./src/images/', 'A:/finance/images/',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});

ncp('./dist/', 'A:/finance/',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});
console.log('done!');
