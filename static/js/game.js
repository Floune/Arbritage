let $ = require('jquery');
let Match = require('./match');
let enAttaque = false;
var Datastore = require('nedb')
, equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });
let lastActionHero = {stat: ''};
let Timer = require('easytimer.js').Timer;
let timer = new Timer();

let Game = {

	init: function() {
		this.watchers();
		this.timer();
	},

	timer: function() {
		timer.start();
		timer.addEventListener('secondsUpdated', function (e) {
			$('#taymeur').html(timer.getTimeValues().toString());
		});
	},

	watchers: function() {

		$('#za-oui').on('click', function() {
			Match.zoneAttaqueOuiUpdate(true);
			Match.enAttaque = true;
			$("#display-za-oui").text(Match.zoneAttaqueOui);
			lastActionHero.stat = 'zoneAttaqueOui';
		});

		$('#za-non').on('click', function() {
			Match.zoneAttaqueNonUpdate(true);
			Match.enAttaque = false;
			$("#display-za-non").text(Match.zoneAttaqueNon);
			lastActionHero.stat = 'zoneAttaqueNon';
		});

		$('#st-oui').on('click', function() {
			Match.situationTirFavUpdate(true);
			$("#display-st-oui").text(Match.situationTirFav);
			lastActionHero.stat = 'situationTirFav';
		});

		$('#st-non').on('click', function() {
			Match.situationTirDefavUpdate(true);
			$("#display-st-non").text(Match.situationTirDefav);
			lastActionHero.stat = 'situationTirDefav';
		});

		$('#pm-oui').on('click', function() {
			Match.panierMarqueUpdate(true);
			$("#display-pm-oui").text(Match.panierMarque);
			lastActionHero.stat = 'panierMarque';
		});

		$('#pm-non').on('click', function() {
			Match.panierNonMarqueUpdate(true);
			$("#display-pm-non").text(Match.panierNonMarque);
			lastActionHero.stat = 'panierNonMarque';
		});

		$("#end").on('click', function() {
			let team = localStorage.getItem('equipe');
			equipe.update({equipeName: team}, { $set: {
				zoneAttaqueNon: Match.zoneAttaqueNon,
				zoneAttaqueOui: Match.zoneAttaqueOui,
				situationTirDefav: Match.situationTirDefav,
				situationTirFav: Match.situationTirFav,
				panierMarque: Match.panierMarque,
				panierNonMarque: Match.panierNonMarque
			}}, {multi: true}, function(err, numReplaced) {
				if (err)
					console.log(err);
				console.log('ok');
			});
		});

		$("#undo").on('click', function() {
			let field = lastActionHero.stat;
			if (field == "zoneAttaqueOui") {
				Match.zoneAttaqueOuiUpdate(false);
				$("#display-za-oui").text(Match.zoneAttaqueOui);			
			}
			if (field == "zoneAttaqueNon") {
				Match.zoneAttaqueNonUpdate(false);
				$("#display-za-non").text(Match.zoneAttaqueNon);
			}
			if (field == "situationTirDefav") {
				Match.situationTirDefavUpdate(false);
				$("#display-st-non").text(Match.situationTirDefav);
			}
			if (field == "situationTirFav") {
				Match.situationTirFavUpdate(false);
				$("#display-st-oui").text(Match.situationTirFav);
			}
			if (field == "panierMarque") {
				Match.panierMarqueUpdate(false);
				$("#display-pm-oui").text(Match.panierMarque);
			}
			if (field == "panierNonMarque") {
				Match.panierNonMarqueUpdate(false);
				$("#display-pm-non").text(Match.panierNonMarque);
			}
			lastActionHero.stat = "";
		});

		$("#videstorique").on('click', function() {
			equipe.remove({ }, { multi: true }, function (err, numRemoved) {
				if (err)
					console.log(err)
				console.log('removed: ', numRemoved);
				location.reload(true);
			});
			$("#histo").empty();
		});

		$('.startButton').click(function () {
			timer.start();
		});
		$('.pauseButton').click(function () {
			timer.pause();
		});
		$('.stopButton').click(function () {
			timer.stop();
		});
		$('.resetButton').click(function () {
			timer.reset();
		});
		timer.addEventListener('secondsUpdated', function (e) {
			$('#taymeur').html(timer.getTimeValues().toString());
		});
		timer.addEventListener('started', function (e) {
			$('#taymeur').html(timer.getTimeValues().toString());
		});
		timer.addEventListener('reset', function (e) {
			$('#taymeur').html(timer.getTimeValues().toString());
		});

	}
};

module.exports = Game;