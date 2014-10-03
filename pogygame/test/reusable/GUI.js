GUI = function(game){
 this.game = game;
};

GUI.prototype = {
	preload: function(){
		// Bars för show left and right camera direction .. ? ;)
		this.game.load.image('transparentR', 'assets/transparentRight.png');
		this.game.load.image('transparentL', 'assets/transparentLeft.png');


		guiwinningscreen = new GUIWinningScreen(this.game);
    guiwinningscreen.preload();

    guiinventory = new GUIinventory(this.game);
    guiinventory.preload();

    guitoolbar = new GUIToolbar(this.game);
    guitoolbar.preload();
	},

	create: function(){
		
		//Create a winningscreen (GUIWinningScreen.js)
		guiwinningscreen.create();
		guiinventory.create();
		guitoolbar.create();

		// Transparent picture on right and left handside
		var transparentR = this.game.add.sprite(720, 75, 'transparentR');
		var transparentL = this.game.add.sprite(0, 75, 'transparentL');
		transparentR.fixedToCamera = true;
		transparentL.fixedToCamera = true;
	},

	update: function(){
		guiwinningscreen.update();
		guiinventory.update();
		guitoolbar.update();
	},
};


