//第八关，直线旋转
var RoundLayer8 = cc.Layer.extend({
	_name:"round8",
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
	
	ctor:function() {
		this._super();
		//this._super(cc.color(255, 255, 255, 255));
		this.setContentSize(293, 19);			//设置层大小
		//this._init();
		return true;
	},
	
	update:function() {
		
	},
	
	_init:function(gameScene) {
		var winSize = cc.director.getWinSize();
		//线段1
		this._body = new cp.Body(1, cp.momentForBox(1, 123, 19));
		this._body.setAngVel(1.0);
		gameScene.space.addBody(this._body);
		
		this._shape = new cp.BoxShape(this._body, 123, 19);
		this._shape.setElasticity(0.5);
		this._shape.setFriction(0.5);
		this._shape.collision_type = 2;
		gameScene.space.addShape(this._shape);
		//创建物理引擎精灵对象
		this._obs1 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs1.setBody(this._body);
		this._obs1.x = this.x + this.width / 2 - Constants.GAP_WIDTH / 2;
		this._obs1.y = this.y + this.height / 2 - 100;
		gameScene.addChild(this._obs1);
		
		//线段2
		this._body2 = new cp.Body(1, cp.momentForBox(1, 123, 19));
		this._body2.setPos(cc.p(this.x + this.width / 2 + Constants.GAP_WIDTH, this.y + this.height / 2));
		this._body2.setAngVel(1.4);
		gameScene.space.addBody(this._body2);
		
		this._shape2 = new cp.BoxShape(this._body2, 123, 19);
		this._shape2.setElasticity(0.5);
		this._shape2.setFriction(0.5);
		this._shape2.collision_type = 3;
		gameScene.space.addShape(this._shape2);
		//创建物理引擎精灵对象
		this._obs2 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs2.setBody(this._body2);
		this._obs2.x = this.x + this.width / 2 + Constants.GAP_WIDTH;
		this._obs2.y = this.y + this.height / 2 - 150;
		gameScene.addChild(this._obs2);
		
		//线段3
		this._body3 = new cp.Body(1, cp.momentForBox(1, 123, 19));
		this._body3.setAngVel(1.4);
		gameScene.space.addBody(this._body3);
		
		this._shape3 = new cp.BoxShape(this._body3, 123, 19);
		this._shape3.setElasticity(0.5);
		this._shape3.setFriction(0.5);
		this._shape3.collision_type = 2;
		gameScene.space.addShape(this._shape3);
		//创建物理引擎精灵对象
		this._obs3 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs3.setBody(this._body3);
		this._obs3.x = this.x + this.width / 2 - Constants.GAP_WIDTH / 2;
		this._obs3.y = this.y + this.height / 2 + 110;
		gameScene.addChild(this._obs3);
		
		//线段4
		this._body4 = new cp.Body(1, cp.momentForBox(1, 123, 19));
		this._body4.setPos(cc.p(this.x + this.width / 2 + Constants.GAP_WIDTH, this.y + this.height / 2));
		this._body4.setAngVel(-1.6);
		gameScene.space.addBody(this._body4);
		
		this._shape4 = new cp.BoxShape(this._body4, 123, 19);
		this._shape4.setElasticity(0.5);
		this._shape4.setFriction(0.5);
		this._shape4.collision_type = 3;
		gameScene.space.addShape(this._shape4);
		//创建物理引擎精灵对象
		this._obs4 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs4.setBody(this._body4);
		this._obs4.x = this.x + this.width / 2 + Constants.GAP_WIDTH;
		this._obs4.y = this.y + this.height / 2 + 200;
		gameScene.addChild(this._obs4);
		
		//设置锚点
		this.setAnchorPoint(cc.p(0.5, 0.5));
	},
	
	//开始旋转
	startRotate:function() {
		var actionBy = new cc.RotateBy(3, 360);
		var seq = cc.sequence(actionBy);
		//this._obs1.runAction(seq.repeatForever());
		//this._obs2.runAction(seq.repeatForever());
		//this.runAction(seq.repeatForever());
	},
	
	//清除层
	clearLayer:function(gameScene) {
		gameScene.space.removeBody(this._body);
		gameScene.space.removeBody(this._body2);
		gameScene.space.removeShape(this._shape);
		gameScene.space.removeShape(this._shape2);
		gameScene.removeChild(this._obs1);
		gameScene.removeChild(this._obs2);
	}
});

RoundLayer8.create = function() {
	if (cc.pool.hasObject(RoundLayer8)) {
		return cc.pool.getFromPool(RoundLayer8);
	} else {
		return new RoundLayer8();
	}
}