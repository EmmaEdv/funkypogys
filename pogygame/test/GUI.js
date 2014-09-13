GUI = function(game){
	
	this.game = game;
	this.score = null;

	this.time = 0;

	// Stars
	this.starCounter = 0;

	// Counter for our Pogys
	this.pogyCounter = null;
};

GUI.prototype = {
	preload: function(){
		this.game.load.image('coin', 'assets/coin.png');
	},

	create: function(){

		this.coins = game.add.group();

		var star = this.coins.create(600, 60, 'coin');
		star = this.coins.create(620, 60, 'coin');
		star = this.coins.create(640, 60, 'coin');
	},

	update: function(){
		this.game.time.advancedTiming = true;
		console.log(this.game.time);

	}
};