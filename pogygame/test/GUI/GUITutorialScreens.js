tutorialScreens = function(game){
  this.game = game;

  // Tutorial for change camera pos
  this.tutotialCamera = null;
	this.tutotialCameraTween = null;
	this.tutotialCameraX = 500;
	this.tutotialCameraY = 100;

	// Tutorial for digpogy
  this.tutotialDigPogy = null;
	this.tutotialDigPogyTween = null;
	this.tutotialDigPogyX = 250;
	this.tutotialDigPogyY = 470;


	// Tutorial for buildPogy
  this.tutotialBuildPogy = null;
	this.tutotialBuildPogyTween = null;
	this.tutotialBuildPogyX = 150;
	this.tutotialBuildPogyY = 470;

	// Timer for how long the tutorials should been shown(in sek)
	this.tutorialLength = 5;
};
tutorialScreens.prototype = {
	preload: function(){
	},

	create: function(){

		// Set Cameratutorial
		this.tutotialCamera = game.add.sprite(this.tutotialCameraX, this.tutotialCameraY, 'tutCamera');
    this.tutotialCamera.alpha = 0.7;
    this.tutotialCamera.scale.set(0);
    this.tutotialCamera.fixedToCamera = true;

		// Set DigPogys-tutorial
    this.tutotialDigPogy = game.add.sprite(this.tutotialDigPogyX, this.tutotialDigPogyY, 'tutDigPogy');
    this.tutotialDigPogy.alpha = 0.7;
    this.tutotialDigPogy.scale.set(0);
    this.tutotialDigPogy.fixedToCamera = true;
    // Set BuildPogy-tutorial
    this.tutotialBuildPogy = game.add.sprite(this.tutotialBuildPogyX, this.tutotialBuildPogyY, 'tutBuildPogy');
    this.tutotialBuildPogy.alpha = 0.7;
    this.tutotialBuildPogy.scale.set(0);
    this.tutotialBuildPogy.fixedToCamera = true;
	},

	update: function(){

	},

	// Open Tutorial-pop-up for le Camera
	openCamera: function() {
    this.tutotialCameraTween = this.game.add.tween(this.tutotialCamera.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.game.time.events.add(Phaser.Timer.SECOND * this.tutorialLength, this.closeCamera, this);
	},

	// Close Tutorial-pop-up for le Camera
	closeCamera: function() {
    this.tutotialCameraTween = this.game.add.tween(this.tutotialCamera.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	},

	// Open Tutorial-pop-up for DigPogy
	openDigPogy: function() {
    this.tutotialDigPogyTween = this.game.add.tween(this.tutotialDigPogy.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.game.time.events.add(Phaser.Timer.SECOND * this.tutorialLength, this.closeDigPogy, this);
	},

	// Close Tutorial-pop-up for le digpogy
	closeDigPogy: function() {
    this.tutotialDigPogyTween = this.game.add.tween(this.tutotialDigPogy.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	},

	// Open Tutorial-pop-up for BuildPogy
	openBuildPogy: function() {
    this.tutotialBuildPogyTween = this.game.add.tween(this.tutotialBuildPogy.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
    this.game.time.events.add(Phaser.Timer.SECOND * this.tutorialLength, this.closeBuildPogy, this);
	},

	// Close Tutorial-pop-up for le buildPogy
	closeBuildPogy: function() {
    this.tutotialBuildPogyTween = this.game.add.tween(this.tutotialBuildPogy.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
	},
};