DigPogy = function(game){
	this.game = game;
	this.digpogy = null;
  this.active = false;
  this.tileIndex = 9;
  
  this.digState = true;
  this.timerCheck = null;
};

DigPogy.prototype = {
	preload: function(){
		this.timerCheck = game.time.create(false);
	},

	create: function(){
	},

	update: function(){
		if(this.game.input.mousePointer.isDown){

			// Create digging sound
			var sound = level.game.add.audio('digTile',1,false);

			//x and y positions in tile units:
			var xPos = Math.floor((this.game.input.mousePointer.x+this.game.camera.x)/level.tileSize);
			var yPos = Math.floor(this.game.input.mousePointer.y/level.tileSize);

			var clickedTile = level.map.getTile(xPos, yPos);

			//Man ska inte kunna gräva på en stege!
			if(clickedTile && (clickedTile.index!=boot.tileLadder && clickedTile.index!=boot.tileAboveLadder) && this.active && (level.nrOfDigPogys > 0) && this.digState) {
				//console.log("Clicked tile: x:" + clickedTile.x + ", y: " + clickedTile.y + ", index: " + clickedTile.index);
				//Varför funkar inte removeTile?! :() level.map.removeTile(xPos, yPos, level.groundLayer);
				//Byt ut andra parametern till en tom tile eller något annat så det ser ut som att man grävt :)
				clickedTile.resetCollision();
				level.map.replace(clickedTile.index, this.tileIndex, xPos, yPos, 1, 1);
				level.map.getTile(xPos, yPos).alpha = 0;
				level.nrOfDigPogys--; // Decrease No. Of Pogys
				sound.play();					// Play soundeffect

				// Set timer - dig next time
				this.timerCheck.add(500, this.setTimerCheck, this);
				this.digState = false;
    		this.timerCheck.start();
			}
		}
	},
	setTimerCheck: function() {
		this.digState = true;
	}
};
