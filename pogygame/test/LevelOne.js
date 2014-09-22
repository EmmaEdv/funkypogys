LevelOne = function(game){
	this.game = game;
	this.map = null;
	this.groundLayer = null;
  this.coins = null;
  this.homes = null;

  this.buildLayer = null;
  // Counter for our Pogys
  this.nrOfPogys = 10;
	this.pogyCounter = 0;
	this.coinsCounter = 0;

  this.tileSize = 70;
  this.startYpos = 300;

  this.levelTimer = null;
};

LevelOne.prototype = {
	preload: function(){
	  this.game.load.tilemap('map', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('coin', 'assets/coin.png');
	  this.game.load.image('kenney', 'assets/kenney.png');
	  this.game.load.image('sky', 'assets/sky2.png');
	  this.game.load.image('home', 'assets/dudeHome.png');
	  this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},

	create: function(){
		//  Create our Timer
   	this.levelTimer = game.time.create(false);
    this.levelTimer.add(60 * 1000, endGame, this);
    this.levelTimer.start();

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 1750, 640);

		// Set background
		this.game.add.sprite(0,0,'sky');

		// Create the map
		this.map = this.game.add.tilemap('map');

		// Add Tileset
		this.map.addTilesetImage('kenney');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');
		//Add build and dig layer
		//this.buildLayer = this.map.createBlankLayer('Build Layer', 25, 11, this.tileSize, this.tileSize);

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
	},

	update: function(){
	}
};

function endGame() {
	console.log("End");
}
