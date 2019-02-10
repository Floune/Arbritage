let $ = require('jquery');
var Datastore = require('nedb')
  , equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });
let team = localStorage.getItem('equipe');
console.log(team);
$("#teame").append(team);

let i = 0;
$("#stats").empty();
equipe.find({equipeName: team}, {_id: 0}, function(err, docs) {
	if (err)
		console.log(err);
	for (let key in docs[0]) {
		$("#stats").append("<li class='lis'>" + key + ": " +docs[0][key] + "</li>");
	}
})