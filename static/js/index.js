let $ = require('jquery');
var Datastore = require('nedb')
, equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });

$('#match').on('click', function() {
	let name = $('#nom').val();
	localStorage.setItem('equipe', name);
	equipe.insert({
		equipeName: name,
		zoneAttaqueNon: 0,
		zoneAttaqueOui: 0,
		situationTirDefav: 0,
		situationTirFav: 0,
		panierNonMarque: 0,
		panierMarque: 0,
		temps: 0
	}, function(err, doc) {
		if (err)
			console.log(err);
	});
});

$("#historique").on('click', function() {
	$("#histo").empty();

	equipe.find({}, {_id: 0}, function(err, docs) {
		if (err)
			console.log(err);
		for (let doc in docs) {
			for (let key in docs[doc]) {
				$("#histo").append("<li>" + key + ": " +docs[doc][key] + "</li>");
			}
			$("#histo").append("<br>");
		}
	});

});
