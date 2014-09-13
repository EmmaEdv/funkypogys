GUI = function(game){
	
	this.game = game;
	this.score = null;

	// Time
	this.gameTime = 0;
	this.gameTimeText = null;

	// Coins
	this.coinsCounter = 0;
	this.coinsX = 600;
	this.coinsY = 60;
	this.coinsInBetween = 20;

	// Counter for our Pogys
	this.pogyCounter = 0;
};

GUI.prototype = {
	preload: function(){
		this.game.load.image('coin', 'assets/coin.png');
	},

	create: function(){
		this.coins = game.add.group();
		this.game.time.events.repeat(Phaser.Timer.SECOND, 3, this.addCoin, this);

		this.gameTimeText = game.add.text(620, 20, "Time: 0.000", {
        font: "17px Arial",
        fill: "#ff0044",
        align: "left"
    });
	},

	update: function(){
		// Time in game
		this.game.time.advancedTiming = true;
		this.gameTime = Math.round(this.game.time.now - this.game.time._started,2,2)/1000;
		this.gameTimeText.setText("Time: " + this.gameTime);
	},

	addCoin: function(){
		var star = this.coins.create(this.coinsX+this.coinsInBetween*(this.coinsCounter+1), this.coinsY, 'coin');
		this.coinsCounter++;
	}
};