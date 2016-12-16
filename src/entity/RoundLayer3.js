//第三关
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
		//注意：physicsEditor需要用注册版的，否则只能添加10个shape，超过10个shape在cocos中加载全部会报错。
		var verts = [
			135.30000, 9.50000,
			135.30000, -9.50000,
			12.30000, -9.50000,
			12.30000, 9.50000,
		];
		
		this._body = new cp.Body(1, cp.momentForPoly(1, verts, cp.vzero));
		this._body.setAngVel(0.9);
		gameScene.space.addBody(this._body);
		this._shape = new cp.PolyShape(this._body, verts, cp.vzero);
		this._shape.setElasticity(0);
		this._shape.setFriction(0);
		this._shape.collision_type = 2;
		gameScene.space.addShape(this._shape);
		//创建物理引擎精灵对象
		this._obs1 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs1.setBody(this._body);
		this._obs1.x = this.x + this.width / 2 + Constants.GAP_WIDTH + 30;
		this._obs1.y = this.y + this.height / 2;
		gameScene.addChild(this._obs1);
		//设置锚点
		this._obs1.setAnchorPoint(cc.p(-0.1, 0.5));
		
		this._body2 = new cp.Body(1, cp.momentForPoly(1, verts, cp.vzero));
		this._body2.setAngVel(-1.1);
		gameScene.space.addBody(this._body2);
		this._shape2 = new cp.PolyShape(this._body2, verts, cp.vzero);
		this._shape2.setElasticity(0);
		this._shape2.setFriction(0);
		this._shape2.collision_type = 3;
		gameScene.space.addShape(this._shape2);
		//创建物理引擎精灵对象
		this._obs2 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs2.setBody(this._body2);
		this._obs2.x = this.x + this.width / 2 - Constants.GAP_WIDTH - 30;
		this._obs2.y = this.y + this.height / 2;
		gameScene.addChild(this._obs2);
		
		//设置锚点
		this._obs2.setAnchorPoint(cc.p(-0.1, 0.5));
	},
	
	//清除层
	clearLayer:function(gameScene) {
		gameScene.space.removeBody(this._body);
		gameScene.space.removeShape(this._shape);
		gameScene.removeChild(this._obs1);
		gameScene.removeChild(this._obs2);
	},
});

RoundLayer3.create = function() {
	if (cc.pool.hasObject(RoundLayer3)) {
		return cc.pool.getFromPool(RoundLayer3);
	} else {
		return new RoundLayer3();
	}
}