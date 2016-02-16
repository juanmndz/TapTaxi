var TTTGame = (function(){

	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5;

	function TTTGame(phaserGame) {
		this.game = phaserGame;

		this.arrTiles = [];
		this.taxi = undefined;
		this.numberOfIterations = 0;
		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100
		}
	}

	TTTGame.prototype.generateRoad = function() {
		// var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		var sprite = new Phaser.Sprite(this.game, 0, 0, 'tile_road_1');
		this.game.world.addChildAt(sprite, 0);
		sprite.anchor.setTo(0.5, 0.5);
		sprite.x = this.roadStartPosition.x;
		sprite.y = this.roadStartPosition.y;
		this.arrTiles.push(sprite);
	}

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

	TTTGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);

	};

	TTTGame.prototype.preload = function() {
		//This.game.load is an instance of the Phaser.Loader class
		this.game.load.image('tile_road_1', 'static/img/assets/tile_road_1.png');
		this.game.load.image('taxi', 'static/img/assets/taxi.png');

	};

	TTTGame.prototype.create = function() {
		this.generateRoad();

		var x = this.game.world.centerX;
		var y = this.game.world.centerX;
		this.taxi = new Phaser.Sprite(this.game, x, y, 'taxi');
		this.taxi.anchor.setTo(0.5, 1.0);
		this.game.add.existing(this.taxi);
	};
	 
	 TTTGame.prototype.update = function() {
	 	this.numberOfIterations++;
	 	if(this.numberOfIterations > TILE_WIDTH / SPEED) {
	 		this.numberOfIterations = 0;
	 		this.generateRoad();

	 	}
	 	this.moveTilesWithSpeed(SPEED);

	};

	return TTTGame;

})();