//第六关：十字线
var RoundLayer6 = cc.Layer.extend({
	_name:"round6",
	_obs1:null,
	_obs2:null,
	_obs3:null,
	_obs4:null,
	_obsCount:4,
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
		
		var verts_vertical_up = [
			8.99992, 159.90000,
			8.99992, 36.90000,
			-10.00008, 36.90000,
			-10.00008, 159.90000,
		];
		
		var verts_vertical_down = [
			9.00000, -36.90000,
			9.00000, -159.90000,
			-10.00000, -159.90000,
			-10.00000, -36.90000,
		];
		
		this._body = new cp.Body(1, cp.momentForPoly(1, verts_horizontal_left, cp.vzero));
		this._body.setAngVel(0.3);
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
		this._obs1.y = winSize.height / 2;
		gameScene.addChild(this._obs1);
		//设置锚点
		this._obs1.setAnchorPoint(cc.p(1.30000, 0.52632));
		
		this._body2 = new cp.Body(1, cp.momentForPoly(1, verts_horizontal_right, cp.vzero));
		this._body2.setAngVel(0.3);
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
		this._obs2.y = winSize.height / 2;
		gameScene.addChild(this._obs2);
		//设置锚点
		this._obs2.setAnchorPoint(cc.p(-0.30000, 0.52632));
		
		//竖状图
		this._body3 = new cp.Body(1, cp.momentForPoly(1, verts_vertical_up, cp.vzero));
		this._body3.setAngVel(0.3);
		gameScene.space.addBody(this._body3);
		this._shape3 = new cp.PolyShape(this._body3, verts_vertical_up, cp.vzero);
		this._shape3.setElasticity(0);
		this._shape3.setFriction(0);
		this._shape3.collision_type = 4;
		gameScene.space.addShape(this._shape3);
		//创建物理引擎精灵对象
		this._obs3 = new cc.PhysicsSprite(res.V_LINE_PNG);
		this._obs3.setBody(this._body3);
		this._obs3.x = this.x + this.width / 2;
		this._obs3.y = winSize.height / 2;
		gameScene.addChild(this._obs3);
		//设置锚点
		this._obs3.setAnchorPoint(cc.p(0.52632, -0.30000));
		
		this._body4 = new cp.Body(1, cp.momentForPoly(1, verts_vertical_down, cp.vzero));
		this._body4.setAngVel(0.3);
		gameScene.space.addBody(this._body4);
		this._shape4 = new cp.PolyShape(this._body4, verts_vertical_down, cp.vzero);
		this._shape4.setElasticity(0);
		this._shape4.setFriction(0);
		this._shape4.collision_type = 5;
		gameScene.space.addShape(this._shape4);
		//创建物理引擎精灵对象
		this._obs4 = new cc.PhysicsSprite(res.V_LINE_PNG);
		this._obs4.setBody(this._body4);
		this._obs4.x = this.x + this.width / 2;
		this._obs4.y = winSize.height / 2 + this.height - 15;
		gameScene.addChild(this._obs4);
		//设置锚点
		this._obs4.setAnchorPoint(cc.p(0.52632, 1.30000));
	},
	
	//清除层
	clearLayer:function(gameScene) {
		gameScene.space.removeBody(this._body);
		gameScene.space.removeBody(this._body2);
		gameScene.space.removeBody(this._body3);
		gameScene.space.removeBody(this._body4);
		gameScene.space.removeShape(this._shape);
		gameScene.space.removeShape(this._shape2);
		gameScene.space.removeShape(this._shape3);
		gameScene.space.removeShape(this._shape4);
		gameScene.removeChild(this._obs1);
		gameScene.removeChild(this._obs2);
		gameScene.removeChild(this._obs3);
		gameScene.removeChild(this._obs4);
	},
});

RoundLayer6.create = function() {
	if (cc.pool.hasObject(RoundLayer6)) {
		return cc.pool.getFromPool(RoundLayer6);
	} else {
		return new RoundLayer6();
	}
}