BuildPogy = function(game){
	this.game = game;
	this.buildpogy = null;
  //this.nrOfBuildPogys = 1;
};

BuildPogy.prototype = {
	preload: function(){
		
	},

	create: function(){
		
	},

	update: function(){
		if(this.game.input.mousePointer.isDown){
			console.log("X:" + this.game.input.mousePointer.x + ", Y: " + this.game.input.mousePointer.y);
			//x and y positions in tile units:
			var xPos = Math.floor(this.game.input.mousePointer.x/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);

			var clickedTile = level.map.getTile(xPos, yPos);
			console.log("Build!! "+clickedTile);
			if(!clickedTile){
				//Byt ut första parametern till en byggtile :)
				level.map.putTile(34, xPos, yPos)
			}
		}
	}
};