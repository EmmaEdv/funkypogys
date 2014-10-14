Pointer = function(game){
	this.game = game;
	this.pointerBuildTile = null;
	this.pointerDigTile = null;
	this.pointerErrorTile = null;
};

Pointer.prototype = {
	preload: function(){
	},

	create: function(){
		this.pointerErrorTile = this.game.add.image(0, 0, 'pointerError');
		this.pointerErrorTile.alpha = 0;
		this.pointerBuildTile = this.game.add.image(0, 0, 'pointerBuild');
		this.pointerBuildTile.alpha = 0;
		this.pointerDigTile = this.game.add.image(0, 0, 'pointerDig');
		this.pointerDigTile.alpha = 0;
	},

	update: function(){

		// Check X & Y positions for le mouse and calulcate which tile.
		var xPos = Math.floor((this.game.input.mousePointer.x + this.game.camera.x)/level.tileSize);
		var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);
		var clickedTile = level.map.getTile(xPos, yPos);
		var underClickedTile = level.map.getTile(xPos, yPos+1);


		if(yPos > 15 || yPos < 2) // If the pointer is on our toolbars
		{
			this.setBuildTileToInactive();
			this.setDigTileToInactive();
			this.setErrorTileToInactive();
		} 
		else if(digpogy.active && (!clickedTile || (clickedTile && clickedTile.index == boot.tileEmpty))) // If you can't dig
		{
			this.setErrorTileToActive();
			this.setBuildTileToInactive();
		} 
		else if(digpogy.active)  // if you can dig
		{
			this.setDigTileToActive();
			this.setBuildTileToInactive();
			this.setErrorTileToInactive();
		}
		else if(buildpogy.active && (!clickedTile || clickedTile.index == boot.tileAboveLadder || clickedTile.index == boot.tileEmpty) && (underClickedTile && 
		(underClickedTile.index == boot.tileLadder || underClickedTile.index == boot.tileGround)))// If you can build
		{
			this.setBuildTileToActive();
			this.setDigTileToInactive();
			this.setErrorTileToInactive();
		}  
		else if(buildpogy.active) // If you can't build
		{
			this.setErrorTileToActive();
			this.setDigTileToInactive();
		} 
		else // If non of our tools is seleceted
		{
			this.setBuildTileToInactive();
			this.setDigTileToInactive();
			this.setErrorTileToInactive();
		}

		// Set positions to all our pointers
    this.pointerBuildTile.x = xPos*level.tileSize;
    this.pointerBuildTile.y = yPos*level.tileSize;
    this.pointerDigTile.x = xPos*level.tileSize;
    this.pointerDigTile.y = yPos*level.tileSize;
    this.pointerErrorTile.x = xPos*level.tileSize;
    this.pointerErrorTile.y = yPos*level.tileSize;
	},

	/*///////////////////////////
		All these functions
		just sets alpha on
		our pointers to 0.5 or 0 
		/////////////////////////////*/

	setBuildTileToActive: function() {
		this.pointerBuildTile.alpha = 0.5;
	},

	setBuildTileToInactive: function() {
		this.pointerBuildTile.alpha = 0;
	},

	setDigTileToActive: function() {
		this.pointerDigTile.alpha = 1;
	},

	setDigTileToInactive: function() {
		this.pointerDigTile.alpha = 0;
	},

	setErrorTileToActive: function() {
		this.pointerErrorTile.alpha = 0.5;
	},

	setErrorTileToInactive: function() {
		this.pointerErrorTile.alpha = 0;
	},

};