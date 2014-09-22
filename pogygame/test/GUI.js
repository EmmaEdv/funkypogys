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

	//Dig & build pogy
	this.digPogy = null;
	this.digPogyText = null;
	//this.activeDig = false;
	this.buildPogy = null;
	this.buildPogyText = null;
	//this.activeBuild = false;
	this.centerX = this.game.world.centerX;

	this.homeButton = null;
	this.restartButton = null;
	this.pauseButton = null;
};

GUI.prototype = {
	preload: function(){
		// Load images
		this.game.load.image('coin', 'assets/coin.png');
		this.game.load.image('pogy', 'assets/dudeHome.png');
		this.game.load.image('toolbar', 'assets/toolbar.png');
		this.game.load.image('ladder', 'assets/ladder.png');
		this.game.load.image('spade', 'assets/spade.png');
		this.game.load.image('winningScreen', 'assets/winningScreen.png');
		this.game.load.image('homeButton', 'assets/home.png');
		this.game.load.image('restartButton', 'assets/restart.png');
		this.game.load.image('pauseButton', 'assets/pause.png');

		guiwinningscreen = new GUIWinningScreen(this.game);
    guiwinningscreen.preload();
	},

	create: function(){
		//Create a winningscreen (GUIWinningScreen.js)
		guiwinningscreen.create();

		// The toolbar-background
		var toolbar = this.game.add.sprite(0, 0, 'toolbar');
		toolbar.fixedToCamera = true;

		// The toolbar homebutton
		this.homeButton = this.game.add.button(10, 10, 'homeButton', function() {this.game.state.start('MainMenu');});
		this.homeButton.fixedToCamera = true;

		// The toolbar restartbutton
		this.restartButton = this.game.add.button(70, 10, 'restartButton', function() {this.game.state.start('startLevelOne',true,false);});
		this.restartButton.fixedToCamera = true;

		// The toolbar pausebutton
		this.pauseButton = this.game.add.sprite(130, 10, 'pauseButton');
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
      fill: "#000",
      align: "left"
    });
    this.gameTimeText.fixedToCamera = true;

		// Show how many Pogys reached home in le scoreboard
		var homePogy = this.game.add.sprite(this.pogyX, this.pogyY, 'pogy');
		homePogy.fixedToCamera = true;
    this.pogyText = game.add.text(this.pogyX+40, this.pogyY+15, "0", {
    	font: "17px Arial",
      fill: "#000",
      align: "left"
    });
    this.pogyText.fixedToCamera = true;

    //Buttons and counter for DigPogy
    digPogy = this.game.add.button(this.centerX+35, this.pogyY, 'spade', digCallback, null, null, null, 'unclicked', 'clicked');
    digPogy.fixedToCamera = true;
    this.digPogyText = game.add.text(this.centerX+70, this.pogyY, "0", {font: "17px Arial",fill: "#000",align: "left"});
    this.digPogyText.fixedToCamera = true;

    //Buttons and counter for BuildPogy
    buildPogy = this.game.add.button(this.centerX-35, this.pogyY, 'ladder', buildCallback, null, null, null, 'unclicked', 'clicked');
    buildPogy.fixedToCamera = true;
    this.buildPogyText = game.add.text(this.centerX,this.pogyY,"0", {font: "17px Arial",fill: "#000",align: "left"});
    this.buildPogyText.fixedToCamera = true;
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
	}
};

function digCallback(){
	//console.log();
	if(digPogy.alpha == 1 && !level.levelTimer.paused){
		digPogy.alpha = 0.5;
		buildPogy.alpha = 1;
		digpogy.active = true;
		buildpogy.active = false;
	}
	else if(!level.levelTimer.paused){
		digPogy.alpha = 1;
		digpogy.active = false;
	}
}

function buildCallback(){
	if(buildPogy.alpha == 1 && !level.levelTimer.paused){
		buildPogy.alpha = 0.5;
		digPogy.alpha = 1;
		buildpogy.active = true;
		digpogy.active = false;
	}
	else if(!level.levelTimer.paused){
		buildPogy.alpha = 1;
		buildpogy.active = false;
	}
}
