BuildPogy = function(game){
	this.game = game;
	this.buildpogy = null;
  //this.nrOfBuildPogys = 1;
  this.active = false;
  this.tileIndex = 136;
};

BuildPogy.prototype = {
	preload: function(){
		
	},

	create: function(){
		
	},

	update: function(){
		if(this.game.input.mousePointer.isDown){	
			//x and y positions in tile units:
			var xPos = Math.floor((this.game.input.mousePointer.x+ this.game.camera.x)/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);
			var clickedTile = level.map.getTile(xPos, yPos);
			if(!clickedTile && this.active){
				//Byt ut första parametern till en byggtile :)
				level.map.putTile(this.tileIndex, xPos, yPos);
			}
			//Om klickad tile är en som redan är grävd
			else if(clickedTile && this.active){
				if(clickedTile.index==digpogy.tileIndex){
					level.map.replace(clickedTile.index, this.tileIndex, xPos, yPos, 1, 1);
				}
			}
		}
	}
};