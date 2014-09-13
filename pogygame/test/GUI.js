GUI = function(game){
	
	this.game = game;
	this.score = null;

	//Time
	this.gameTime = 0;
	this.gameTimeText = null;

	//Coins
	this.coinsCounter = 0;
	this.coinsX = 600;
	this.coinsY = 60;
	this.coinsInBetween = 20;

	//Counter for our Pogys
	this.pogyCounter = 0;
	this.pogyX = 730;
	this.pogyY = 5;
	this.pogyText = null;
};

GUI.prototype = {
	preload: function(){
		this.game.load.image('coin', 'assets/coin.png');
		this.game.load.image('pogy', 'assets/dudeHome.png');
	},

	create: function(){
		this.coins = game.add.group();
		this.game.time.events.repeat(Phaser.Timer.SECOND, 3, this.addCoin, this);

		this.gameTimeText = game.add.text(620, 20, "Time: 0.000", {
        font: "17px Arial",
        fill: "#000",
        align: "left"
    });

		this.game.add.sprite(this.pogyX, this.pogyY, 'pogy');
    this.pogyText = game.add.text(this.pogyX+40, this.pogyY+15, "0", {
    	font: "17px Arial",
      fill: "#000",
      align: "left"
    });
	},

	update: function(){
		// Time in game
		this.game.time.advancedTiming = true;
		
		//Only count time if all pogys has not reached home
		if(this.pogyCounter != pogy.nrOfPogys){
			this.updateTime();
		}
		this.pogyText.setText(this.pogyCounter);
	},

	addCoin: function(){
		var star = this.coins.create(this.coinsX+this.coinsInBetween*(this.coinsCounter+1), this.coinsY, 'coin');
		this.coinsCounter++;
	},

	updateTime: function(){
		this.gameTime = Math.round(this.game.time.now - this.game.time._started)/1000;
		this.gameTimeText.setText("Time: " + this.gameTime);
	}
};