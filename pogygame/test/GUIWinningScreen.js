GUIWinningScreen = function(game){
	this.game = game;

	// Background and Tween
	this.winningScreen = null;
	this.winningScreenTween = null;
	this.winningScreenStartX = 250;
	this.winningScreenStartY = 150;

	// Total Game Time
	this.totalGameTimeText = null;
	this.totalGameTimeTextTween = null;

	// Total number of coins
	this.totalNumberOfCoinsText = null;
	this.totalNumberOfCoinsTextTween = null;

	// Total number of Pogys
	this.totalNumberOfPogys = null;
	this.totalNumberOfPogysTween = null;

};

GUIWinningScreen.prototype = {
	preload: function(){
		// Upload background
		this.game.load.image('winningScreen', 'assets/winningScreen.png');
	},

	create: function(){
		// The WinningScreen, background
		this.winningScreen = game.add.sprite(this.winningScreenStartX, this.winningScreenStartY, 'winningScreen');
    this.winningScreen.alpha = 0.7;
    this.winningScreen.inputEnabled = true;
    this.winningScreen.scale.set(0);
    this.winningScreen.fixedToCamera = true;

    // Total Game Time Text
		this.totalGameTimeText = game.add.text(	this.winningScreenStartX+10, 
																						this.winningScreenStartY+30, 
																						"Total Time: 0", {
        font: "17px Arial",
        fill: "#000",
        align: "left"
    });
    this.totalGameTimeText.fixedToCamera = true;
    this.totalGameTimeText.scale.set(0);

    // Total number of coins
    this.totalNumberOfCoinsText = game.add.text(	this.winningScreenStartX+10, 
    																							this.winningScreenStartY+60, 
																									"Number of coins: 0", {
        font: "17px Arial",
        fill: "#000",
        align: "left"
    });
    this.totalNumberOfCoinsText.fixedToCamera = true;
    this.totalNumberOfCoinsText.scale.set(0);

    // Total number of Pogys
		this.totalNumberOfPogys = game.add.text(	this.winningScreenStartX+10, 
																							this.winningScreenStartY+90, 
																							"Total Number Of Pogyz: 0", {
        font: "17px Arial",
        fill: "#000",
        align: "left"
    });
    this.totalNumberOfPogys.fixedToCamera = true;
    this.totalNumberOfPogys.scale.set(0);
	},

	update: function(){
		// Update the time
		var time = JSON.stringify(gui.gameTime);
		time = time.slice(0,-2);
		this.totalGameTimeText.setText("Total Time: " + time);

		// Update the Number of Coins	
		this.totalNumberOfCoinsText.setText("Number of coins: "+ gui.coinsCounter);	

		// Update the Number of Pogys
		this.totalNumberOfPogys.setText("Total number of Pogys: " + gui.pogyCounter)

		// Show the scrren when all pogys are home
		if(gui.pogyCounter == pogy.nrOfPogys) {
			this.openWindow();
		}
	},

	// Open winningScreen
	openWindow: function() {
    if ((this.winningScreenTween && this.winningScreenTween.isRunning) || this.winningScreen.scale.x === 1) {
        return;
    }
    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    this.winningScreenTween = this.game.add.tween(this.winningScreen.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.totalGameTimeTextTween = this.game.add.tween(this.totalGameTimeText.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.totalNumberOfCoinsTextTween = this.game.add.tween(this.totalNumberOfCoinsText.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.totalNumberOfPogysTween = this.game.add.tween(this.totalNumberOfPogys.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
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


