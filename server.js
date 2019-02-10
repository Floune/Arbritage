var express = require('express');
var app = express();
var path = require('path');
var Datastore = require('nedb')
  , equipe = new Datastore({ filename: './db/equipe.db', autoload: true });

app.use(express.static(path.join(__dirname, 'static')));
app.listen(process.env.PORT || 3000, function(){
    console.log('server running');
});
