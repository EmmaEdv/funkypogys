startStartMenu = function(game){
	this.game = game;
};

startStartMenu.prototype = {
	preload: function(){

		startmenu = new StartMenu(this.game);
		startmenu.preload();
		startPogy = new startPogy(this.game);
		startPogy.preload();
	},

	create: function(){
		startmenu.create();
		startPogy.create();
	},

	update: function(){
		startmenu.update();
		startPogy.update();
	},
};
