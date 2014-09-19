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
			//x and y positions in tile units:
			var xPos = Math.floor(this.game.input.mousePointer.x/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);

			var clickedTile = level.map.getTile(xPos, yPos);
			console.log(clickedTile);
			if(clickedTile){
				console.log("Clicked tile: x:" + clickedTile.x + ", y: " + clickedTile.y + ", index: " + clickedTile.index);
				//Varför funkar inte removeTile?! :() level.map.removeTile(xPos, yPos, level.groundLayer);
				//Byt ut andra parametern till en tom tile eller något annat så det ser ut som att man grävt :)
				level.map.replace(clickedTile.index, 9, xPos, yPos, 1, 1);
				clickedTile.setCollision(false,false,false,false);
			}
		}
	}
};