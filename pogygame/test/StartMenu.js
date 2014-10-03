StartMenu = function(game){
	this.game = game;

	// Buttons for levels
	this.levelOneButton = null;
	this.levelTwoButton = null;
	this.levelThreeButton = null;
	this.levelFourButton = null;

  //Startposition for our pogys
  this.startYpos = 550;
  this.nrOfPogys = 10;
};

StartMenu.prototype = {
	preload: function(){
		this.game.load.image('backgroundPicture', 'assets/background.png');
		this.game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);

		this.game.load.tilemap('map', 'assets/tilemap-level1.json', null, Phaser.Tilemap.TILED_JSON);
	  this.game.load.image('kenney', 'assets/kenney.png');
	  this.game.load.spritesheet('dude', 'assets/pogy.png', 33, 43);
	},

	create: function(){

		// Set physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Set bounds to the world
		this.game.world.setBounds(0, 0, 800, 700);

		// Create the map
		this.map = this.game.add.tilemap('map');

		// Add Tileset
		this.map.addTilesetImage('kenney');

		// Add Create Layer
		this.groundLayer = this.map.createLayer('Tile Layer 1');

		// Backgroundpicture
		this.game.add.sprite(0,0,'backgroundPicture');

		// Set Collision
		this.map.setCollision(32);
		this.map.setCollision(34);

		// Levelbutton
		this.levelOneButton = this.game.add.button(200, 400, 'button', levelOne, this, 2);
		this.levelTwoButton = this.game.add.button(400, 400, 'button', levelTwo, this, 2);

		// Level highscore texts
		var levelOneHighScore = game.add.text(220, 480, "Highscore: " + boot.levelOneScore, {font: "17px Arial",fill: "#FFF",align: "left"});
		var levelTwoHighScore = game.add.text(420, 480, "Highscore: " + boot.levelTwoScore, {font: "17px Arial",fill: "#FFF",align: "left"});
	},

	update: function(){
		pogy.update();
	}
};

function levelOne () {
	console.log("Start Level One");	
  this.game.state.start('startLevelOne');
}

function levelTwo () {
	console.log("Start Level Two");	
  this.game.state.start('startLevelTwo');
}

