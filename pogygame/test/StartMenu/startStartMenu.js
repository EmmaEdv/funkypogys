startStartMenu = function(game){
	this.game = boot.game;
};

startStartMenu.prototype = {
	preload: function(){
		startmenu = new StartMenu(this.game);
		startmenu.preload();
		
		startpogy = new startPogy(this.game);
		startpogy.preload();
	},

	create: function(){
		startmenu.create();
		startpogy.create();
	},

	update: function(){
		startmenu.update();
		startpogy.update();
	},
};
