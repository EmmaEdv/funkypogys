LevelOne = function(game){
	this.game = game;
	this.levelName = "Level One";
	this.nextLevel = "startLevelTwo";
	this.levelScore = 0;

	this.map = null;
	this.groundLayer = null;

	// Objects from tilemap
  this.coins = null;
  this.homes = null;
  this.buildPogys = null;
  this.digPogys = null;

  // Counter for our Pogys
  this.nrOfPogys = 10;
  this.nrOfBuildPogys = 0;
  this.nrOfDigPogys = 0;

  //Show or hide Build/Dig-pogys
  this.hideBuildPogy = true;
  this.hideDigPogy = true;

  //How many is home/picked up
	this.pogyCounter = 0;
	this.coinsCounter = 0;
	this.pogysLeft = this.nrOfPogys;

	// Tilemap size
  this.tileSize = 35;

  //Startposition for our pogys
  this.startYpos = 290;
  this.startXpos = 25;

  // Timer for the level
  this.levelTimer = null;

  // If game is over
  this.gameOver = false;

  // IF tutorial should start
  this.showTutorialCamera = true;
  this.showTutorialDig = true;
  this.showTutorialBuild = false;
};

LevelOne.prototype = {
	preload: function(){
		// TileMaps
		this.game.load.tilemap('map0', 'assets/tilemap-level0.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map1', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('map2', 'assets/tilemap-level2.json', null, Phaser.Tilemap.TILED_JSON);

		// TileSets
		this.game.load.image('tileMap', 'assets/tileMap.png');

		// Images
		this.game.load.image('spade', 'assets/spade.png');
		this.game.load.image('ladder', 'assets/build.png');
	  this.game.load.image('coin', 'assets/pogyCoin.png');
	  this.game.load.image('pogy', 'assets/pogyHome.png', 4);
	  this.game.load.image('toolbar', 'assets/woodenBar.png');
	  this.game.load.image('levelPogy', 'assets/level_pogy.png');
	  this.game.load.image('background', 'assets/bgMorning.png');
	  this.game.load.image('homeButton', 'assets/homebutton.png');
	  this.game.load.image('pauseButton', 'assets/pausebutton.png');
	  this.game.load.image('nextLevelButton', 'assets/nextButton.png');
	  this.game.load.image('tutCamera', 'assets/pratbubbla_shaded.png');
	  this.game.load.image('winningScreen', 'assets/winningScreen.png');
	  this.game.load.image('tutDigPogy', 'assets/pratbubbla_shovel.png');
	  this.game.load.image('backgroundPicture', 'assets/bgMorning.png');
	  this.game.load.image('restartButton', 'assets/restartbutton.png');
		this.game.load.image('tutBuildPogy', 'assets/pratbubbla_ladder.png');
		
		// Spritesheet
		this.game.load.spritesheet('dude', 'assets/pogys_small.png', 28, 33);
		this.game.load.spritesheet('buttonOne', 'assets/level1.png', 160, 100);
		this.game.load.spritesheet('buttonTwo', 'assets/level2.png', 160, 100);
		this.game.load.spritesheet('buttonThree', 'assets/level3.png', 160, 100);
		this.game.load.spritesheet('explosion', 'assets/explosion320.png', 64, 64);
	},

	create: function(){
		// Set physics to Arcade
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//  Create our Timer
   	this.levelTimer = game.time.create(false);
    this.levelTimer.add(60 * 1000, this.endGame, this);
    this.levelTimer.start();

		// Set bounds to the world
		//this.game.world.setBounds(0, 0, 1750, 640);
		this.game.world.setBounds(0, 0, 1750, 555);

		// Set background
		this.game.add.sprite(0,0,'background');

		// Create the map
		this.map = this.game.add.tilemap('map1');

		// Add Tileset
		this.map.addTilesetImage('tileMap');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		// Set Collision
		//this.map.setCollision(32);
		//this.map.setCollision(34);
		this.map.setCollision([1,2,3,4,5,6,7,8,9,16,17]);

		// Debug
		//this.groundLayer.debug = true;

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
		// Show camera tutorial in the begining
		if(this.showTutorialCamera) {
			this.showTutorialCamera = false;
			tutorialscreens.openCamera();
		}

		if(this.levelScore > boot.levelOneScore) {
		 	boot.levelOneScore = this.levelScore;
		}
	},

	endGame: function(){
		guiendgamescreen.openWindow();
		level.levelTimer.pause();
		level.gameOver = true;
	},
};
