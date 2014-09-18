LevelOne = function(game){
	this.game = game;
	this.sprite = null;
	this.map = null;
	this.groundLayer = null;
};

LevelOne.prototype = {
	preload: function(){
	  this.game.load.tilemap('tilemap-level1', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('kenney', 'assets/kenney.png');
	  this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.NINJA);

		this.map = this.game.add.tilemap('tilemap-level1');
		this.map.addTilesetImage('kenney');
		this.groundLayer = this.map.createLayer('Tile Layer 1');
		this.groundLayer.resizeWorld();

		this.map.setCollisionBetween(1, 147);

		this.groundLayer.debug = true;
	},

	update: function(){

	}
}