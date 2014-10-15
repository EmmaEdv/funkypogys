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
	this.levelOneFinish = true;
	this.levelTwoFinish = true;
	this.levelThreeFinish = true;
	this.levelFourFinish = true;

};

boot.prototype = {
	// preload all images, sounds, tilemaps, tilesets for the game  //
	preload: function(){
		// TileMaps
		this.game.load.tilemap('map0', 'assets/tilemap-level0.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map1', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map2', 'assets/tilemap-level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map3', 'assets/tilemap-level3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map4', 'assets/tilemap-level4.json', null, Phaser.Tilemap.TILED_JSON);

		// TileSets
		this.game.load.image('tileMap', 'assets/tileMap.png');

		// Buttons - Images
		this.game.load.image('buttonOne', 'assets/level1.png');
		this.game.load.image('buttonTwo', 'assets/level2.png');
		this.game.load.image('buttonThree', 'assets/level3.png');
		this.game.load.image('buttonFour', 'assets/level4.png');
		this.game.load.image('buttonFive', 'assets/level5.png');
		this.game.load.image('ladderBtn', 'assets/ladder_btn.png');
		this.game.load.image('spadeBtn', 'assets/shovel_btn.png');
		this.game.load.image('homeButton', 'assets/homebutton.png');
	  this.game.load.image('pauseButton', 'assets/pausebutton.png');
	  this.game.load.image('nextLevelButton', 'assets/nextButton.png');
	  this.game.load.image('restartButton', 'assets/restartbutton.png');

		// Backgrounds - Images
		this.game.load.image('background', 'assets/bgMorning.png');
		this.game.load.image('welcome', 'assets/welcome_pogy.png');
		this.game.load.image('winningScreen', 'assets/winningScreen.png');
		
		// In Game - Images
	  this.game.load.image('coin', 'assets/pogyCoin.png');
	  this.game.load.image('pogy', 'assets/pogyHome.png', 4);
	  this.game.load.image('toolbar', 'assets/woodenBar.png');
	  this.game.load.image('levelPogy', 'assets/level_pogy.png');
	  this.game.load.image('ladder', 'assets/build.png');
		this.game.load.image('spade', 'assets/spade.png');
		this.game.load.image('pointerBuild', 'assets/build_small.png');
		this.game.load.image('pointerDig', 'assets/spade_small.png');
		this.game.load.image('pointerError', 'assets/pointerError.png');

	  // Tutorial - Images
	  this.game.load.image('tutCamera', 'assets/pratbubbla_shaded.png');
	  this.game.load.image('tutDigPogy', 'assets/pratbubbla_shovel.png');
		this.game.load.image('tutBuildPogy', 'assets/pratbubbla_ladder.png');
		this.game.load.image('tutBlowPogy', 'assets/pratbubbla_blow.png');
		
		// Spritesheet
		this.game.load.spritesheet('dude', 'assets/pogys_small.png', 28, 33);
		this.game.load.spritesheet('explosion', 'assets/explosion320.png', 128, 128);

		// Sounds
		this.game.load.audio('digTile', 'Sounds/dig.wav');
		this.game.load.audio('buildTile', 'Sounds/build.wav');
		this.game.load.audio('pickUpCoin', 'Sounds/coin.wav');
		this.game.load.audio('explosionSound', 'Sounds/explosion.wav');
    this.game.load.audio('pickUpObject', 'Sounds/collect.wav');
		
		// Add all states to our game
		var states = {};
	},

	create: function(){
		game.state.add('MainMenu',startStartMenu, true);
		game.state.add('startLevelOne',startLevelOne);
		game.state.add('startLevelTwo',startLevelTwo);
		game.state.add('startLevelThree',startLevelThree);
		game.state.add('startLevelFour',startLevelFour);
	},

	update: function(){
	},
};
