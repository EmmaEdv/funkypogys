LevelOne = function(game){
	this.game = game;
	this.sprite = null;
	this.map = null;
	this.layer = null;
};

LevelOne.prototype = {
	preload: function(){
		this.game.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('ground', 'assets/tiles.png', 1920, 1080);
    //this.game.load.image('coin', 'assets/coin.png', 20, 20);
    this.game.load.image('houses', 'assets/house.png', 174, 91);
	},

	create: function(){
    this.game.stage.backgroundColor = '#4567EE';
		
		// Create the map
    this.map = this.game.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'ground');
    this.map.addTilesetImage('house', 'houses');

    this.layer = this.map.createLayer('ground');
    this.layer = this.map.createLayer('sky');
    this.layer = this.map.createLayer('houseHome');
    this.layer = this.map.createLayer('houseAway');
		this.layer = this.map.createLayer('coin');
	},

	update: function(){

	}
}