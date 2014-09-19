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

	//Dig & build pogy
	this.digPogy = null;
	//this.activeDig = false;
	this.buildPogy = null;
	//this.activeBuild = false;
	this.centerX = this.game.world.centerX;
};

GUI.prototype = {
	preload: function(){
		// Load images
		this.game.load.image('coin', 'assets/coin.png');
		this.game.load.image('pogy', 'assets/dudeHome.png');
		this.game.load.image('toolbar', 'assets/toolbar.png');
		this.game.load.image('ladder', 'assets/ladder.png');
		this.game.load.image('spade', 'assets/spade.png');
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

    //Buttons for build and dig pogy
    var digPogy = this.game.add.button(this.centerX+35, this.pogyY, 'spade', actionDig, this, null, null, 'unclicked', 'clicked');
    digPogy.fixedToCamera = true;
    var buildPogy = this.game.add.button(this.centerX-35, this.pogyY, 'ladder', actionBuild, this, null, null, 'unclicked', 'clicked');
    buildPogy.fixedToCamera = true;
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

function actionDig(button){
	//If the other button is not active and 
	if(digpogy.active && !buildpogy.active){
		console.log("Build: " + buildpogy.active);
		button.alpha = 0.5;
		digpogy.active = false;
		console.log("Digbutton active")
	}
	else {
		console.log("Build: " + buildpogy.active);
		digpogy.active = true;
		button.alpha = 1;
		console.log("Digbutton inactive")
	}
}

function actionBuild(button){
	if(buildpogy.active && !digpogy.active){
		console.log("Dig: " + digpogy.active);
		button.alpha = 0.5;
		buildpogy.active = false;
		console.log("Buildbutton active")
	}
	else {
		console.log("Dig: " + digpogy.active);
		buildpogy.active = true;
		button.alpha = 1;
		console.log("Buildbutton inactive")
	}
}