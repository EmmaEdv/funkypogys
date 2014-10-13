GUIToolbar = function(game){
	this.game = game;
	this.score = null;

	//Time
	this.gameTime = 0;
	this.gameTimeText = null;

	//Coins
	this.coinsX = 600;
	this.coinsY = 30;
	this.coinsInBetween = 20;

	// Where the Pogy should appear in the GUI-toolbar
	this.pogyX = 730;
	this.pogyY = 5;
	this.pogyText = null;
	this.levelText = null;

	// Time should appear in the GUI-toolbar
	this.gameTimeTextX = 620;
	this.gameTimeTextY = 13;
	
	this.centerX = 400;

	// Buttons
	this.homeButton = null;
	this.restartButton = null;
	this.pauseButton = null;
	this.startButton = null;
};

GUIToolbar.prototype = {
	preload: function(){
	},

	create: function(){
		// The toolbar-background
		var toolbar = this.game.add.sprite(0, 0, 'toolbar');
		toolbar.fixedToCamera = true;

		// LevelText
		this.levelText = game.add.text(350, 20 , level.levelName, {
      font: "25px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.levelText.fixedToCamera = true;

		// The toolbar homebutton
		this.homeButton = this.game.add.button(10, this.gameTimeTextY, 'homeButton', function() {this.game.state.start('MainMenu', true, true);});
		this.homeButton.fixedToCamera = true;

		// The toolbar restartbutton
		this.restartButton = this.game.add.button(70, this.gameTimeTextY, 'restartButton', function() {this.game.state.start(this.game.state.current);});
		this.restartButton.fixedToCamera = true;

		// The toolbar restartbutton
		this.startButton = this.game.add.button(135, this.gameTimeTextY, 'nextLevelButton');
		this.startButton.fixedToCamera = true;
		this.startButton.alpha = 0;

		// The toolbar pausebutton
		this.pauseButton = this.game.add.sprite(130, this.gameTimeTextY, 'pauseButton');
		this.pauseButton.inputEnabled = true;
		this.pauseButton.events.onInputUp.add(function () {
																											 this.game.paused = true;
																											 this.pauseButton.alpha=0;
																											 this.startButton.alpha=1;
																											 },this);
		this.game.input.onDown.add(function () {
																						if(this.game.paused)this.game.paused = false;
																						this.pauseButton.alpha=1;
																						this.startButton.alpha=0;
																						},this);
		this.pauseButton.fixedToCamera = true;

		// Coins in the scoreboard
		this.coins = game.add.group();
		this.coins.fixedToCamera = true;

		// TimeText in the game
		this.gameTimeText = game.add.text(this.gameTimeTextX, this.gameTimeTextY , "Time: 0.0", {
      font: "17px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.gameTimeText.fixedToCamera = true;

		// Show how many Pogys reached home in the scoreboard
		var homePogy = this.game.add.sprite(this.pogyX, this.pogyY+5, 'pogy');
		homePogy.fixedToCamera = true;
    this.pogyText = game.add.text(this.pogyX+40, this.gameTimeTextY, "0", {
    	font: "17px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.pogyText.fixedToCamera = true;
	},

	update: function(){
		//Only count time if all pogys has not reached home
		if(level.pogyCounter != level.nrOfPogys){
			this.updateTime();
		}

		// How many Pogys are home
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
	},
};


