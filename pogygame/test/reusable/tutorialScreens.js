tutorialScreens = function(game){
  this.game = game;

  // Tutorial for change camera pos
  this.tutotialCamera = null;
	this.tutotialCameraTween = null;
	this.tutotialCameraX = 600;
	this.tutotialCameraY = 200;

	// Tutorial for digpogy
  this.tutotialDigPogy = null;
	this.tutotialDigPogyTween = null;
	this.tutotialDigPogyX = 400;
	this.tutotialDigPogyY = 80;


	// Tutorial for buildPogy
  this.tutotialBuildPogy = null;
	this.tutotialBuildPogyTween = null;
	this.tutotialBuildPogyX = 250;
	this.tutotialBuildPogyY = 200;

	// Timer for how long the tutorials should been shown(in sek)
	this.tutorialLength = 5;
};
tutorialScreens.prototype = {
	preload: function(){
		this.game.load.image('tutCamera', 'assets/pratbubbla.png');
		this.game.load.image('tutDigPogy', 'assets/pratbubbla.png');
		this.game.load.image('tutBuildPogy', 'assets/pratbubbla.png');
	},

	create: function(){

		// Set Cameratutorial
		this.tutotialCamera = game.add.sprite(this.CameraX, this.tutotialCameraY, 'tutCamera');
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