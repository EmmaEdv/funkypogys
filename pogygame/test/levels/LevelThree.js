LevelThree = function(game){
	this.game = game;
	this.levelName = "Level Three";
	this.nextLevel = "startLevelFour";
	this.levelScore = null;
	this.map = null;

	this.groundLayer = null;

	// Objects from tilemap
  this.homes = null;
  this.coins = null;
  this.coinsDown = null; // For the animation
  this.buildPogys = null;
  this.buildPogysDown = true; // For the animation
  this.digPogys = null 
  this.digPogysDown = true; // For the animation

  // Counter for our Pogys
  this.nrOfPogys = 5;
  this.nrOfBuildPogys = 2;
  this.nrOfDigPogys = 0;

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
  this.startYpos = 300;
  this.startXpos = 25;

  // Timer for the level
  this.levelDuration = 60 // In sec
  this.levelTimer = null;

  // IF tutorial should start
  this.showTutorialCamera = false;
  this.showTutorialDig = false;
  this.showTutorialBuild = false;
};

LevelThree.prototype = {
	preload: function(){
		// TileMaps
		this.game.load.tilemap('map3', 'assets/tilemap-level3.json', null, Phaser.Tilemap.TILED_JSON);

		// TileSets
		this.game.load.image('tileMap', 'assets/tileMap.png');

		// Images
		this.game.load.image('spade', 'assets/spade.png');
		this.game.load.image('spadeBtn', 'assets/shovel_btn.png');
		
		this.game.load.image('ladder', 'assets/build.png');
		this.game.load.image('ladderBtn', 'assets/ladder_btn.png');


	  this.game.load.image('coin', 'assets/pogyCoin.png');
	  this.game.load.image('pogy', 'assets/pogyHome.png', 4);
	  this.game.load.image('toolbar', 'assets/woodenBar.png');
	  this.game.load.image('background', 'assets/bgMorning.png');
	  this.game.load.image('homeButton', 'assets/homebutton.png');
	  this.game.load.image('pauseButton', 'assets/pausebutton.png');
	  this.game.load.image('nextLevelButton', 'assets/nextButton.png');
	  this.game.load.image('tutCamera', 'assets/pratbubbla_shade.png');
	  this.game.load.image('winningScreen', 'assets/winningScreen.png');
	  this.game.load.image('tutDigPogy', 'assets/pratbubbla_shovel.png');
	  this.game.load.image('backgroundPicture', 'assets/bgMorning.png');
	  this.game.load.image('restartButton', 'assets/restartbutton.png');
		this.game.load.image('tutBuildPogy', 'assets/pratbubbla_ladder.png');
		this.game.load.image('tutBlowPogy', 'assets/pratbubbla_blow.png');
		
		// Spritesheet
		this.game.load.spritesheet('dude', 'assets/pogys_small.png', 28, 33);
		this.game.load.spritesheet('buttonOne', 'assets/level1.png', 160, 100);
		this.game.load.spritesheet('buttonTwo', 'assets/level2.png', 160, 100);
		this.game.load.spritesheet('buttonThree', 'assets/level3.png', 160, 100);
		this.game.load.spritesheet('explosion', 'assets/explosion320.png', 128, 128);

		//Sounds
		/*this.game.load.audio('digTile', 'Sounds/dig.wav');
		this.game.load.audio('buildTile', 'Sounds/build.wav');
		this.game.load.audio('explosionSound', 'Sounds/explosion.wav');*/
	},

	create: function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//  Create our Timer
   	this.levelTimer = game.time.create(false);
    this.levelTimer.add(this.levelDuration * 1000, this.endGame, this);
    this.levelTimer.start();

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 1750, 560);

		// Backgroundpicture
		this.game.add.sprite(0,0,'background');

		// Create the map
		this.map = this.game.add.tilemap('map3');

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

		//Blow up pogy - tutorial image
		this.game.add.image(297, 320, 'tutBlowPogy');	
	},

	update: function(){
		// If a new highscore is set on the game, update the global variable
		if(this.levelScore > boot.levelThreeScore) {
		 	boot.levelThreeScore = this.levelScore;
		}
	},

	// If the game is over
	endGame: function(){
		guiendgamescreen.openWindow();
		level.levelTimer.pause();
		level.gameOver = true;
	},
};

