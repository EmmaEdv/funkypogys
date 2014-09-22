GUI = function(game){
	this.game = game;
	this.score = null;

	//Time
	this.gameTime = 0;
	this.gameTimeText = null;

	//Coins
	this.coinsX = 600;
	this.coinsY = 40;
	this.coinsInBetween = 20;

	// Where the Pogy should appear in the GUI-toolbar
	this.pogyX = 730;
	this.pogyY = 5;
	this.pogyText = null;

	// Time should appear in the GUI-toolbar
	this.gameTimeTextX = 620;
	this.gameTimeTextY = 10;
};

GUI.prototype = {
	preload: function(){
		// Load images
		this.game.load.image('coin', 'assets/coin.png');
		this.game.load.image('pogy', 'assets/dudeHome.png');
		this.game.load.image('toolbar', 'assets/toolbar.png');
		this.game.load.image('winningScreen', 'assets/winningScreen.png');

		guiwinningscreen = new GUIWinningScreen(this.game);
    guiwinningscreen.preload();
	},

	create: function(){
		//Create a winningscreen (GUIWinningScreen.js)
		guiwinningscreen.create();

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
		guiwinningscreen.update();
		
		//Only count time if all pogys has not reached home
		if(level.pogyCounter != level.nrOfPogys){
			this.updateTime();
		}
		this.pogyText.setText(level.pogyCounter);
	},

	// Add coin to the scoreboard
	addCoin: function(){
		var star = this.coins.create(this.coinsX+this.coinsInBetween*(level.coinsCounter+1), this.coinsY, 'coin');
		level.coinsCounter++;
	},

	// Update time to the scoreboards
	updateTime: function(){
		this.gameTimeText.setText("Time: " + (level.levelTimer.duration.toFixed(1)/1000).toFixed(1));
	}
};


