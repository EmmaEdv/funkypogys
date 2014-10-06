LevelTwo = function(game){
	this.game = game;
	this.levelName = "Level Two";
	this.nextLevel = "MainMenu";
	this.levelScore = null;
	this.map = null;

	this.groundLayer = null;

	// Objects from tilemap
  this.coins = null;
  this.homes = null;
  this.buildPogys = null;
  this.digPogys = null;

  // Counter for our Pogys
  this.nrOfPogys = 1;
  this.nrOfBuildPogys = 10;
  this.nrOfDigPogys = 10;

  //Show or hide Build/Dig-pogys
  this.hideBuildPogy = false;
  this.hideDigPogy = false;

  //How many is home/picked up
	this.pogyCounter = 0;
	this.coinsCounter = 0;
	this.pogysLeft = this.nrOfPogys;

	// Tilemap size
  this.tileSize = 35;

  //Startposition for our pogys
  this.startYpos = 140;
  this.startXpos = 25;

  // Timer for the level
  this.levelDuration = 60 // In sec
  this.levelTimer = null;

  // IF tutorial should start
  this.showTutorialCamera = false;
  this.showTutorialDig = false;
  this.showTutorialBuild = true;
};

LevelTwo.prototype = {
	preload: function(){
	  this.game.load.tilemap('map', 'assets/tilemap-level2.json', null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('coin', 'assets/pogyCoin.png');
	  this.game.load.image('tileMap', 'assets/tileMap.png');
	  this.game.load.image('sky', 'assets/bgMorning.png');

	  this.game.load.spritesheet('dude', 'assets/pogys_small.png', 28, 33);
	  this.game.load.image('ladder', 'assets/build.png');
		this.game.load.image('spade', 'assets/spade.png');
	},

	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//  Create our Timer
   	this.levelTimer = game.time.create(false);
    this.levelTimer.add(this.levelDuration * 1000, this.endGame, this);
    this.levelTimer.start();

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 1750, 630);

		// Set background
		 this.game.add.sprite(0,0,'sky');

		// Create the map
		this.map = this.game.add.tilemap('map');

		// Add Tileset
		this.map.addTilesetImage('tileMap');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		// Set Collision
		this.map.setCollision([1,2,3,4,5,6,7,8,9,16,17]);

		// Debug
		// this.groundLayer.debug = true;

		// Add coins to the game
		this.coins = this.game.add.group();
		this.coins.enableBody = true;
		this.map.createFromObjects('coins', 666, 'coin', 0, true, false, this.coins);

		// Add home for the Pogys to the game
		this.homes = this.game.add.group();
		this.homes.enableBody = true;
		this.map.createFromObjects('homes', 1000, null , 0, true, false, this.homes);

		// Add home for the Pogys to the game
		this.digPogys = this.game.add.group();
		this.digPogys.enableBody = true;
		this.map.createFromObjects('digger', 1001, 'spade' , 0, true, false, this.digPogys);

		// Add home for the Pogys to the game
		this.buildPogys = this.game.add.group();
		this.buildPogys.enableBody = true;
		this.map.createFromObjects('builder', 1002, 'ladder' , 0, true, false, this.buildPogys);
	},

	update: function(){
		// If a new highscore is set on the game, update the global variable
		if(this.levelScore > boot.levelTwoScore) {
		 	boot.levelTwoScore = this.levelScore;
		}
	},

	// If the game is over
	endGame: function(){
		guiendgamescreen.openWindow();
		level.levelTimer.pause();
		level.gameOver = true;
	},
};

