var express = require('express');
var app = express();
var path = require('path');
var Datastore = require('nedb')
, equipe = new Datastore({ filename: './db/equipe.db', autoload: true });

app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});
app.use(express.static(path.join(__dirname, 'static')));
app.listen(process.env.PORT || 3000, function(){
	console.log('server running');
});
