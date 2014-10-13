BuildPogy = function(game){
	this.game = game;
	this.buildpogy = null;
  this.active = false;
  this.buildTile = null;
};

BuildPogy.prototype = {
	preload: function(){
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

			if(underClicked && (underClicked.index == boot.tileLadder || underClicked.index == boot.tileGround)){
				var sound = level.game.add.audio('buildTile',1,false);
				if((!clickedTile && this.active && (level.nrOfBuildPogys > 0))){
					//If it's soild ground above, don't build an tile above
					if(aboveClicked) {
						level.map.putTile(boot.tileLadder, xPos, yPos, level.groundLayer);
						level.map.getTile(xPos, yPos).alpha = 1;
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				sound.play(); // Play sound effect
					} 
					else {
						//Byt ut första parametern till en byggtile och den ovanför till en tileAbove:)
						level.map.putTile(boot.tileLadder, xPos, yPos, level.groundLayer);
						level.map.putTile(boot.tileAboveLadder, xPos, yPos-1, level.groundLayer);
						level.map.getTile(xPos, yPos).alpha = 1;
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				sound.play(); // Play sound effect
					}

				}
				//Om klickad tile är en som redan är grävd eller sprängd
				else if((clickedTile && (clickedTile.index == boot.tileEmpty || clickedTile.index == boot.tileAboveLadder) && this.active && (level.nrOfBuildPogys > 0))) {
					//If it's soild ground above,
					if(aboveClicked) {
						level.map.putTile(boot.tileLadder, xPos, yPos, level.groundLayer);
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				sound.play(); // Play sound effect
    				level.map.getTile(xPos, yPos).alpha = 1;
					}
					else {
						level.map.replace(clickedTile.index, boot.tileLadder, xPos, yPos, 1, 1, level.groundLayer);
						level.map.putTile(boot.tileAboveLadder, xPos, yPos-1, level.groundLayer);
						level.map.getTile(xPos, yPos).alpha = 1;
						level.nrOfBuildPogys--; // Decrease No. Of Pogys
    				sound.play(); // Play sound effect
					}
				}
			}
		}
	}
};