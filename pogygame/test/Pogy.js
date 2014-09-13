Pogy = function(game){
	this.game = game;
	this.pogysprite = null;
	this.pogygroup = null;
};

Pogy.prototype = {
	preload: function(){
		this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},

	create: function(){
    this.pogygroup = this.game.add.group();
    //this.pogygroup.enableBody = true;
		this.game.time.events.repeat(Phaser.Timer.SECOND, 10, this.createPogy, this);
        console.log("World width: " + this.game.world.width)
	},

	update: function(){
		this.game.physics.arcade.collide(this.pogygroup, level.layer);
		//Add collision to all
        this.pogygroup.forEach(function(pogy){
            if(reachedGoal(pogy)){
                if(pogy.body.velocity.x >= 0) {
                   pogy.animations.play('right');
                }
                else {
                   pogy.animations.play('left');
                }
                //If we wanna change velocity of our Pogys
                if(pogy.body.onWall()) {
                    if(pogy.body.facing % 2) {
                        pogy.body.velocity.x = 100;
                    }
                    else {
                        pogy.body.velocity.x = -100;
                    }
                }    
            }
            else {
                pogy.kill();
            }
    	});
	},

    // Create new pogys and add to pogy group
    createPogy: function(){
    var pogy = this.game.add.sprite(0, this.game.world.height - 168, 'dude');
    this.game.physics.arcade.enable(pogy);
    pogy.body.bounce.y = 0.2;
    pogy.body.gravity.y = 300;
    pogy.body.collideWorldBounds = true;

    // Animations for the pogys
    pogy.animations.add('left', [0, 1, 2, 3], 5, true);
    pogy.animations.add('right', [5, 6, 7, 8], 5, true);

    // Set initial velocity of the Pogys
    pogy.body.velocity.x = 100;
    this.pogygroup.add(pogy);
    }
};

function reachedGoal(pogy){
    //UGLY SOLUTION - PLEASE FIX WHEN TILEMAP IS BETTER!!!!
    if(pogy.body.position.x < (this.game.world.width-3*pogy.body.width))
        return true;
    else 
        return false;
}