GUIWinningScreen = function(game){
	this.game = game;

	// Background
	this.winningScreen = null;

	// Measures
	this.winningScreenStartX = 250;
	this.winningScreenStartY = 150;
	this.spaceBetweenText = 40;
	this.buttonsY = 250;
	this.buttonsInBetween = 70;

	// Which Level Text
	this.levelText = null;

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
};

GUIWinningScreen.prototype = {
	preload: function(){
		// Upload background
		this.game.load.image('winningScreen', 'assets/winningScreen.png');
		this.game.load.image('nextLevelButton', 'assets/nextButton.png');
	},

	create: function(){
		// The WinningScreen, background
		this.winningScreen = game.add.sprite(this.winningScreenStartX, this.winningScreenStartY, 'winningScreen');
    this.winningScreen.alpha = 0.7;
    this.winningScreen.inputEnabled = true;
    this.winningScreen.scale.set(0);
    this.winningScreen.fixedToCamera = true;


    // Total Game Time Text
		this.levelText = game.add.text(this.winningScreenStartX+80, 
			this.winningScreenStartY+10, 
			level.levelName, {
      font: "30px Arial",
      fill: "#000",
      align: "left"
    });
    this.levelText.fixedToCamera = true;
    this.levelText.scale.set(0);

    // Total Game Time Text
		this.totalGameTimeText = game.add.text(this.winningScreenStartX+10, 
			this.winningScreenStartY+this.spaceBetweenText*2, 
			"Total Time: 0", {
      font: "17px changetomorrowtoday",
      fill: "#000",
      align: "left"
    });
    this.totalGameTimeText.fixedToCamera = true;
    this.totalGameTimeText.scale.set(0);

    // Total number of coins
    this.totalNumberOfCoinsText = game.add.text(
    	this.winningScreenStartX+10, 
			this.winningScreenStartY+this.spaceBetweenText*3, 
			"Number of coins: 0", {
      font: "17px changetomorrowtoday",
      fill: "#000",
      align: "left"
    });
    this.totalNumberOfCoinsText.fixedToCamera = true;
    this.totalNumberOfCoinsText.scale.set(0);

    // Total number of Pogys
		this.totalNumberOfPogys = game.add.text(this.winningScreenStartX+10, 
			this.winningScreenStartY+this.spaceBetweenText*4, 
			"Total Number Of Pogyz: 0", {
      font: "17px changetomorrowtoday",
      fill: "#000",
      align: "left"
    });
    this.totalNumberOfPogys.fixedToCamera = true;
    this.totalNumberOfPogys.scale.set(0);

    // Total score
		this.totalScore = game.add.text(this.winningScreenStartX+10, 
			this.winningScreenStartY+this.spaceBetweenText*5, 
			"Total score: 0", {
      font: "17px changetomorrowtoday",
      fill: "#000",
      align: "left"
    });
    this.totalScore.fixedToCamera = true;
    this.totalScore.scale.set(0);

    // Buttons on the winningscreen
    this.restartButton = this.game.add.button(this.winningScreenStartX+this.buttonsInBetween, this.winningScreenStartY + this.buttonsY, 'restartButton', function() {this.game.state.start(this.game.state.current);});
		this.restartButton.fixedToCamera = true;
		this.restartButton.scale.set(0);
		this.homeButton = this.game.add.button(this.winningScreenStartX+this.buttonsInBetween*2, this.winningScreenStartY + this.buttonsY, 'homeButton', function() {this.game.state.start('MainMenu');});
		this.homeButton.fixedToCamera = true;
		this.homeButton.scale.set(0);
		this.nextLevelButton = this.game.add.button(this.winningScreenStartX+this.buttonsInBetween*3, this.winningScreenStartY + this.buttonsY, 'nextLevelButton', function() {
			if(this.game.state.current == 'startLevelOne') {
				this.game.state.start('startLevelTwo');
			}
			if(this.game.state.current == 'startLevelTwo') {
				this.game.state.start('MainMenu');
			}
		});
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

		// Show the screen when all pogys are home
		if(level.pogyCounter == level.nrOfPogys || level.pogysLeft == 0) {
			this.openWindow();
			level.levelTimer.pause();
		}
	},

	// Open winningScreen
	openWindow: function() {
    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    this.winningScreen.scale.set(1);
    this.levelText.scale.set(1);
    this.restartButton.scale.set(1);
    this.homeButton.scale.set(1);
    this.nextLevelButton.scale.set(1);
    this.game.time.events.add(Phaser.Timer.SECOND , this.showTotalTimeText, this);
	},

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
	},

	// Close winningScreen
	closeWindow: function() {
    if (this.winningScreenTween.isRunning || this.winningScreenTween.scale.x === 0) {
        return;
    }
    //  Create a tween that will close the window, but only if it's not already tweening or closed
    this.winningScreenTween = this.game.add.tween(this.winningScreen.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	}
};
