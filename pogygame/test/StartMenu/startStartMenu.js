startStartMenu = function(game){
	this.game = game;
};

startStartMenu.prototype = {
	preload: function(){

		level = new StartMenu(this.game);
		level.preload();
		pogy = new startPogy(this.game);
		pogy.preload();
	},

	create: function(){
		level.create();
		pogy.create();
	},

	update: function(){
		level.update();
		pogy.update();
	},
};
