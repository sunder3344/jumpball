//第一关，直线旋转
var RoundLayer1 = cc.Layer.extend({
	_name:"round1",
	_obs1:null,
	_obs2:null,
	_obsCount:2,
	
	ctor:function() {
		this._super();
		//this._super(cc.color(255, 255, 255, 255));
		this.setContentSize(200, 200);			//设置层大小
		this.init();
		return true;
	},
	
	init:function() {
		var winSize = cc.director.getWinSize();
		//线段1
		this._obs1 = new cc.Sprite(res.LINE_PNG);
		this._obs1.x = this.x + this.width / 2 - Constants.GAP_WIDTH;
		this._obs1.y = this.y + this.height / 2;
		this.addChild(this._obs1);
		
		//线段2
		this._obs2 = new cc.Sprite(res.LINE_PNG);
		this._obs2.x = this.x + this.width / 2 + Constants.GAP_WIDTH;
		this._obs2.y = this.y + this.height / 2;
		this.addChild(this._obs2);
		
		//设置锚点
		//this.anchorX = 0.5;
		//this.anchorY = 0.5;
		this.setAnchorPoint(cc.p(0.5, 0.5));
	},
	
	//开始旋转
	startRotate:function() {
		var actionBy = new cc.RotateBy(4, 360);
		this.runAction(actionBy).repeatForever();
	}
});

RoundLayer1.create = function() {
	if (cc.pool.hasObject(RoundLayer1)) {
		return cc.pool.getFromPool(RoundLayer1);
	} else {
		return new RoundLayer1();
	}
}