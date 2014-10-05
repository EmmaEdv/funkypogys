boot = function(game){
	this.game = game;

	  /////////////////////////////////
	 // Gobal variables for le game //
	/////////////////////////////////

	// Score for each level
	this.levelOneScore = 0;
	this.levelTwoScore = 0;
};

boot.prototype = {
	preload: function(){
		var states = {};
		game.state.add('MainMenu',startStartMenu, true);
		game.state.add('startLevelOne',startLevelOne);
		game.state.add('startLevelTwo',startLevelTwo);
	},

	create: function(){
	},

	update: function(){
	},
};
