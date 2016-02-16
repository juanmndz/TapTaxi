var TTTGame = (function(){

	var ANGLE = 26.55;

	function TTTGame(phaserGame) {
		this.game = phaserGame;
		this.arrTiles = [];
	}

	TTTGame.prototype.generateRoad = function() {
		var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		sprite.anchor.setTo(0.5, 0.5);
		sprite.x = this.game.world.centerX;
		sprite.y = this.game.world.centerY;
		this.arrTiles.push(sprite);
	}

	TTTGame.prototype.moveTiles = function() {
		var i = this.arrTiles.length - 1;
		while (i >= 0) {
			var sprite = this.arrTiles[i];
			sprite.x -= Math.cos( ANGLE * Math.PI / 180);
			sprite.y += Math.sin( ANGLE * Math.PI / 180);
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

	};

	TTTGame.prototype.create = function() {
		this.generateRoad();
	};
	 
	 TTTGame.prototype.update = function() {
	 	this.moveTiles();

	};

	return TTTGame;

})();