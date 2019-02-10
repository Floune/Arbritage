let Match = {
	equipe: 'equipe',
	zoneAttaqueOui: 0,
	zoneAttaqueNon: 0,
	situationTirFav: 0,
	situationTirDefav: 0,
	panierMarque: 0,
	panierNonMarque: 0,

	setName: function(name) {
		this.equipe = name;
	},

	getName: function() {
		return this.equipe;
	},

	zoneAttaqueOuiUpdate: function(which) {
		if (which == true)
			this.zoneAttaqueOui++;
		else
			this.zoneAttaqueOui--;
	},

	zoneAttaqueNonUpdate: function(which) {
		if (which == true)
			this.zoneAttaqueNon++;
		else
			this.zoneAttaqueNon--;
	},

	situationTirFavUpdate: function(which) {
		if (which == true)
			this.situationTirFav++;
		else
			this.situationTirFav--;
	},

	situationTirDefavUpdate: function(which) {
		if (which == true)
			this.situationTirDefav++;
		else
			this.situationTirDefav--;
	},

	panierMarqueUpdate: function(which) {
		if (which == true)
			this.panierMarque++;
		else
			this.panierMarque--;
	},

	panierNonMarqueUpdate: function(which) {
		if (which == true)
			this.panierNonMarque++;
		else
			this.panierNonMarque--;
	}
};

module.exports = Object.create(Match);