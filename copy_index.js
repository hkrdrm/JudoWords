var ncp = require('ncp').ncp;

ncp.limit = 16;



ncp('./src/beta.index.html', './dist/index.html',  function (err) {
 if (err) {
 	console.log(err);
   return console.error(err);
 }
});
console.log('done!');
