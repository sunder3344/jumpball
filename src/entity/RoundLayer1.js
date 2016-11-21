var RoundLayer1 = cc.Layer.extend({
	
	ctor:function(gameScene, content) {
		this._super();
		
	},
	
	onEnter:function() {
		this._super();
	},
	
	onExit:function() {
		cc.eventManager.removeListener(this._listener);
		this._super();
	},
	
	init:function() {
		
	},
	
	//退出游戏
	_exitGame:function() {
		cc.director.end();
	},
	
	//重新开始
	_retry:function() {
		cc.director.runScene(new GameScene());
	}
});

DialogLayer.create = function() {
	if (cc.pool.hasObject(Dialoglayer)) {
		return cc.pool.getFromPool(DialogLayer);
	} else {
		return new DialogLayer();
	}
}