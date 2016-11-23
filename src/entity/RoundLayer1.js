//第一关，直线旋转
var RoundLayer1 = cc.LayerColor.extend({
	_name:"round1",
	_obs1:null,
	_obs2:null,
	_obsCount:2,
	_gameScene:null,
	
	ctor:function() {
		this._super();
		this._super(cc.color(255, 255, 255, 255));
		this.setContentSize(200, 200);			//设置层大小
		//this._init();
		return true;
	},
	
	update:function() {
		
	},
	
	_init:function(gameScene) {
		var winSize = cc.director.getWinSize();
		//线段1
		/*this._obs1 = new cc.Sprite(res.LINE_PNG);
		this._obs1.x = this.x + this.width / 2 - Constants.GAP_WIDTH;
		this._obs1.y = this.y + this.height / 2;
		this.addChild(this._obs1);*/
		var body = new cp.Body(1, cp.momentForBox(1, 123, 19));
		body.setPos(cc.p(0, 0));
		//body.setAngVel(1.3);
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
		this.addChild(this._obs1);
		//gameScene.addChild(this._obs1);
		
		//线段2
		/*this._obs2 = new cc.Sprite(res.LINE_PNG);
		this._obs2.x = this.x + this.width / 2 + Constants.GAP_WIDTH;
		this._obs2.y = this.y + this.height / 2;
		this.addChild(this._obs2);*/
		var body2 = new cp.Body(1, cp.momentForBox(1, 123, 19));
		body2.setPos(cc.p(0, 0));
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
		this.addChild(this._obs2);
		//gameScene.addChild(this._obs2);
		
		//设置锚点
		//this.anchorX = 0.5;
		//this.anchorY = 0.5;
		this.setAnchorPoint(cc.p(0.5, 0.5));
	},
	
	//开始旋转
	startRotate:function() {
		var actionBy = new cc.RotateBy(3, 360);
		var seq = cc.sequence(actionBy);
		this.runAction(seq.repeatForever());
	}
});

RoundLayer1.create = function() {
	if (cc.pool.hasObject(RoundLayer1)) {
		return cc.pool.getFromPool(RoundLayer1);
	} else {
		return new RoundLayer1();
	}
}