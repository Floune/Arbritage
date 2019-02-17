let $ = require('jquery');
let Chart = require('chart.js');
let Datastore = require('nedb')
, equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });

$(".del").on('click', function() {
	equipe.remove({}, { multi: true }, function (err, numRemoved) {
		$(".liist").empty();
	});
})

$(document).on('click', '.see', function() {
	let name = $(this).attr('id');
	localStorage.setItem('equipe', name);
	location.href='./stats.html';
})

function findH() {	
	equipe.find({}, function(err, docs) {
		if (err)
			console.log(err);
		for (let x = 0; x < docs.length; x++) {
			$(".liist").append("<div class='ui segment'><button id='" + docs[x].equipeName + "' class='ui icon button see'><i class='eye icon'></i></button>Equipe  " + docs[x].equipeName + "</div>")
		}
	});
}

findH();


