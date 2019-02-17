let $ = require('jquery');
let Chart = require('chart.js');
let Datastore = require('nedb')
, equipe = new Datastore({ filename: '../../db/equipe.db', autoload: true });
let team = localStorage.getItem('equipe');
let i;
let zaCnv = $("#zaChart").get(0);
let ptCnv = $("#ptChart").get(0);
let pmCnv = $("#pmChart").get(0);
var zaCtx = zaCnv.getContext("2d");
var ptCtx = ptCnv.getContext("2d");
var pmCtx = pmCnv.getContext("2d");
let za = new Chart(zaCtx, {});
let pt = new Chart(ptCtx, {});
let pm = new Chart(pmCtx, {});

function fillStats(done) {
	let stats = [];
	equipe.find({equipeName: team}, {_id: 0, equipeName: 0}, function(err, docs) {
		if (err)
			console.log(err);
		for (let key in docs[0]) {
			stats.push(docs[0][key]);
		}
		done(stats);
	});
}

function buildChart(stats, type, ctx, datas, label) {
	myChart = new Chart(ctx, {
		type: type,
		data: {
			labels: [
			"Non",
			"Oui" 
			],
			datasets: [{
				label: label,
				data: datas,
				backgroundColor: [
				'#db2828',
				'rgba(0, 128, 0, 1)'
				],
				borderColor: [
				'rgba(255, 0, 0, 1)',
				'rgba(0, 128, 0, 1)'
				],
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
	return (myChart);
}

function display(type) {
	fillStats(function(stats) {
		$("#timName").html(team);
		$("#played").html(stats[6])
		for (i = 0; i < 6; i++) {
			$("#sp" + i ).empty();
			$("#sp" + i ).append(stats[i]);
		}

		if(za !== undefined || za !== null)
			za.destroy();
		if(pt !== undefined || pt !== null)
			pt.destroy();
		if(pm !== undefined || pm !== null)
			pm.destroy();

		za = buildChart(stats, type, zaCtx, [stats[0], stats[1]], "Accès à la zone d'attaque");
		pt = buildChart(stats, type, ptCtx, [stats[2], stats[3]], "Tir en position favorable");
		pm = buildChart(stats, type, pmCtx, [stats[4], stats[5]], "Panier marqué");
	})
}

display('bar');
$(document).on("click", ".types", function() {
	display($(this).attr("id"));
})