var ncp = require('ncp').ncp;

ncp.limit = 16;



ncp('./dist/', '\\\\tpiweb1\\inetpub\\SnapConnect-beta',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});
ncp('./web.config', '\\\\tpiweb1\\inetpub\\SnapConnect-beta',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});
console.log('done!');
