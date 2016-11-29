var DialogLayer = cc.LayerColor.extend({
	_gameScene:null,
	_promptTxt:null,
	_exitItem:null,
	_retryItem:null,
	
	ctor:function(gameScene, content) {
		this._gameScene = gameScene;
		this._super(cc.color(0, 0, 0, 255));
		var winSize = cc.director.getWinSize();
		this.setContentSize(winSize.width, winSize.height);
		
		//提示信息
		this._promptTxt = new cc.LabelTTF(content, "Arial", 30);
		this._promptTxt.x = this.width / 2;
		this._promptTxt.y = this.height / 2 + 200;
		this.addChild(this._promptTxt);
		
		//增加menuItem
		this._exitItem = new cc.MenuItemImage(res.EXIT_PNG, res.EXIT_PNG, this._exitGame, this);
		this._exitItem.x = winSize.width / 2;
		this._exitItem.y = winSize.height / 2;
		this._retryItem = new cc.MenuItemImage(res.RETRY_PNG, res.RETRY_PNG, this._retry, this);
		this._retryItem.x = winSize.width / 2 + this._exitItem.width / 2 + 150;
		this._retryItem.y = winSize.height / 2;
		var menu = new cc.Menu(this._exitItem, this._retryItem);
		this.addChild(menu);
		menu.x = this.x - 150;
		menu.y = this.y - 100;
	},
	
	onEnter:function() {
		this._super();
	},
	
	onExit:function() {
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
		//this._gameScene.removeAllChildren();
		this._gameScene.clearLayer();
		cc.director.runScene(new GameScene());
	}
});

DialogLayer.create = function(content) {
	if (cc.pool.hasObject(Dialoglayer)) {
		return cc.pool.getFromPool(DialogLayer);
	} else {
		return new DialogLayer(content);
	}
}