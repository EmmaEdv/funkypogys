GUI = function(game){
 this.game = game;
};

GUI.prototype = {
	preload: function(){
		// Bars för show left and right camera direction .. ? ;)
		this.game.load.image('transparentR', 'assets/transparentRight.png');
		this.game.load.image('transparentL', 'assets/transparentLeft.png');

		guiendgamescreen = new GUIEndGameScreen(this.game);
    guiendgamescreen.preload();

    guiinventory = new GUIinventory(this.game);
    guiinventory.preload();

    guitoolbar = new GUIToolbar(this.game);
    guitoolbar.preload();
	},

	create: function(){
		// Transparent picture on right and left handside
		var transparentR = this.game.add.sprite(720, 75, 'transparentR');
		var transparentL = this.game.add.sprite(0, 75, 'transparentL');
		transparentR.fixedToCamera = true;
		transparentL.fixedToCamera = true;

		//Create a winningscreen (guiendgamescreen.js)
		guiendgamescreen.create();
		guiinventory.create();
		guitoolbar.create();
	},

	update: function(){
		guiendgamescreen.update();
		guiinventory.update();
		guitoolbar.update();

		// Change alpha on your pickup-objects (Like an animation)
		this.changeAlphaDigPogy();
		this.changeAlphaBuildPogy();
		this.changeAlphaCoin();
	},

	changeAlphaDigPogy: function() {
		level.digPogys.forEach(function(dig){
			if(dig.alpha > 1) {level.digPogysDown = true;}
			if(dig.alpha < 0.2) {level.digPogysDown = false;}

			if(level.digPogysDown) {
				dig.alpha -= 0.02;
			} else {
				dig.alpha += 0.02;
			}
		});
	},

	changeAlphaBuildPogy: function() {
		level.buildPogys.forEach(function(build){
			if(build.alpha > 1) {level.buildPogysDown = true;}
			if(build.alpha < 0.2) {level.buildPogysDown = false;}

			if(level.buildPogysDown) {
				build.alpha -= 0.02;
			} else {
				build.alpha += 0.02;
			}
		});
	},

	changeAlphaCoin: function() {
		level.coins.forEach(function(coin){
			if(coin.alpha > 1) {level.coinsDown = true;}
			if(coin.alpha < 0.2) {level.coinsDown = false;}

			if(level.coinsDown) {
				coin.alpha -= 0.02;
			} else {
				coin.alpha += 0.02;
			}
		});
	},
};


