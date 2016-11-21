var BallSprite = cc.Sprite.extend({
	_id:null,
	
	ctor:function() {
		this._super(res.BALL_SPRITE);
		this.init();
		return true;
	},
	
	init:function() {
		//设置大小
		this.scale = 0.15;
	},
	
	setCardId:function(id) {
		this._id = id;
	},
});

BallSprite.create = function() {
	if (cc.pool.hasObject(BallSprite)) {
		return cc.pool.getFromPool(BallSprite);
	} else {
		return new BallSprite();
	}
}