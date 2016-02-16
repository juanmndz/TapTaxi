var TTTGame = (function(){

	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5;
	var TAXI_START_X = 30;
	var JUMP_HEIGHT = 7;


	function TTTGame(phaserGame) {
		this.game = phaserGame;

		this.mouseTouchDown = false;

		this.arrTiles = [];
		
		this.jumpSpeed = JUMP_HEIGHT;
		this.isJumping = false;
		this.currentJumpHeight = 0;
		
		this.taxi = undefined;
		this.taxiX = TAXI_START_X;
		this.numberOfIterations = 0;
		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100,
		};

	}



	TTTGame.prototype.preload = function() {
		//This.game.load is an instance of the Phaser.Loader class
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1.png');
		this.game.load.image('taxi', 'static/img/assets/taxi.png');

	};

	TTTGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);

	};

	TTTGame.prototype.create = function() {
		this.generateRoad();
		this.taxi = new Phaser.Sprite(this.game, GAME_WIDTH / 2, GAME_HEIGHT / 2, 'taxi');
		this.game.world.addChild(this.taxi);
		this.taxi.anchor.setTo(0.5, 1);
	};

	TTTGame.prototype.calculatePositionOnRoadWithXposition = function(xPos) {
    // Calculate our triangle
    var adjacent = this.roadStartPosition.x - xPos;
    var alpha = ANGLE * Math.PI / 180;
    var hypotenuse = adjacent / Math.cos(alpha);
    var opposite = Math.sin(alpha) * hypotenuse;

    return {
    	x: xPos,
        // -57 to position the taxi on the road
        y: this.roadStartPosition.y + opposite - 57
    };
};
	TTTGame.prototype.generateRoad = function() {
		// var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		var sprite = new Phaser.Sprite(this.game, 0, 0, 'tile_road_1');
		this.game.world.addChildAt(sprite, 0);
		sprite.anchor.setTo(0.5, 1.0);
		sprite.x = this.roadStartPosition.x;
		sprite.y = this.roadStartPosition.y;
		this.arrTiles.push(sprite);
	};

	TTTGame.prototype.moveTilesWithSpeed = function(speed) {
		var i = this.arrTiles.length - 1;
		while (i >= 0) {
			var sprite = this.arrTiles[i];
			sprite.x -= speed * Math.cos( ANGLE * Math.PI / 180);
			sprite.y += speed * Math.sin( ANGLE * Math.PI / 180);

			if (sprite.x < -120) {
				this.arrTiles.splice(i, 1);
				sprite.destroy();
			}
			i--;
		}
	};

	TTTGame.prototype.touchDown = function() {
		this.mouseTouchDown = true;

		if (!this.isJumping) {
			this.isJumping = true;
		};
	};

	TTTGame.prototype.touchUp = function() {
		this.mouseTouchUp = false;
	};

	TTTGame.prototype.taxiJump = function() {
	this.currentJumpHeight -= this.jumpSpeed;
	this.jumpSpeed -= 0.5;
		if (this.jumpSpeed < -JUMP_HEIGHT) {
			this.jumpSpeed = JUMP_HEIGHT;
			this.isJumping = false;
		};
	};

	TTTGame.prototype.update = function() {
		// Gets called at 60fps

		if (this.game.input.activePointer.isDown) {
			if (!this.mouseTouchDown) {
				this.touchDown();
			};
		} else {
			if (this.mouseTouchDown) {
				this.touchUp();
			};
		}

		this.numberOfIterations++;

		if (this.numberOfIterations > TILE_WIDTH / SPEED) {
			this.generateRoad();
			this.numberOfIterations = 0;
		}

		if (this.isJumping) {
			this.taxiJump();
		}

		var pointOnRoad = this.calculatePositionOnRoadWithXposition(this.taxiX);
		this.taxi.x = pointOnRoad.x;
		this.taxi.y = pointOnRoad.y + this.currentJumpHeight;

		this.moveTilesWithSpeed(SPEED);
	};

	return TTTGame;

})();