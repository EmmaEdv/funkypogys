boot = function(game){
	this.game = game;

	  /////////////////////////////////
	 // Gobal variables for le game //
	/////////////////////////////////

	// Score for each level
	this.levelOneScore = 0;
	this.levelTwoScore = 0;
	this.levelThreeScore = 0;
	this.levelFourScore = 0;

	// Tilesettings
	this.tileAboveLadder = 18;
	this.tileLadder = 21;
	this.tileGround = 1;
	this.tileEmpty = 10;

	// If level is finished
	this.levelOneFinish = false;
	this.levelTwoFinish = false;
	this.levelThreeFinish = false;
	this.levelFourFinish = false;

};

boot.prototype = {
	// preload all images, sounds, tilemaps, tilesets for our game  //
	preload: function(){
		// Add all states to our game
		var states = {};
		game.state.add('MainMenu',startStartMenu, true);
		game.state.add('startLevelOne',startLevelOne);
		game.state.add('startLevelTwo',startLevelTwo);
		game.state.add('startLevelThree',startLevelThree);
		game.state.add('startLevelFour',startLevelFour);
	},

	create: function(){
	},

	update: function(){
	},
};
