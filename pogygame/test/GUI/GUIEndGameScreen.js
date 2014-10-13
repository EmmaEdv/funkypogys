GUIEndGameScreen = function(game){
	this.game = game;

	// Background
	this.winningScreen = null;

	// Measures
	this.winningScreenStartX = 250;
	this.winningScreenStartY = 150;
	this.spaceBetweenText = 40;
	this.buttonsY = 240;
	this.buttonsInBetween = 70;

	// Which Level Text
	this.levelText = null;

	// Losingtext
	this.losingText = null;

	// Total Game Time
	this.totalGameTimeText = null;
	this.totalGameTimeTextTween = null;

	// Total number of coins
	this.totalNumberOfCoinsText = null;
	this.totalNumberOfCoinsTextTween = null;

	// Total number of Pogys
	this.totalNumberOfPogys = null;
	this.totalNumberOfPogysTween = null;

	// Total Score
	this.totalScore = null;
	this.totalScoreTween = null;

	// Buttons
	this.restartButton = null;
	this.homeButton = null;
	this.nextLevelButton = null;

	//"Let's give level 2 a try"-image
	this.yeehaaImg = null;
};

GUIEndGameScreen.prototype = {
	preload: function(){
	},

	create: function(){

		// The WinningScreen, background
		this.winningScreen = game.add.sprite(this.winningScreenStartX, this.winningScreenStartY, 'winningScreen');
    //this.winningScreen.alpha = 1.0;
    this.winningScreen.inputEnabled = true;
    this.winningScreen.scale.set(0);
    this.winningScreen.fixedToCamera = true;


    // Total Game Time Text
		this.levelText = game.add.text(this.winningScreenStartX+70, 
			this.winningScreenStartY+10, 
			level.levelName, {
      font: "30px Chalkduster",
      fill: "#FFF",
      align: "center"
    });
    this.levelText.fixedToCamera = true;
    this.levelText.scale.set(0);

    // Total Game Time Text
		this.losingText = game.add.text(this.winningScreenStartX+60, 
			this.winningScreenStartY+70, 
			"Sorry, no pogy came home \n\n\n          Try again!", {
      font: "12px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.losingText.fixedToCamera = true;
    this.losingText.scale.set(0);

    // Total Game Time Text
		this.totalGameTimeText = game.add.text(this.winningScreenStartX+15, 
			this.winningScreenStartY+this.spaceBetweenText*2, 
			"Total Time: 0", {
      font: "17px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.totalGameTimeText.fixedToCamera = true;
    this.totalGameTimeText.scale.set(0);

    // Total number of coins
    this.totalNumberOfCoinsText = game.add.text(this.winningScreenStartX+15, 
			this.winningScreenStartY+this.spaceBetweenText*3, 
			"Number of coins: 0", {
      font: "17px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.totalNumberOfCoinsText.fixedToCamera = true;
    this.totalNumberOfCoinsText.scale.set(0);

    // Total number of Pogys
		this.totalNumberOfPogys = game.add.text(this.winningScreenStartX+15, 
			this.winningScreenStartY+this.spaceBetweenText*4, 
			"Total Number Of Pogyz: 0", {
      font: "17px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.totalNumberOfPogys.fixedToCamera = true;
    this.totalNumberOfPogys.scale.set(0);

    // Total score
		this.totalScore = game.add.text(this.winningScreenStartX+15, 
			this.winningScreenStartY+this.spaceBetweenText*5, 
			"Total score: 0", {
      font: "17px Chalkduster",
      fill: "#FFF",
      align: "left"
    });
    this.totalScore.fixedToCamera = true;
    this.totalScore.scale.set(0);

    // Buttons on the winningscreen. Set these fixedToCamera and to scale zero.
    this.restartButton = this.game.add.button(this.winningScreenStartX+this.buttonsInBetween, this.winningScreenStartY + this.buttonsY, 'restartButton', function() {this.game.state.start(this.game.state.current);});
		this.restartButton.fixedToCamera = true;
		this.restartButton.scale.set(0);
		this.homeButton = this.game.add.button(this.winningScreenStartX+this.buttonsInBetween*2, this.winningScreenStartY + this.buttonsY, 'homeButton', function() {this.game.state.start('MainMenu');});
		this.homeButton.fixedToCamera = true;
		this.homeButton.scale.set(0);
		this.nextLevelButton = this.game.add.button(this.winningScreenStartX+this.buttonsInBetween*3, this.winningScreenStartY + this.buttonsY, 'nextLevelButton', function() {this.game.state.start(level.nextLevel)});
		this.nextLevelButton.fixedToCamera = true;
		this.nextLevelButton.scale.set(0);
	},

	update: function(){
		// Update the time
		this.totalGameTimeText.setText("Time left: " + (level.levelTimer.duration.toFixed(1)/1000).toFixed(1));

		// Update the Number of Coins	
		this.totalNumberOfCoinsText.setText("Number of coins: "+ level.coinsCounter);	

		// Update the Number of Pogys
		this.totalNumberOfPogys.setText("Total number of Pogys: " + level.pogyCounter);

		// Show the screen when all pogys are home or if all pogys are dead
		if(level.pogyCounter == level.nrOfPogys || level.pogysLeft == 0) {
			this.openWindow();
			level.levelTimer.pause();
		}
	},

	// Open winningScreen
	openWindow: function() {
		// It should not be possible to dig/build after the endscreen opens
		buildpogy.active = false;
		digpogy.active = false;

    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    this.winningScreen.scale.set(1);
    this.levelText.scale.set(1);

    this.restartButton.scale.set(1);
    this.homeButton.scale.set(1);
    
    // If more than zero pogy reach the homre
    if(level.pogyCounter != 0) {
    	if(level.nextLevel == "startLevelTwo") {
    		this.yeehaaImg = this.game.add.image(30, 100, 'levelPogy');
    		this.yeehaaImg.fixedToCamera = true;
    	}
    	// Show new level buttom and show total time in 1sec
    	this.nextLevelButton.scale.set(1);
    	this.updateFinshLevel();
    	this.game.time.events.add(Phaser.Timer.SECOND , this.showTotalTimeText, this);
    } else {
    	// Show the text about losing
    	this.losingText.scale.set(1);
    }
	},

	// Next four functions happends after eachother. One secound in between
	showTotalTimeText: function() {
		this.totalGameTimeTextTween = this.game.add.tween(this.totalGameTimeText.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.game.time.events.add(Phaser.Timer.SECOND , this.showTotalNumberOfCoinsText, this);
	},

	showTotalNumberOfCoinsText: function() {
		this.totalNumberOfCoinsTextTween = this.game.add.tween(this.totalNumberOfCoinsText.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.game.time.events.add(Phaser.Timer.SECOND , this.showTotalNumberOfPogys, this);
	},

	showTotalNumberOfPogys: function() {
		this.totalNumberOfPogysTween = this.game.add.tween(this.totalNumberOfPogys.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
		this.game.time.events.add(Phaser.Timer.SECOND , this.showTotalScore, this);
	},

	showTotalScore: function() {
		this.calculateTotalScore()
		this.totalScoreTween = this.game.add.tween(this.totalScore.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	},

	calculateTotalScore: function() {
		var totScore = ((level.coinsCounter * level.pogyCounter) * (level.levelTimer.duration.toFixed(1)/1000));
		this.totalScore.setText("Total Score: " + totScore.toFixed(1));
		level.levelScore = totScore.toFixed(0);
	},

	updateFinshLevel: function() {
		if(level.levelName == "Level One") {
			boot.levelOneFinish = true;
		} else if(level.levelName == "Level Two") {
			boot.levelTwoFinish = true;
		} else if(level.levelName == "Level Three") {
			boot.levelThreeFinish = true;
		} else {
			boot.levelFourFinish = true;
		}
	}
};
