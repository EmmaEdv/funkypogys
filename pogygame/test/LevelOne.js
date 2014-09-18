LevelOne = function(game){
	this.game = game;
	this.sprite = null;
	this.map = null;
	this.groundLayer = null;
	this.homeLayer = null;
	this.startLayer = null;
	this.coinLayer = null;

  this.coins = null;
  this.coinId = 51;

  this.slope = null;
};

LevelOne.prototype = {
	preload: function(){
	  this.game.load.tilemap('map', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
	  /*this.game.load.image('tiles', 'assets/tiles.png', 1920, 1080);
	  this.game.load.image('coin', 'assets/coin.png', 20, 20);
	  this.game.load.image('arrow-button', 'assets/arrow-button.png', 224, 95);
	  this.game.load.image('sky', 'assets/sky2.png');

	  this.game.load.spritesheet('coinz', 'assets/coin.png', 20, 20);*/

	  this.game.load.image('tiles', 'assets/tileset1.png', 672, 224);
	  this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},

	create: function(){
		this.game.add.sprite(0,0,'sky');
		// Create the map
		this.map = this.game.add.tilemap('map');
		this.map.addTilesetImage('tiles', 'tiles');
		this.map.addTilesetImage('coin', 'coin');
		this.map.addTilesetImage('arrow-button', 'arrow-button');
		this.groundLayer = this.map.createLayer('platform');

		this.map.setCollisionByExclusion([51, 8045, 8093, 8094, 8095, 8096, 8097, 8098]);

		this.map.setCollision(67);

		this.groundLayer.debug = true;

		console.log("platform index " + this.map.getLayerIndex('platform'));

		this.coins = this.game.add.group();
		this.coins.enableBody = true;
		this.map.createFromObjects('coinz', 67, 'coin', 0, true, false, this.coins);

		this.slope = this.game.add.group();
		this.slope.enableBody = true;
		this.slope.immovable = true;
		this.map.createFromObjects('slope',  'coin', 0, true, false, this.slope);
	},

	update: function(){

	}
}