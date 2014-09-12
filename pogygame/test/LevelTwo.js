LevelTwo = function(game){
	this.game = game;
	this.sprite = null;
	this.map = null;
	this.layer = null;
};

LevelTwo.prototype = {
	preload: function(){
		this.game.load.tilemap('map', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tree', 'assets/tree2-final.png', 256, 256);
    this.game.load.image('platform', 'assets/platform.png', 256, 256);
    this.game.load.image('number', 'assets/number-buttons-90x90.png', 256, 256);

	},

	create: function(){
    this.game.stage.backgroundColor = '#4567EE';
		// Create the map
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('platform');
    this.map.addTilesetImage('tree');
    this.map.addTilesetImage('number');
    this.layer = this.map.createLayer('collision');
    this.map.setCollisionBetween(1, 1000);

	},

	update: function(){

	}
}