GUI = function(game){
	this.game = game;
	this.score = null;

	//Time
	this.gameTime = 0;
	this.gameTimeText = null;

	//Coins
	this.coinsCounter = 0;
	this.coinsX = 600;
	this.coinsY = 40;
	this.coinsInBetween = 20;

	// Counter for our Pogys
	this.pogyCounter = 0;
	this.pogyX = 730;
	this.pogyY = 5;
	this.pogyText = null;

	// Time
	this.gameTimeTextX = 620;
	this.gameTimeTextY = 10;
};

GUI.prototype = {
	preload: function(){
		// Load images
		this.game.load.image('coin', 'assets/coin.png');
		this.game.load.image('pogy', 'assets/dudeHome.png');
		this.game.load.image('toolbar', 'assets/toolbar.png');
	},

	create: function(){
		// The toolbar-background
		var toolbar = this.game.add.sprite(0, 0, 'toolbar');
		toolbar.fixedToCamera = true;


		// Coins in the scoreboard
		this.coins = game.add.group();
		this.coins.fixedToCamera = true;

		// TimeText in the game
		this.gameTimeText = game.add.text(this.gameTimeTextX, this.gameTimeTextY , "Time: 0.0", {
        font: "17px Arial",
        fill: "#000",
        align: "left"
    });
    this.gameTimeText.fixedToCamera = true;

		// Show how pany Pogys reached home in le scoreboard
		var homePogy = this.game.add.sprite(this.pogyX, this.pogyY, 'pogy');
		homePogy.fixedToCamera = true;
    this.pogyText = game.add.text(this.pogyX+40, this.pogyY+15, "0", {
    	font: "17px Arial",
      fill: "#000",
      align: "left"
    });
    this.pogyText.fixedToCamera = true;
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

	// Add coin to the scoreboard
	addCoin: function(){
		var star = this.coins.create(this.coinsX+this.coinsInBetween*(this.coinsCounter+1), this.coinsY, 'coin');
		this.coinsCounter++;
	},

	// Update time to the scoreboards
	updateTime: function(){
		//Det finns en funktion för som heter: totalElapsedSeconds() som man kanske kan använda istället, eventuellt? :) 
		this.gameTime = Math.round(this.game.time.now - this.game.time._started)/1000;
		var time = JSON.stringify(this.gameTime);
		time = time.slice(0,-2);
		this.gameTimeText.setText("Time: " + time);
	}
};