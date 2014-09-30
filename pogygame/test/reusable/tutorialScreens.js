tutorialScreens = function(game){
  this.game = game;

  // Tutorial for change camera pos
  this.tutotialCamera = null;
	this.tutotialCameraTween = null;
	this.tutotialCameraX = 200;
	this.tutotialCameraY = 200;

	// Tutorial for digpogy
  this.tutotialDigPogy = null;
	this.tutotialDigPogyTween = null;
	this.tutotialDigPogyX = 200;
	this.tutotialDigPogyY = 200;


	// Tutorial for buildPogy
  this.tutotialBuildPogy = null;
	this.tutotialBuildPogyTween = null;
	this.tutotialDigPogyX = 200;
	this.tutotialDigPogyY = 200;
};
tutorialScreens.prototype = {
	preload: function(){
	},

	create: function(){
	},

	update: function(){
	}
};