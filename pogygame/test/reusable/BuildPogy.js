BuildPogy = function(game){
	this.game = game;
	this.buildpogy = null;
  //this.nrOfBuildPogys = 1;
  this.active = false;
  this.tileIndex = 136;
  this.tileAbove = 113;
  this.buildTile = null;
};

BuildPogy.prototype = {
	preload: function(){
		//this.buildTile = new Phaser.Tile(this.groundLayer, this.tileIndex, null, null, level.tileSize, level.tileSize);
	},

	create: function(){
		//this.buildTile = new Phaser.Tile(this.groundLayer, this.tileIndex, null, null, level.tileSize, level.tileSize);
	},

	update: function(){
		if(this.game.input.mousePointer.isDown){	
			//x and y positions in tile units:
			var xPos = Math.floor((this.game.input.mousePointer.x + this.game.camera.x)/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);
			var aboveClicked = level.map.getTile(xPos, yPos-1);
			var clickedTile = level.map.getTile(xPos, yPos);
			var underClicked = level.map.getTile(xPos, yPos+1);

			if(underClicked && (underClicked.index == this.tileIndex || underClicked.index == 32)){
				if((!clickedTile && this.active && (level.nrOfBuildPogys > 0))){
					
					//If it's soild ground above, don't build an tile above
					if(aboveClicked) {
						level.map.putTile(this.tileIndex, xPos, yPos, level.groundLayer);
						level.nrOfBuildPogys--;
					} 
					else {
						//Byt ut första parametern till en byggtile och den ovanför till en tileAbove:)
						level.map.putTile(this.tileIndex, xPos, yPos, level.groundLayer);
						level.map.putTile(this.tileAbove, xPos, yPos-1, level.groundLayer);
						level.nrOfBuildPogys--;
					}

				}
				//Om klickad tile är en som redan är grävd eller 
				else if((clickedTile && (clickedTile.index == digpogy.tileIndex || clickedTile.index == this.tileAbove) && this.active && (level.nrOfBuildPogys > 0))) {
					
					//If it's soild ground above,
					if(aboveClicked) {
						level.map.putTile(this.tileIndex, xPos, yPos, level.groundLayer);
						level.nrOfBuildPogys--;
					} 
					else {
						level.map.replace(clickedTile.index, this.tileIndex, xPos, yPos, 1, 1, level.groundLayer);
						level.map.putTile(this.tileAbove, xPos, yPos-1, level.groundLayer);
						level.nrOfBuildPogys--;
					}
				}
			}
		}
	}
};