LevelTwo = function(game){
	this.game = game;
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
  this.nrOfDigPogys = 2;

  //Show or hide Build/Dig-pogys
  this.hideBuildPogy = true;
  this.hideDigPogy = false;

  //How many is home/picked up
	this.pogyCounter = 0;
	this.coinsCounter = 0;
	this.pogysLeft = this.nrOfPogys;

	// Tilemap size
  this.tileSize = 70;

  //Startposition for our pogys
  this.startYpos = 130;

  // Timer for the level
  this.levelTimer = null;
};

LevelTwo.prototype = {
	preload: function(){
	  this.game.load.tilemap('map', 'assets/tilemap-level2.json', null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('coin', 'assets/coin.png');
	  this.game.load.image('kenney', 'assets/kenney.png');
	  this.game.load.image('sky', 'assets/sky2.png');
	  this.game.load.image('home', 'assets/dudeHome.png');
	  this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	  this.game.load.image('ladder', 'assets/ladder.png');
		this.game.load.image('spade', 'assets/spade.png');
	},

	create: function(){
		//  Create our Timer
   	this.levelTimer = game.time.create(false);
    this.levelTimer.add(60 * 1000, endGame, this);
    this.levelTimer.start();

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 1750, 640);

		// Set background
		// this.game.add.sprite(0,0,'sky');

		// Create the map
		this.map = this.game.add.tilemap('map');

		// Add Tileset
		this.map.addTilesetImage('kenney');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		// Set Collision
		this.map.setCollision(32);
		this.map.setCollision(34);

		// Debug
		this.groundLayer.debug = true;

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
	}
};

function endGame() {
	console.log("End");
}
