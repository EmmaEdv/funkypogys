LevelOne = function(game){
	this.game = game;
	this.map = null;
	this.groundLayer = null;

  this.coins = null;
  this.homes = null;

  this.homeId = 1000;
  this.coinId = 666;

  
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
		this.game.add.sprite(0,0,'sky');
		// Create the map
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('kenney');
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		this.map.setCollision(32);
		this.groundLayer.debug = true;

		this.coins = this.game.add.group();
		this.coins.enableBody = true;
		this.map.createFromObjects('coins', this.coinId, 'coin', 0, true, false, this.coins);

		this.homes = this.game.add.group();
		this.homes.enableBody = true;
		this.map.createFromObjects('homes', 1000, null , 0, true, false, this.homes);
	},

	update: function(){

	}
};