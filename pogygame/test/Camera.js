Camera = function(game){
  this.game = game;
  this.cameraSprite = null;
  this.speedOfCamera = 8;
};
Camera.prototype = {
	preload: function(){
	},

	create: function(){
		// Sets the camera in the middle
		this.cameraSprite = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2 , null);
	},

	update: function(){
		// The cameraSprite will follow the mousePointer and check where the camera is
		this.cameraSprite.x = game.input.mousePointer.x + this.game.camera.x;

		// If the cameraSprite will go outside the deadzone to the right
		if (this.cameraSprite.x > this.game.camera.x + 700) {
			this.game.camera.x += this.speedOfCamera;

		// If the cameraSprite will go outside the deadzone to the left
		} else if (this.cameraSprite.x < this.game.camera.x + 100) {
			this.game.camera.x -= this.speedOfCamera;
		}
	}
};