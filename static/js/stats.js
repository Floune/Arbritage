let $ = require('jquery');
let Chart = require('chart.js');
let stats = [];
let Datastore = require('nedb')
, equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });
let team = localStorage.getItem('equipe');
let i = 0;
let ctx = document.getElementById("chartt");
$("#stats").empty();

equipe.find({equipeName: team}, {_id: 0, equipeName: 0}, function(err, docs) {
	if (err)
		console.log(err);
	for (let key in docs[0]) {
		stats.push(docs[0][key]);
	}
	for (i = 0; i < 6; i++) {
		$("#" + i ).append(stats[i]);
	}
});

$("#teame").append(team);