//第二关，直线来回交叉
var RoundLayer3 = cc.Layer.extend({
	_name:"round3",
	_obs1:null,
	_obs2:null,
	_obsCount:2,
	_gameScene:null,
	_body:null,
	_body2:null,
	_shape:null,
	_shape2:null,
	bodyDefs: null,
	
	ctor:function() {
		this._super();
		this.setContentSize(293, 19);			//设置层大小
		return true;
	},
	
	update:function() {
		
	},
	
	_init:function(gameScene) {
		var winSize = cc.director.getWinSize();
		
		var verts = [
			[-5.50000, 45.65000,
			-10.50000, -64.35000,
			-21.50000, -60.35000,
			-32.50000, 35.65000,
			-29.50000, 43.65000],
			[34.00000, 34.15000,
			24.00000, -53.85000,
			20.00000, -62.85000,
			-10.50000, -64.35000,
			-5.50000, 45.65000,
			4.50000, 46.65000,
			32.50000, 42.65000],
			[-33.50000, 102.65000,
			-2.00000, 78.15000,
			-10.00000, 75.15000,
			-36.00000, 97.15000],
			[-2.00000, 78.15000,
			4.50000, 46.65000,
			-4.00000, 49.15000,
			-10.00000, 75.15000],
			[4.50000, 46.65000,
			-5.50000, 45.65000,
			-4.00000, 49.15000],
		];
		this._body = new cp.Body(1, cp.momentForPoly(1, verts, cp.vzero));
		this._body.setAngVel(1.3);
		gameScene.space.addBody(this._body);
		
		this._shape = new cp.PolyShape(this._body, verts, cp.vzero);
		this._shape.setElasticity(0.5);
		this._shape.setFriction(0.5);
		this._shape.collision_type = 2;
		gameScene.space.addShape(this._shape);
		//创建物理引擎精灵对象
		this._obs1 = new cc.PhysicsSprite(res.DRINK_PNG);
		this._obs1.setBody(this._body);
		this._obs1.x = this.x + this.width / 2;
		this._obs1.y = this.y + this.height / 2;
		gameScene.addChild(this._obs1);
		
		//设置锚点
		this.setAnchorPoint(cc.p(0.55063, 0.43005));
	},
	
	//清除层
	clearLayer:function(gameScene) {
		gameScene.space.removeBody(this._body);
		gameScene.space.removeShape(this._shape);
		gameScene.removeChild(this._obs1);
	},
});

RoundLayer3.create = function() {
	if (cc.pool.hasObject(RoundLayer3)) {
		return cc.pool.getFromPool(RoundLayer3);
	} else {
		return new RoundLayer3();
	}
}