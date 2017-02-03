//第五关：一字线
var RoundLayer5 = cc.Layer.extend({
	_name:"round5",
	_obs1:null,
	_obs2:null,
	_obs3:null,
	_obs4:null,
	_obsCount:2,
	_gameScene:null,
	_body:null,
	_body2:null,
	_body3:null,
	_body4:null,
	_shape:null,
	_shape2:null,
	_shape3:null,
	_shape4:null,
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
		var verts_horizontal_left = [
			-36.90000, 9.00000,
			-36.90000, -10.00000,
			-159.90000, -10.00000,
			-159.90000, 9.00000,
		];
		
		var verts_horizontal_right = [
			159.90000, 9.00000,
			159.90000, -10.00000,
			36.90000, -10.00000,
			36.90000, 9.00000,
		];
		
		this._body = new cp.Body(1, cp.momentForPoly(1, verts_horizontal_left, cp.vzero));
		this._body.setAngVel(0.7);
		gameScene.space.addBody(this._body);
		this._shape = new cp.PolyShape(this._body, verts_horizontal_left, cp.vzero);
		this._shape.setElasticity(0);
		this._shape.setFriction(0);
		this._shape.collision_type = 2;
		gameScene.space.addShape(this._shape);
		//创建物理引擎精灵对象
		this._obs1 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs1.setBody(this._body);
		this._obs1.x = winSize.width / 2 + 36 - 33;
		this._obs1.y = this.y + this.height / 2;
		gameScene.addChild(this._obs1);
		//设置锚点
		this._obs1.setAnchorPoint(cc.p(1.30000,0.52632));
		
		this._body2 = new cp.Body(1, cp.momentForPoly(1, verts_horizontal_right, cp.vzero));
		this._body2.setAngVel(0.7);
		gameScene.space.addBody(this._body2);
		this._shape2 = new cp.PolyShape(this._body2, verts_horizontal_right, cp.vzero);
		this._shape2.setElasticity(0);
		this._shape2.setFriction(0);
		this._shape2.collision_type = 3;
		gameScene.space.addShape(this._shape2);
		//创建物理引擎精灵对象
		this._obs2 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs2.setBody(this._body2);
		this._obs2.x = this.x + this.width / 2 - 36 + 33;
		//this._obs2.x = this.x + this.width / 2 + Constants.GAP_WIDTH / 2;
		this._obs2.y = this.y + this.height / 2;
		gameScene.addChild(this._obs2);
		//设置锚点
		this._obs2.setAnchorPoint(cc.p(-0.30000,0.52632));
	},
	
	//清除层
	clearLayer:function(gameScene) {
		gameScene.space.removeBody(this._body);
		gameScene.space.removeBody(this._body2);
		gameScene.space.removeShape(this._shape);
		gameScene.space.removeShape(this._shape2);
		gameScene.removeChild(this._obs1);
		gameScene.removeChild(this._obs2);
	},
});

RoundLayer5.create = function() {
	if (cc.pool.hasObject(RoundLayer5)) {
		return cc.pool.getFromPool(RoundLayer5);
	} else {
		return new RoundLayer5();
	}
}