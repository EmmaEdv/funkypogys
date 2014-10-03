Pogy = function(game){
	this.game = game;
	this.pogysprite = null;
	this.pogygroup = null;
};

Pogy.prototype = {
	preload: function(){
    this.game.load.spritesheet('explosion', 'assets/pogyExplosion256.png', 256, 256);
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
    this.game.physics.arcade.overlap(this.pogygroup, level.buildPogys, addBuildPogys, null, this);
    this.game.physics.arcade.overlap(this.pogygroup, level.digPogys, addDigPogys, null, this);

		//Add collision to all
    this.pogygroup.forEach(function(pogy)
    { 
      // Trying to set collision for build tiles - callbackFunc should make pogys climb
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
        
        // Det är något fishy här.. 
        if(pogy.body.facing == 1) {
          pogy.body.velocity.x = 100;
        }
        else if(pogy.body.facing == 2) {
          pogy.body.velocity.x = -100;
        }
        else {
          if(Math.random() <0.5) {
            pogy.body.velocity.x = -100;
          }
          else {
            pogy.body.velocity.x = 100;
          }
        }
      } 

      // If the level is over, kill all pogys
      if(level.gameOver) {
        pogy.kill()
      }
    });
  },

  // Create new pogys and add to pogy group
  createPogy: function() {
    //THE Y-VALUE OF POGYS STARTPOS IS HARDCODED (Y), FIX WHEN TILEMAP IS BETTER!!!
    var pogy = this.game.add.sprite(0, this.game.world.height-level.startYpos, 'dude');
    this.game.physics.arcade.enable(pogy);
    pogy.body.collideWorldBounds = true;
    pogy.body.gravity.y = 200;
    //pogy.finished = false;
    pogy.inputEnabled = true;
    pogy.events.onInputDown.add(this.blastPogy, {pogy: pogy});

    // Animations for the pogys
    pogy.animations.add('left', [0, 1, 2, 3], 5, true);
    pogy.animations.add('right', [5, 6, 7, 8], 5, true);

    // Set initial velocity of the Pogys
    pogy.body.velocity.x = 100;
    this.pogygroup.add(pogy);  
  },

  blastPogy: function() {
    // Get X and Y postision of the tile
    var xPos = Math.floor(this.pogy.x/level.tileSize);
    var yPos = Math.floor(this.pogy.y/level.tileSize);

    //Add an explosion where the pogy
    var explosion = pogy.game.add.sprite(this.pogy.x-100, this.pogy.y-100, 'explosion');
    explosion.animations.add('explodes', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47], 60, false);
    explosion.animations.play('explodes');

    // Remove he animation after it's done
    pogy.game.time.events.add((Phaser.Timer.SECOND/60)*49 , function(){explosion.kill();}, {explosion: explosion});
    
    /***
    **** Eight different cases of erase tile
    ****/

    // case one - NE
    var clickedTile = level.map.getTile(xPos+1, yPos-1);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos+1, yPos-1, 1, 1);
      clickedTile.resetCollision();
    }

    // case two - N
    clickedTile = level.map.getTile(xPos, yPos-1);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos, yPos-1, 1, 1);
      clickedTile.resetCollision();
    }

    // case three - NW
    clickedTile = level.map.getTile(xPos-1, yPos-1);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos-1, yPos-1, 1, 1);
      clickedTile.resetCollision();
    }

    // case four - E
    clickedTile = level.map.getTile(xPos+1, yPos);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos+1, yPos, 1, 1);
      clickedTile.resetCollision();
    }

    // case five - W
    clickedTile = level.map.getTile(xPos-1, yPos);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos-1, yPos, 1, 1);
      clickedTile.resetCollision();
    }

    // case six - SE
    clickedTile = level.map.getTile(xPos+1, yPos+1);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos+1, yPos+1, 1, 1);
      clickedTile.resetCollision();
    }

    // case seven - S
    clickedTile = level.map.getTile(xPos, yPos+1);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos, yPos+1, 1, 1);
      clickedTile.resetCollision();
    }

    // case eight - SW
    clickedTile = level.map.getTile(xPos-1, yPos+1);
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos-1, yPos+1, 1, 1);
      clickedTile.resetCollision();
    }

    // Ugly hack ... If this don't exist the collisions will be fucked up
    if(clickedTile){
      level.map.replace(clickedTile.index, digpogy.tileIndex, xPos-1, yPos+1, 1, 1);
      clickedTile.resetCollision();
    }

    this.pogy.kill();
    level.pogysLeft--;
  },
};

// If a Pogy reach le home
function pogyFinish(pogy, goal){
  pogy.kill();
  level.pogyCounter++;
  level.pogysLeft--;
  pogy.finished = true;
}
 // If a Pogy pick up a coin
function collectCoin(pogy, coin){
    coin.kill();
    guitoolbar.addCoin();
}

function addBuildPogys(pogy, buildImage) {
  buildImage.kill();
  guiinventory.buildPogy.alpha = 1;
  guiinventory.buildPogyText.alpha = 1;
  level.nrOfBuildPogys += 10;

  // If the tutorial should been shown, show it!
  if(level.showTutorialBuild) {
    level.showTutorialBuild = false;
    tutorialscreens.openBuildPogy();
  }
}

function addDigPogys(pogy, digImage) {
  digImage.kill();
  guiinventory.digPogy.alpha = 1;
  guiinventory.digPogyText.alpha = 1;
  level.nrOfDigPogys += 10;

  // If the tutorial should been shown, show it!
  if(level.showTutorialDig) {
    level.showTutorialDig = false;
    tutorialscreens.openDigPogy();
  }
}

function climb(pogys){
  pogys.body.gravity.y  = 0;
  pogys.body.velocity.y = -100;
  if((pogys.body.velocity.x == 100) || (pogys.body.velocity.x == -100)) {
    pogys.body.velocity.x *= 0.00000001;
  }


  /**  Check if pogy reaches          **
   **  the roof when climing          **
   **  on the ladder                  **/

  // Get X and Y postision of the tile where the pogy is
  var xPos = Math.floor(pogys.x/level.tileSize);
  var yPos = Math.floor((pogys.y + (level.tileSize - 1))/level.tileSize);

  // Checks if the pogy reaches a roof and came from the right side of the ladder
  // Sends back the pogy to the left
  var right = (pogys.body.velocity.x == 0.000001);
  var checkTileLeft = level.map.getTile(xPos, yPos-1);
  if(right && checkTileLeft && checkTileLeft.index == 34) {
    console.log("Jump left");
    pogys.body.x -= 10;
    pogys.body.velocity.x = -100;
    pogys.body.gravity.y = 200;
  }

  // Checks if the pogy reaches a roof and came from the right side of the ladder
  // Sends back the pogy to the right
  var xPos = Math.ceil(pogys.x/level.tileSize);
  var left = (pogys.body.velocity.x == -0.000001);
  var checkTileRight = level.map.getTile(xPos, yPos-1);

  if(left && checkTileRight && checkTileRight.index == 34) {
    console.log("Jump right");
    pogys.body.x += 10
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



