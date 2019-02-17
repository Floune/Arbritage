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


