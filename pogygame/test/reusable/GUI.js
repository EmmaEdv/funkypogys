GUI = function(game){
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

	//Dig & build pogy
	this.digPogy = null;
	this.digPogyText = null;
	this.buildPogy = null;
	this.buildPogyText = null;
	
	this.centerX = 400;

	// Buttons
	this.homeButton = null;
	this.restartButton = null;
	this.pauseButton = null;
};

GUI.prototype = {
	preload: function(){
		// Load images
		this.game.load.image('coin', 'assets/pogyCoin.png');
		this.game.load.image('pogy', 'assets/dudeHome.png');
		this.game.load.image('toolbar', 'assets/woodenBar.png');
		this.game.load.image('winningScreen', 'assets/winningScreen.png');
		this.game.load.image('homeButton', 'assets/homebutton.png');
		this.game.load.image('restartButton', 'assets/restartbutton.png');
		this.game.load.image('pauseButton', 'assets/pausebutton.png');

		// Bars för show left and right camera direction .. ? ;)
		this.game.load.image('transparentR', 'assets/transparentRight.png');
		this.game.load.image('transparentL', 'assets/transparentLeft.png');


		guiwinningscreen = new GUIWinningScreen(this.game);
    guiwinningscreen.preload();
	},

	create: function(){
		//Create a winningscreen (GUIWinningScreen.js)
		guiwinningscreen.create();

		// Transparent picture on right and left handside
		var transparentR = this.game.add.sprite(720, 75, 'transparentR');
		var transparentL = this.game.add.sprite(0, 75, 'transparentL');
		transparentR.fixedToCamera = true;
		transparentL.fixedToCamera = true;


		// The toolbar-background
		var toolbar = this.game.add.sprite(0, 0, 'toolbar');
		toolbar.fixedToCamera = true;

		// LevelText
		this.levelText = game.add.text(200, 30 , level.levelName, {
      font: "17px Arial",
      fill: "#FFF",
      align: "left"
    });
    this.levelText.fixedToCamera = true;

		// The toolbar homebutton
		this.homeButton = this.game.add.button(10, this.gameTimeTextY, 'homeButton', function() {this.game.state.start('MainMenu');});
		this.homeButton.fixedToCamera = true;

		// The toolbar restartbutton
		this.restartButton = this.game.add.button(70, this.gameTimeTextY, 'restartButton', function() {this.game.state.start(this.game.state.current);});
		this.restartButton.fixedToCamera = true;

		// The toolbar pausebutton
		this.pauseButton = this.game.add.sprite(130, this.gameTimeTextY, 'pauseButton');
		this.pauseButton.inputEnabled = true;
		this.pauseButton.events.onInputUp.add(function () {this.game.paused = true;},this);
		this.game.input.onDown.add(function () {if(this.game.paused)this.game.paused = false;},this);
		this.pauseButton.fixedToCamera = true;

		// Coins in the scoreboard
		this.coins = game.add.group();
		this.coins.fixedToCamera = true;

		// TimeText in the game
		this.gameTimeText = game.add.text(this.gameTimeTextX, this.gameTimeTextY , "Time: 0.0", {
      font: "17px Arial",
      fill: "#FFF",
      align: "left"
    });
    this.gameTimeText.fixedToCamera = true;

		// Show how many Pogys reached home in le scoreboard
		var homePogy = this.game.add.sprite(this.pogyX,  this.pogyY+5, 'pogy');
		homePogy.fixedToCamera = true;
    this.pogyText = game.add.text(this.pogyX+40, this.gameTimeTextY, "0", {
    	font: "17px Arial",
      fill: "#FFF",
      align: "left"
    });
    this.pogyText.fixedToCamera = true;

    //Buttons and counter for BuildPogy
    this.buildPogy = this.game.add.button(this.centerX-50, this.gameTimeTextY, 'ladder', this.buildCallback);
    this.buildPogy.fixedToCamera = true;
    this.buildPogyText = game.add.text(this.centerX, this.gameTimeTextY, "0", {font: "17px Arial",fill: "#FFF",align: "left"});
    this.buildPogyText.fixedToCamera = true;
    if(level.hideBuildPogy) {
    	this.buildPogy.alpha = 0;
    	this.buildPogyText.alpha = 0;
    }

    //Buttons and counter for DigPogy
    this.digPogy = this.game.add.button(this.centerX+30, this.gameTimeTextY, 'spade', this.digCallback);
    this.digPogy.fixedToCamera = true;
    this.digPogyText = game.add.text(this.centerX+85, this.gameTimeTextY, "0", {font: "17px Arial",fill: "#FFF",align: "left"});
    this.digPogyText.fixedToCamera = true;
    if(level.hideDigPogy) {
    	this.digPogy.alpha = 0;
    	this.digPogyText.alpha = 0;
    }
	},

	update: function(){
		guiwinningscreen.update();

		// Update how many pogys we got left
		this.digPogyText.setText(level.nrOfDigPogys);
		this.buildPogyText.setText(level.nrOfBuildPogys);
		
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

	digCallback: function(){
		if(gui.digPogy.alpha == 1 && !level.levelTimer.paused){
			gui.digPogy.alpha = 0.5;
			if(!level.hideBuildPogy) {
				gui.buildPogy.alpha = 1;
			}
			
			digpogy.active = true;
			buildpogy.active = false;
		} else if(!level.levelTimer.paused){
			gui.digPogy.alpha = 1;

			digpogy.active = false;
		}
	},

	buildCallback: function(){
		if(gui.buildPogy.alpha == 1 && !level.levelTimer.paused){
			gui.buildPogy.alpha = 0.5;
			if(!level.hideDigPogy) {
				gui.digPogy.alpha = 1;
			}
			
			buildpogy.active = true;
			digpogy.active = false;

		}
		else if(!level.levelTimer.paused){
			gui.buildPogy.alpha = 1;

			buildpogy.active = false;
		}
	},
};


