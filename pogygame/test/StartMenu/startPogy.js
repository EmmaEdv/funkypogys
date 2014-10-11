startPogy = function(game){
	this.game = game;
	this.pogysprite = null;
	this.pogygroup = null;

};

startPogy.prototype = {
	preload: function(){
	},

	create: function(){
    this.pogygroup = this.game.add.group();
    this.game.time.events.repeat(Phaser.Timer.SECOND, startmenu.nrOfPogys, this.createPogy, this);
	},

	update: function(){
    //Collision towards ground
	  this.game.physics.arcade.collide(this.pogygroup, startmenu.groundLayer);

		//Add collision to all
    this.pogygroup.forEach(function(pogy) { 

      // Trying to set collision for build tiles - callbackFunc should make pogys climb
      startmenu.map.setTileIndexCallback(boot.tileLadder, climb, this, startmenu.groundLayer);
      startmenu.map.setTileIndexCallback(boot.tileAboveLadder, stopClimb, this, startmenu.groundLayer);

      if(pogy.body.velocity.x >= 0) {
        pogy.animations.play('right');
      }
      else {
        pogy.animations.play('left');
      }
      //If we wanna change velocity of our Pogys
      if(pogy.body.onWall()) {

        // If the pogy facing left
        if(pogy.body.facing == 1) {
          pogy.body.velocity.x = 100;
        }
        // If the pogy facing right
        else if(pogy.body.facing == 2) {
          pogy.body.velocity.x = -100;
        }
        // Here comes the fishy ...
        // Else the pogy facing up or down.
        // The pogy hit a wall when it's in the air.
        // 50% send back the pogy to the left, 50% to the right.
        // If it's the wrong direction it will have a new try next frame.
        else {

          // Math.random() returns a number between 0-1
          if(Math.random() < 0.5) {
            pogy.body.velocity.x = -100;
          }
          else {
            pogy.body.velocity.x = 100;
          }
        }
      } 
    });
  },

  // Create new pogys and add to pogy group
  createPogy: function() {
    //THE Y-VALUE OF POGYS STARTPOS IS HARDCODED (Y), FIX WHEN TILEMAP IS BETTER!!!
    var pogy = this.game.add.sprite(0, this.game.world.height-startmenu.startYpos, 'dude');
    this.game.physics.arcade.enable(pogy);
    pogy.body.collideWorldBounds = true;
    pogy.body.gravity.y = 200;
    //pogy.finished = false;
    pogy.inputEnabled = true;

    // Animations for the pogys
    pogy.animations.add('left', [0, 1, 2, 3], 5, true);
    pogy.animations.add('right', [5, 6, 7, 8], 5, true);

    // Set initial velocity of the Pogys
    pogy.body.velocity.x = 100;
    this.pogygroup.add(pogy);  
  }
};

function climb(pogys){
  // Set the gravity to 0
  pogys.body.gravity.y  = 0;

  // Set velocity to -100
  pogys.body.velocity.y = -100;

  if((pogys.body.velocity.x == 100) || (pogys.body.velocity.x == -100)) {
    pogys.body.velocity.x *= 0.00000001;
  }


  /**  Check if pogy reaches          **
   **  the roof when climing          **
   **  on the ladder                  **/

  // Get X and Y postision of the tile where the pogy is
  var xPos = Math.floor(pogys.x/startmenu.tileSize);
  var yPos = Math.floor((pogys.y + (startmenu.tileSize - 1))/startmenu.tileSize);

  // Checks if the pogy reaches a roof and came from the right side of the ladder
  // Sends back the pogy to the left
  var right = (pogys.body.velocity.x == 0.000001);
  var checkTileLeft = startmenu.map.getTile(xPos, yPos-1);
  if(right && checkTileLeft && checkTileLeft.index == boot.tileGround) {
    console.log("Jump left");
    pogys.body.x -= 10;
    pogys.body.velocity.x = -100;
    pogys.body.gravity.y = 200;
  }

  // Checks if the pogy reaches a roof and came from the right side of the ladder
  // Sends back the pogy to the right
  var xPos = Math.ceil(pogys.x/startmenu.tileSize);
  var left = (pogys.body.velocity.x == -0.000001);
  var checkTileRight = startmenu.map.getTile(xPos, yPos-1);

  if(left && checkTileRight && checkTileLeft.index == boot.tileGround) {
    console.log("Jump right");
    pogys.body.x += 10;
    pogys.body.velocity.x = 100;
    pogys.body.gravity.y = 200;
  }
}

function stopClimb(pogys){
  pogys.body.velocity.y = 0;
  if((pogys.body.velocity.x <  1) && (pogys.body.velocity.x > -1)) {
    pogys.body.velocity.x *= 100000000;
  }
  pogys.body.gravity.y = 200;
}



