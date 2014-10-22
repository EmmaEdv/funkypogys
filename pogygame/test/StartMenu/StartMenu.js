StartMenu = function(game){
	this.game = game;

	// Buttons for levels
	this.levelOneButton = null;
	this.levelTwoButton = null;
	this.levelThreeButton = null;
	this.levelFourButton = null;

  //Startposition for our pogys
  this.startYpos = 150;
  this.nrOfPogys = 10;

  // Themesong
  this.themeSong = null;
};

StartMenu.prototype = {
	preload: function(){
	},

	create: function(){

		// Backgroundpicture
		this.game.add.sprite(0,0,'background');

		//Welcome pogy
		this.game.add.image(80, 10, 'welcome');

		// Set physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 800, 630);

		// Create the map
		this.map = this.game.add.tilemap('map0');

		// Add Tileset
		this.map.addTilesetImage('tileMap');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		// Set Collision
		this.map.setCollision([1,2,3,4,5,6,7,8,9,16,17]);

		// Levelbutton
		this.levelOneButton = this.game.add.button(130, 200, 'buttonOne', levelOne, this, 2);
		this.levelTwoButton = this.game.add.button(230, 200, 'buttonTwo', levelTwo, this, 2);
		this.levelThreeButton = this.game.add.button(330, 200, 'buttonThree', levelThree, this, 2);
		this.levelFourButton = this.game.add.button(430, 200, 'buttonFour', levelFour, this, 2);
		this.levelFiveButton = this.game.add.button(530, 200, 'buttonFive');

		// Set Alpha on levelButtons
		this.setAlphaOnLevelButton();

		// Level highscore texts
		var highScore = game.add.text(20, 285, "Highscore: ", {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelOneHighScore = game.add.text(171, 285, ""+boot.levelOneScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelTwoHighScore = game.add.text(274, 285, ""+boot.levelTwoScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelThreeHighScore = game.add.text(375, 285, ""+boot.levelThreeScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelFourHighScore = game.add.text(477, 285, ""+boot.levelFourScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelFiveHighScore = game.add.text(576, 285, ""+boot.levelFiveScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
	
		// Play the Theme Song
		this.themeSong = this.game.add.audio('theme',1,true);
		//this.themeSong.play();
	},

	update: function(){
	},

	// If the level before is not finish - set alpha to 0.5
	setAlphaOnLevelButton: function() {
		if(!boot.levelOneFinish) {this.levelTwoButton.alpha = 0.5;}
		if(!boot.levelTwoFinish) {this.levelThreeButton.alpha = 0.5;}
		if(!boot.levelThreeFinish) {this.levelFourButton.alpha = 0.5;}
		if(!boot.levelFourFinish) {this.levelFiveButton.alpha = 0.5;}
	}
};

function levelOne () {
	console.log("Start Level One");	
	this.game.state.start('startLevelOne');

}

function levelTwo () {
	if(boot.levelOneFinish) {
		console.log("Start Level Two");	
	  this.game.state.start('startLevelTwo');
	}
}

function levelThree () {
	if(boot.levelTwoFinish) {
		console.log("Start Level Three");	
	  this.game.state.start('startLevelThree');
	}
}

function levelFour () {
	if(boot.levelThreeFinish) {
		console.log("Start Level Four");	
	  this.game.state.start('startLevelFour');
	}
}
