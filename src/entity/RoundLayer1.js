//第一关，直线旋转
var RoundLayer1 = cc.Layer.extend({
	_name:"round1",
	_obs1:null,
	_obs2:null,
	_obsCount:2,
	_gameScene:null,
	
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
		var body = new cp.Body(1, cp.momentForBox(1, 123, 19));
		body.setAngVel(1.0);
		gameScene.space.addBody(body);
		
		var shape = new cp.BoxShape(body, 123, 19);
		shape.setElasticity(0.5);
		shape.setFriction(0.5);
		shape.collision_type = 2;
		gameScene.space.addShape(shape);
		//创建物理引擎精灵对象
		this._obs1 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs1.setBody(body);
		this._obs1.x = this.x + this.width / 2 - Constants.GAP_WIDTH;
		this._obs1.y = this.y + this.height / 2;
		gameScene.addChild(this._obs1);
		
		//线段2
		var body2 = new cp.Body(1, cp.momentForBox(1, 123, 19));
		body2.setPos(cc.p(this.x + this.width / 2 + Constants.GAP_WIDTH, this.y + this.height / 2));
		body2.setAngVel(1.4);
		gameScene.space.addBody(body2);
		
		var shape2 = new cp.BoxShape(body2, 123, 19);
		shape2.setElasticity(0.5);
		shape2.setFriction(0.5);
		shape2.collision_type = 3;
		gameScene.space.addShape(shape2);
		//创建物理引擎精灵对象
		this._obs2 = new cc.PhysicsSprite(res.LINE_PNG);
		this._obs2.setBody(body2);
		this._obs2.x = this.x + this.width / 2 + Constants.GAP_WIDTH;
		this._obs2.y = this.y + this.height / 2;
		gameScene.addChild(this._obs2);
		
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
	}
});

RoundLayer1.create = function() {
	if (cc.pool.hasObject(RoundLayer1)) {
		return cc.pool.getFromPool(RoundLayer1);
	} else {
		return new RoundLayer1();
	}
}