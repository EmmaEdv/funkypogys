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
		// TileMaps
		this.game.load.tilemap('map0', 'assets/tilemap-level0.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map1', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map2', 'assets/tilemap-level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map3', 'assets/tilemap-level3.json', null, Phaser.Tilemap.TILED_JSON);

		// TileSets
		this.game.load.image('tileMap', 'assets/tileMap.png');

		// Images
		this.game.load.image('background', 'assets/bgMorning.png');
		this.game.load.image('welcome', 'assets/welcome_pogy.png');
		
		// Spritesheet
		this.game.load.spritesheet('dude', 'assets/pogys_small.png', 28, 33);
		this.game.load.spritesheet('buttonOne', 'assets/level1.png', 100, 100);
		this.game.load.spritesheet('buttonTwo', 'assets/level2.png', 100, 100);
		this.game.load.spritesheet('buttonThree', 'assets/level3.png', 100, 100);
		this.game.load.spritesheet('buttonFour', 'assets/level4.png', 100, 100);
		this.game.load.spritesheet('buttonFive', 'assets/level5.png', 100, 100);

		//Sounds
		this.game.load.audio('digTile', 'Sounds/dig.wav');
		this.game.load.audio('buildTile', 'Sounds/build.wav');
		this.game.load.audio('pickUpCoin', 'Sounds/coin.wav');
		this.game.load.audio('explosionSound', 'Sounds/explosion.wav');
    this.game.load.audio('pickUpObject', 'Sounds/collect.wav');
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
		this.levelFourButton = this.game.add.button(430, 200, 'buttonFour');
		this.levelFiveButton = this.game.add.button(530, 200, 'buttonFive');

		this.levelFourButton.alpha = 0.5;
		this.levelFiveButton.alpha = 0.5;

		// Level highscore texts
		var highScore = game.add.text(20, 285, "Highscore: ", {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelOneHighScore = game.add.text(171, 285, ""+boot.levelOneScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelTwoHighScore = game.add.text(273, 285, ""+boot.levelTwoScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelThreeHighScore = game.add.text(375, 285, ""+boot.levelThreeScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
	
		// Play the Theme Song
		this.themeSong = this.game.add.audio('theme',1,true);
		//this.themeSong.play();
	},

	update: function(){
	}
};

function levelOne () {
	console.log("Start Level One");	
  this.game.state.start('startLevelOne');
}

function levelTwo () {
	console.log("Start Level Two");	
  this.game.state.start('startLevelTwo');
}

function levelThree () {
	console.log("Start Level Three");	
  this.game.state.start('startLevelThree');
}

