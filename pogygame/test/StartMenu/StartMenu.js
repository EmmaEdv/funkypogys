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
		this.game.load.image('backgroundPicture', 'assets/bgMorning.png');
		this.game.load.spritesheet('buttonOne', 'assets/level1.png', 160, 100);
		this.game.load.spritesheet('buttonTwo', 'assets/level2.png', 160, 100);
		this.game.load.spritesheet('buttonThree', 'assets/level3.png', 160, 100);
		this.game.load.tilemap('map', 'assets/tilemap-level0.json', null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('tileMap', 'assets/tileMap.png');
	  this.game.load.spritesheet('dude', 'assets/pogys_small.png', 28, 33);
	  this.game.load.audio('theme', 'Sounds/theme.mp3');
	},

	create: function(){

		// Backgroundpicture
		this.game.add.sprite(0,0,'backgroundPicture');

		// Set physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 800, 630);

		// Create the map
		this.map = this.game.add.tilemap('map');

		// Add Tileset
		this.map.addTilesetImage('tileMap');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		// Set Collision
		this.map.setCollision([1,2,3,4,5,6,7,8,9,16,17]);

		// Levelbutton
		this.levelOneButton = this.game.add.button(200, 200, 'buttonOne', levelOne, this, 2);
		this.levelTwoButton = this.game.add.button(400, 200, 'buttonTwo', levelTwo, this, 2);

		// Level highscore texts
		var levelOneHighScore = game.add.text(220, 280, "Highscore: " + boot.levelOneScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
		var levelTwoHighScore = game.add.text(420, 280, "Highscore: " + boot.levelTwoScore, {font: "17px Chalkduster",fill: "#FFF",align: "left"});
	
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

