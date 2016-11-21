var MainLayer = cc.Scene.extend({
	i:0,
	_flag:0,
	_ball:null,
	
	ctor:function() {
		this._super();
		var winSize = cc.director.getWinSize();
		//弹射的小球
		this._ball = BallSprite.create();
		this._ball.x = winSize.width / 2;
		this._ball.y = winSize.height / 4;
		this.addChild(this._ball);
		//this._sdk_init();
		
		if ("touches" in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan: this._onMainTouchBegan.bind(this)
			}, this);
		} else {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: this._onMainMouseDown.bind(this),
				onMouseUp: this._onMainMouseUp.bind(this)
			}, this);
		}
		this.scheduleUpdate();
		return true;
	},
	
	_sdk_init:function() {
		this._agent = Anysdk._init();
		this._ads_plugin = this._agent.getAdsPlugin();
		this._ads_plugin.showAds(AdsType.AD_TYPE_BANNER);			//显示banner广告
		this._analytics_plugin = this._agent.getAnalyticsPlugin();
		this._analytics_plugin.startSession();
		this._analytics_plugin.setCaptureUncaughtException(true);			//收集应用错误日志
	},
	
	//onAdsResult:function(code, msg) {
		//cc.log("on ads result.")
	//},
	
	//初始化16个格子
	_init:function() {
		
	},
	
	_exit:function() {
		this._analytics_plugin.stopSession();
		cc.director.end();
	},
	
	//手指开始
	_onMainTouchBegan:function(touch, event) {
		var pos = touch.getLocation();
		cc.log(pos.x + "--" + pos.y);
		return true;
	},
	
	//鼠标开始
	_onMainMouseDown:function(event) {
		this._flag = 0;
		var pos = event.getLocation();
		var winSize = cc.director.getWinSize();
		var action = cc.jumpTo(Constants.BALL_JUMP_SECONDS, 
				cc.p(winSize.width/2, this._ball.y + Constants.BALL_JUMP_DISTANCE), 
				Constants.BALL_JUMP_STEP, 1);
		this._ball.runAction(action);
	},
	
	_onMainMouseUp:function() {
		this._flag = 1;
	},
	
	update:function() {
		if (this._flag == 1) {
			var winSize = cc.director.getWinSize();
			var action = cc.jumpTo(Constants.BALL_FALL_SECONDS, 
				cc.p(winSize.width/2, this._ball.y - Constants.BALL_FALL_DISTANCE), 
				-Constants.BALL_FALL_DISTANCE, 1);
			this._ball.runAction(action);
		}
	},
	
	//更新分数
	_updateScore:function(score) {
		//首先查看
		if (this._score < score) {
			this._score = score;
			this._scoreText.setString(this._score);
		}
		//记录最高分
		if (this._score > this._record) {
			this._record = this._score;
			this._recordText.setString(this._record);
			Storage.setCurrentHighest(this._record);
		}
	},
	
	_showDialog:function(content) {
		//设定结束值
		this._result = "stop";
		this._helpBtn.setEnabled(false);
		this._exitBtn.setEnabled(false);
		var dialogLayer = new DialogLayer(this, content);
		this._background.addChild(dialogLayer, 4);
	},
	
	//关闭声音
	_soundSwitchOn:function() {
		this._soundOff.setVisible(true);
		this._soundOn.setVisible(false);
		this._soundSwitch = "off";
		Storage.setCurrentSound("off");
	},
	
	//开启声音
	_soundSwitchOff:function() {
		this._soundOff.setVisible(false);
		this._soundOn.setVisible(true);
		this._soundSwitch = "on";
		Storage.setCurrentSound("on");
	},
});

var GameScene = cc.Scene.extend({
	layer: null,
    onEnter:function () {
        this._super();
        this.layer = new MainLayer();
        this.addChild(this.layer);
		this.scheduleUpdate();
    },
	
	update:function() {
		var winSize = cc.director.getWinSize();
		if (this.layer._ball.y < 0 - 10) {
			//显示错误提示框
			cc.log("fail");
		}
		if (this.layer._ball.y >= this.layer.height) {
			//显示成功提示框
			cc.log("success");
		}
	}
});