GUIinventory = function(game){
	this.game = game;

	//Dig & build pogy
	this.digPogy = null;
	this.digPogyText = null;
	this.buildPogy = null;
	this.buildPogyText = null;

	// Positions
	this.buttonX = 370;
	this.buttonY = 570; 
	this.buttonTextInBetween = 40;
	this.buttonInBetween = 100;
};

GUIinventory.prototype = {
	preload: function(){
		this.game.load.image('inventoryBackground', 'assets/woodenBar.png');
	},

	create: function(){
		var inventoryBackground = this.game.add.sprite(0, 555, 'inventoryBackground');
		inventoryBackground.fixedToCamera = true;
		var inventoryText = game.add.text( 50, 575, "- Inventory -", {font: "30px Arial",fill: "#FFF",align: "left"});
    inventoryText.fixedToCamera = true;

		//Buttons and counter for BuildPogy
    this.buildPogy = this.game.add.button(this.buttonX, this.buttonY, 'ladder', this.buildCallback);
    this.buildPogy.fixedToCamera = true;
    this.buildPogyText = game.add.text(this.buttonX+this.buttonTextInBetween, this.buttonY+30, "0", {font: "17px Arial",fill: "#FFF",align: "left"});
    this.buildPogyText.fixedToCamera = true;
    if(level.hideBuildPogy) {
    	this.buildPogy.alpha = 0;
    	this.buildPogyText.alpha = 0;
    }

    //Buttons and counter for DigPogy
    this.digPogy = this.game.add.button(this.buttonX+this.buttonInBetween, this.buttonY, 'spade', this.digCallback);
    this.digPogy.fixedToCamera = true;
    this.digPogyText = game.add.text(this.buttonX+this.buttonInBetween+this.buttonTextInBetween, this.buttonY+30, "0", {font: "17px Arial",fill: "#FFF",align: "left"});
    this.digPogyText.fixedToCamera = true;
    if(level.hideDigPogy) {
    	this.digPogy.alpha = 0;
    	this.digPogyText.alpha = 0;
    }
	},

	update: function(){
		// Update how many pogys we got left
		this.digPogyText.setText(level.nrOfDigPogys);
		this.buildPogyText.setText(level.nrOfBuildPogys);
	},

	digCallback: function(){
		if(guiinventory.digPogy.alpha == 1 && !level.levelTimer.paused){
			guiinventory.digPogy.alpha = 0.5;
			if(!level.hideBuildPogy) {
				guiinventory.buildPogy.alpha = 1;
			}
			
			digpogy.active = true;
			buildpogy.active = false;
		} else if(!level.levelTimer.paused){
			guiinventory.digPogy.alpha = 1;

			digpogy.active = false;
		}
	},

	buildCallback: function(){
		if(guiinventory.buildPogy.alpha == 1 && !level.levelTimer.paused){
			guiinventory.buildPogy.alpha = 0.5;
			if(!level.hideDigPogy) {
				guiinventory.digPogy.alpha = 1;
			}
			
			buildpogy.active = true;
			digpogy.active = false;

		}
		else if(!level.levelTimer.paused){
			guiinventory.buildPogy.alpha = 1;
			buildpogy.active = false;
		}
	},
};


