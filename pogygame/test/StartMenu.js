StartMenu = function(game){
	this.game = game;
	this.levelOneButton = null
	this.levelTwoButton = null
	this.levelThreeButton = null
	this.levelFourButton = null
};

StartMenu.prototype = {
	preload: function(){
		this.game.load.image('backgroundPicture', 'assets/MenuBackground.png');
		this.game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
	},

	create: function(){
		this.game.add.sprite(0,0,'backgroundPicture');
		this.levelOneButton = this.game.add.button(200, 400, 'button', levelOne, this, 2);
		this.levelTwoButton = this.game.add.button(400, 400, 'button', levelTwo, this, 2);
	},

	update: function(){
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

