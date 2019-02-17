let $ = require('jquery');
let Chart = require('chart.js');
let Datastore = require('nedb')
, equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });

$(".del").on('click', function() {
	equipe.remove({}, { multi: true }, function (err, numRemoved) {
		$(".tablo").empty();
		alert('entrées supprimées: ', numRemoved);
	});
})

$(document).on('click', '.see', function() {
	let name = $(this).attr('id');
	localStorage.setItem('equipe', name);
})

function findH() {	
	equipe.find({}, function(err, docs) {
		if (err)
			console.log(err);
		for (let x = 0; x < docs.length; x++) {
			$(".tablo").append("<tr><td class='center aligned collapsing'> Equipe " + docs[x].equipeName + "</td><td class='center aligned collapsing'><form action='./stats.html'><button id='"+ docs[x].equipeName +"' class='ui icon button see'><i class='eye icon'></i></button></form></td></tr>");
		}
	});
}

findH();


