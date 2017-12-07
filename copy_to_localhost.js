var ncp = require('ncp').ncp;

ncp.limit = 16;


ncp('./dist/', 'C:/inetpub/test/',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});
ncp('./web.config', 'C:/inetpub/test/',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});
console.log('done!');
