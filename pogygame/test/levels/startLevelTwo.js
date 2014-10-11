    var level = null;
    var pogy = null;
    var digpogy = null;
    var buildpogy = null;
    var camera = null;
    var gui = null;
    var tutorialscreens = null;
startLevelTwo = function(game){
	this.game = game;
};

startLevelTwo.prototype = {

	preload: function(){
    	level = new LevelTwo(this.game);
        level.preload();

        pogy = new Pogy(this.game);
        pogy.preload();

        camera = new Camera(this.game);
        camera.preload();    

        digpogy = new DigPogy(this.game);
        digpogy.preload();
        
        buildpogy = new BuildPogy(this.game);
        buildpogy.preload();

        gui = new GUI(this.game);
        gui.preload();

        tutorialscreens = new tutorialScreens(this.game);
        tutorialscreens.preload();

        pointer = new Pointer(this.game);
        pointer.preload()
	},

	create: function(){
    	level.create();
        pogy.create();
        digpogy.create();
        buildpogy.create();
        gui.create();
        camera.create();
        tutorialscreens.create();
        pointer.create();
        

	},

	update: function(){
        level.update();
		pogy.update();
        gui.update();
        camera.update();
        digpogy.update();
        buildpogy.update();
        pointer.update();
	}
};
