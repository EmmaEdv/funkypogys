Pogy = function(game){
	this.game = game;
	this.pogysprite = null;
	this.pogygroup = null;
};

Pogy.prototype = {
	preload: function(){
	},

	create: function(){
    this.pogygroup = this.game.add.group();
    this.game.time.events.repeat(Phaser.Timer.SECOND, level.nrOfPogys, this.createPogy, this);

	},

	update: function(){
    //Collision towards ground
	  this.game.physics.arcade.collide(this.pogygroup, level.groundLayer);
    this.game.physics.arcade.overlap(this.pogygroup, level.coins, collectCoin, null, this);
    this.game.physics.arcade.overlap(this.pogygroup, level.homes, pogyFinish, null, this);

    
		//Add collision to all
    this.pogygroup.forEach(function(pogy){
      //Trying to set collision for build tiles - callbackFunc should make pogys climb
      level.map.setTileIndexCallback(buildpogy.tileIndex, climb, this, level.groundLayer);
      level.map.setTileIndexCallback(buildpogy.tileAbove, stopClimb, this, level.groundLayer);

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
    });
  },

    // Create new pogys and add to pogy group
    createPogy: function() {
      //THE Y-VALUE OF POGYS STARTPOS IS HARDCODED (Y), FIX WHEN TILEMAP IS BETTER!!!
      var pogy = this.game.add.sprite(0, this.game.world.height-level.startYpos, 'dude');
      this.game.physics.arcade.enable(pogy);
      pogy.body.bounce.y = 0.2;
      pogy.body.gravity.y = 300;
      pogy.body.collideWorldBounds = true;
      pogy.finished = false;
      
      // Animations for the pogys
      pogy.animations.add('left', [0, 1, 2, 3], 5, true);
      pogy.animations.add('right', [5, 6, 7, 8], 5, true);

      // Set initial velocity of the Pogys
      pogy.body.velocity.x = 100;
      this.pogygroup.add(pogy);  
    },
};

// If a Pogy reach le home
function pogyFinish(pogy, goal){
  pogy.kill();
  level.pogyCounter++;
  pogy.finished = true;
}

// If a Pogy pick up a coin
function collectCoin(pogy, coin){
    coin.kill();
    gui.addCoin();
}

function climb(pogy){
  pogy.body.velocity.y = -100;
  if(pogy.body.velocity.x != 0){
    pogy.body.velocity.x = 0;
  }
}

function stopClimb(pogy){
  pogy.body.velocity.x = 100;
  pogy.body.velocity.y = 0;
}