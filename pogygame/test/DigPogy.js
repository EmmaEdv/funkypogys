DigPogy = function(game){
	this.game = game;
	this.digpogy = null;
  this.nrOfDigPogys = 1;
};

DigPogy.prototype = {
	preload: function(){
		
	},

	create: function(){
		
	},

	update: function(){
		if(this.game.input.mousePointer.isDown){
			console.log("X:" + this.game.input.mousePointer.x + ", Y: " + this.game.input.mousePointer.y);
			//Check which tile is under the pointer :) 
			var xPos = Math.floor(this.game.input.mousePointer.x/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);

			var clickedTile = level.map.getTile(xPos, yPos, level.groundLayer);
			console.log(clickedTile);
			if(clickedTile){
				console.log("Clicked tile: x:" + clickedTile.x+ ", y: "+ clickedTile.y + ", index: " + clickedTile.index);
				level.map.putTile(clickedTile, 32, 32);
			}
		}
	}
};