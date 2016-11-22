var BallSprite = cc.PhysicsSprite.extend({
	_id:null,
	_gameScene:null,
	
	ctor:function(gameScene) {
		this._super(res.BALL_SPRITE);
		this._gameScene = gameScene;
		this._init(gameScene);
		return true;
	},
	
	_init:function(gameScene) {
		var winSize = cc.director.getWinSize();
		//设置大小
		this.scale = 0.15;
		//设置物理引擎body及shape
		var mass = 1;
		var radius = 18;
		var body = new cp.Body(1, cp.momentForCircle(mass, 0, radius, cp.v(0, 0)));
		body.setPos(cc.p(winSize.width / 2, winSize.height / 7));
		gameScene.space.addBody(body);
		
		var shape = new cp.CircleShape(body, radius, cp.v(0, 0));
        shape.setElasticity(0.5);
        shape.setFriction(0.5);
		shape.collision_type = 1;
		gameScene.space.addShape(shape);
		
		//创建物理引擎精灵对象
		this.setBody(body);
	},
	
	setCardId:function(id) {
		this._id = id;
	},
});

BallSprite.create = function(gameScene) {
	if (cc.pool.hasObject(BallSprite)) {
		return cc.pool.getFromPool(BallSprite);
	} else {
		return new BallSprite(gameScene);
	}
}