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
			$("#za-oui").text("Oui : " + Match.zoneAttaqueOui);
			lastActionHero.stat = 'zoneAttaqueOui';
		});

		$('#za-non').on('click', function() {
			Match.zoneAttaqueNonUpdate(true);
			$("#za-non").text("Non : " + Match.zoneAttaqueNon);
			lastActionHero.stat = 'zoneAttaqueNon';
		});

		$('#st-oui').on('click', function() {
			Match.situationTirFavUpdate(true);
			$("#st-oui").text("Oui : " + Match.situationTirFav);
			lastActionHero.stat = 'situationTirFav';
		});

		$('#st-non').on('click', function() {
			Match.situationTirDefavUpdate(true);
			$("#st-non").text("Non : " + Match.situationTirDefav);
			lastActionHero.stat = 'situationTirDefav';
		});

		$('#pm-oui').on('click', function() {
			Match.panierMarqueUpdate(true);
			$("#pm-oui").text("Oui : " + Match.panierMarque);
			lastActionHero.stat = 'panierMarque';
		});

		$('#pm-non').on('click', function() {
			Match.panierNonMarqueUpdate(true);
			$("#pm-non").text("Non : " + Match.panierNonMarque);
			lastActionHero.stat = 'panierNonMarque';
		});

		$("#end").on('click', function() {
			let team = localStorage.getItem('equipe');
			equipe.update({equipeName: team}, { $set: {
				zoneAttaqueNon: Match.zoneAttaqueNon,
				zoneAttaqueOui: Match.zoneAttaqueOui,
				situationTirDefav: Match.situationTirDefav,
				situationTirFav: Match.situationTirFav,
				panierNonMarque: Match.panierNonMarque,
				panierMarque: Match.panierMarque,
				temps: timer.getTimeValues().toString(),
			}}, {multi: true}, function(err, numReplaced) {
				if (err)
					console.log(err);
			});
		});

		$("#undo").on('click', function() {
			let field = lastActionHero.stat;
			if (field == "zoneAttaqueOui") {
				Match.zoneAttaqueOuiUpdate(false);
				$("#za-oui").text("Oui : " + Match.zoneAttaqueOui);			
			}
			if (field == "zoneAttaqueNon") {
				Match.zoneAttaqueNonUpdate(false);
				$("#za-non").text("Non :" + Match.zoneAttaqueNon);
			}
			if (field == "situationTirDefav") {
				Match.situationTirDefavUpdate(false);
				$("#st-non").text("Non :" + Match.situationTirDefav);
			}
			if (field == "situationTirFav") {
				Match.situationTirFavUpdate(false);
				$("#st-oui").text("Oui : " + Match.situationTirFav);
			}
			if (field == "panierMarque") {
				Match.panierMarqueUpdate(false);
				$("#pm-oui").text("Oui : " + Match.panierMarque);
			}
			if (field == "panierNonMarque") {
				Match.panierNonMarqueUpdate(false);
				$("#pm-non").text("Non :" + Match.panierNonMarque);
			}
			lastActionHero.stat = "";
		});

		$("#videstorique").on('click', function() {
			equipe.remove({ }, { multi: true }, function (err, numRemoved) {
				if (err)
					console.log(err)
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