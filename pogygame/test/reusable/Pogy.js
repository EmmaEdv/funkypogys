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
    console.log("Pogy: " + this.pogy.x + " Camera: " + pogy.game.camera.x);
    var explosion = pogy.game.add.sprite(this.pogy.x-100, this.pogy.y-100, 'explosion');
    explosion.animations.add('explodes', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50], 60, false);
    explosion.animations.play('explodes');

    // Remove he animation after it's done
    pogy.game.time.events.add((Phaser.Timer.SECOND/60)*49 , function(){explosion.kill();}, {explosion: explosion});
    
    /***
    **** Eight different cases of erase tile
    ****/

    // case one - NE
    var clickedTile = level.map.getTile(xPos+1, yPos-1);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos+1, yPos-1, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case two - N
    clickedTile = level.map.getTile(xPos, yPos-1);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos, yPos-1, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case three - NW
    clickedTile = level.map.getTile(xPos-1, yPos-1);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos-1, yPos-1, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case four - E
    clickedTile = level.map.getTile(xPos+1, yPos);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos+1, yPos, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case five - W
    clickedTile = level.map.getTile(xPos-1, yPos);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos-1, yPos, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case six - SE
    clickedTile = level.map.getTile(xPos+1, yPos+1);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos+1, yPos+1, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case seven - S
    clickedTile = level.map.getTile(xPos, yPos+1);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos, yPos+1, 1, 1);
      clickedTile.setCollision(false,false,false,false);
    }

    // case eight - SW
    clickedTile = level.map.getTile(xPos-1, yPos+1);
    if(clickedTile){
      level.map.replace(clickedTile.index, 9, xPos-1, yPos+1, 1, 1);
      clickedTile.setCollision(false,false,false,false);
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
    gui.addCoin();
}

function addBuildPogys(pogy, buildImage) {
  buildImage.kill();
  gui.buildPogy.alpha = 1;
  gui.buildPogyText.alpha = 1;
  level.nrOfBuildPogys += 10;
}

function addDigPogys(pogy, digImage) {
  digImage.kill();
  gui.digPogy.alpha = 1;
  gui.digPogyText.alpha = 1;
  level.nrOfDigPogys += 10;
}