BuildPogy = function(game){
	this.game = game;
	this.buildpogy = null;
  //this.nrOfBuildPogys = 1;
  this.active = false;
  this.tileIndex = 21;
  this.tileAbove = 26;
  this.buildTile = null;
};

BuildPogy.prototype = {
	preload: function(){
		this.game.load.audio('buildTile', 'Sounds/build.wav');
	},

	create: function(){
	},

	update: function(){
		if(this.game.input.mousePointer.isDown){	
			// Create sound effect
			var sound = level.game.add.audio('buildTile',1,false);

			//x and y positions in tile units:
			var xPos = Math.floor((this.game.input.mousePointer.x + this.game.camera.x)/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);
			var aboveClicked = level.map.getTile(xPos, yPos-1);
			var clickedTile = level.map.getTile(xPos, yPos);
			var underClicked = level.map.getTile(xPos, yPos+1);
			//MEN HALLÅ, VADÅ 32??????? :(
			if(underClicked && (underClicked.index == this.tileIndex || underClicked.index == 1 || underClicked.index == 2|| underClicked.index == 5|| underClicked.index == 6|| underClicked.index == 15 )){
				var sound = level.game.add.audio('buildTile',1,false);

				if((!clickedTile && this.active && (level.nrOfBuildPogys > 0))){
					//If it's soild ground above, don't build an tile above
					if(aboveClicked) {
						level.map.putTile(this.tileIndex, xPos, yPos, level.groundLayer);
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				//sound.play(); // Play sound effect
					} 
					else {
						//Byt ut första parametern till en byggtile och den ovanför till en tileAbove:)
						level.map.putTile(this.tileIndex, xPos, yPos, level.groundLayer);
						level.map.putTile(this.tileAbove, xPos, yPos-1, level.groundLayer);
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				//sound.play(); // Play sound effect
					}

				}
				//Om klickad tile är en som redan är grävd eller 
				else if((clickedTile && (clickedTile.index == digpogy.tileIndex || clickedTile.index == this.tileAbove) && this.active && (level.nrOfBuildPogys > 0))) {
					
					//If it's soild ground above,
					if(aboveClicked) {
						level.map.putTile(this.tileIndex, xPos, yPos, level.groundLayer);
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				//sound.play(); // Play sound effect
					}
					else {
						level.map.replace(clickedTile.index, this.tileIndex, xPos, yPos, 1, 1, level.groundLayer);
						level.map.putTile(this.tileAbove, xPos, yPos-1, level.groundLayer);
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				//sound.play(); // Play sound effect
					}
				}
			}
		}
	}
};