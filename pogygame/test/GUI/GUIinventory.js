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
		// Set background and text to the inventory toolbar
		var inventoryBackground = this.game.add.sprite(0, 555, 'inventoryBackground');
		inventoryBackground.fixedToCamera = true;
		var inventoryText = game.add.text( 50, 575, "- Inventory -", {font: "30px Arial",fill: "#FFF",align: "left"});
    inventoryText.fixedToCamera = true;

		// BuildPogy button //
    this.buildPogy = this.game.add.button(this.buttonX, this.buttonY, 'ladder', this.buildCallback); // Add a button
    this.buildPogy.fixedToCamera = true;
    this.buildPogyText = game.add.text(this.buttonX+this.buttonTextInBetween, this.buttonY+30, "0", {font: "17px Arial",fill: "#FFF",align: "left"}); // Set text
    this.buildPogyText.fixedToCamera = true;
    // If we want to hide the button
    if(level.hideBuildPogy) {
    	this.buildPogy.alpha = 0;
    	this.buildPogyText.alpha = 0;
    }
    var buildPogyKey = game.input.keyboard.addKey(Phaser.Keyboard.L); // Hotkey for the buildCallback functon if L is pressed
    buildPogyKey.onDown.add(this.buildCallback, this);

    // Digpogy button //
    this.digPogy = this.game.add.button(this.buttonX+this.buttonInBetween, this.buttonY, 'spade', this.digCallback); // Add button
    this.digPogy.fixedToCamera = true;
    this.digPogyText = game.add.text(this.buttonX+this.buttonInBetween+this.buttonTextInBetween, this.buttonY+30, "0", {font: "17px Arial",fill: "#FFF",align: "left"});
    this.digPogyText.fixedToCamera = true;
    // If we wanna hide the button
    if(level.hideDigPogy) {
    	this.digPogy.alpha = 0;
    	this.digPogyText.alpha = 0;
    }
    // Hotkey for the digCallback functon if D is pressed
    var digPogyKey = game.input.keyboard.addKey(Phaser.Keyboard.D); 
    digPogyKey.onDown.add(this.digCallback, this);
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


