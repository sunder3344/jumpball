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
			-1.50000, 32.50000,
			-6.50000, -77.50000,
			-17.50000, -73.50000,
			-28.50000, 22.50000,
			-25.50000, 30.50000,
			
			38.00000, 21.00000,
			28.00000, -67.00000,
			24.00000, -76.00000,
			-6.50000, -77.50000,
			-1.50000, 32.50000,
			8.50000, 33.50000,
			36.50000, 29.50000,
			
			-29.50000, 89.50000,
			2.00000, 65.00000,
			-6.00000, 62.00000,
			-32.00000, 84.00000,
			
			2.00000, 65.00000,
			8.50000, 33.50000,
			0.00000, 36.00000,
			-6.00000, 62.00000,
			
			8.50000, 33.50000,
			-1.50000, 32.50000,
			0.00000, 36.00000,
		];		
		
		this._body = new cp.Body(1, cp.momentForPoly(1, verts, cp.vzero));
		cc.log(this._body);
		cc.log("asdf");
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