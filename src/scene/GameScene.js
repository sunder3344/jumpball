var MainLayer = cc.Scene.extend({
	i:0,
	_name:"mainLayer",
	_flag:0,
	_ball:null,
	_round:0,
	space:null,
	_roundLayer:null,
	_listener:null,
	_roundText:null,
	_soundOn:null,				//静音按钮
	_soundOff:null,
	_agent:null,
	_ads_plugin:null,
	_analytics_plugin:null,
	
	ctor:function() {
		this._super();
		this.initPhysics();

		var winSize = cc.director.getWinSize();
		this.width = winSize.width;
		this.height = winSize.height;
		//获取关卡数据
		var roundScore = Storage.getCurrentScore(Constants.ROUND_KEY);
		this._round = roundScore;
		
		//记分牌
		var roundLabel = new cc.LabelBMFont(Constants.ROUND_LABEL, res.FONT_FNT);
		this.addChild(roundLabel);
		roundLabel.x = this.x + 100;
		roundLabel.y = this.height - 100;
		this._roundText = new cc.LabelBMFont(this._round + 1, res.FONT_FNT);
		this.addChild(this._roundText);
		this._roundText.x = this.x + roundLabel.width + 100;
		this._roundText.y = this.height - 100;

		//弹射的小球
		this._ball = BallSprite.create(this);
		this._ball.x = winSize.width / 2;
		this._ball.y = winSize.height / 7;
		this.addChild(this._ball);
		
		//安置关卡
		//this._roundLayer = RoundSetup.ROUND_ARRAY[this._round];
		if (this._round >= RoundSetup.ROUND_ARRAY.length) {			//通关重置回0
			this._round = 0;
			Storage.setCurrentScore(Constants.ROUND_KEY, this._round);
			this._roundText.setString("1");
		}
		var roundLayerName = RoundSetup.ROUND_ARRAY[this._round];
		eval("this._roundLayer = new " + roundLayerName + "()");
		this._roundLayer.x = winSize.width / 2 - (this._roundLayer.width / 2);
		this._roundLayer.y = winSize.height / 2;
		this._roundLayer._init(this);
		this.addChild(this._roundLayer);
		//this._roundLayer.startRotate();
		
		/*var body = new cp.Body(1, cp.momentForBox(1, 123, 19));
		body.setAngVel(1.3);			//刚体旋转
		body.setPos(cc.p(0,0));
		this.space.addBody(body);
		
		var shape = new cp.BoxShape(body, 123, 19);
		shape.setElasticity(0.5);
		shape.setFriction(0.5);
		shape.collision_type = 2;
		this.space.addShape(shape);
		//创建物理引擎精灵对象
		var obs = new cc.PhysicsSprite(res.LINE_PNG);
		obs.setBody(body);
		obs.x = this.x + this.width / 2;
		obs.y = this.y + this.height / 2;
		this.addChild(obs);
		var actionBy = new cc.RotateBy(3, 360);
		var seq = cc.sequence(actionBy);
		obs.runAction(cc.sequence(new cc.RotateBy(3, 360)).repeatForever());*/
		
		if (this._round == 0) {			//只在第一关显示
			this._sdk_init();
		}
		this._analytics_init();
		this.onCollisionCheck();
		
		var layerListener = null;
		if ("touches" in cc.sys.capabilities) {
			/*cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan: this._onMainTouchBegan.bind(this),
				onTouchEnded: this._onMainTouchEnded.bind(this)
			}, this);*/
			layerListener = cc.EventListener.create({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: this._onMainTouchBegan.bind(this),
				onTouchEnded: this._onMainTouchEnded.bind(this)
			});
		} else {
			/*cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: this._onMainMouseDown.bind(this),
				onMouseUp: this._onMainMouseUp.bind(this)
			}, this);*/
			layerListener = cc.EventListener.create({
				event: cc.EventListener.MOUSE,
				swallowTouches: true,
				onMouseDown: this._onMainMouseDown.bind(this),
				onMouseUp: this._onMainMouseUp.bind(this)
			});
		}
		cc.eventManager.addListener(layerListener, this);
		this._listener = layerListener;
		this.scheduleUpdate();
		return true;
	},
	
	onEnter:function() {
		this._super();
		cc.sys.dumpRoot();
        cc.sys.garbageCollect();
		return true;
	},
	
	//物理引擎空间初始化
	initPhysics:function() {
		var winSize = cc.director.getWinSize();
		this.space = new cp.Space();
		this.setupDebugNode();
		//设置重力
		this.space.gravity = cp.v(0, 0);
		var staticBody = this.space.staticBody;
		
		//设置空间边界(此处没有空间边界)
		/*var walls = [new cp.SegmentShape(staticBody, cp.v(0, 0),
										cp.v(winSize.width/2, 0), 0),
					 new cp.SegmentShape(staticBody, cp.v(0, winSize.height),
										cp.v(winSize.width, winSize.height), 0),
					 new cp.SegmentShape(staticBody, cp.v(0, 0),
										cp.v(0, winSize.height), 0),
					 new cp.SegmentShape(staticBody, cp.v(winSize.width, 0),
										cp.v(winSize.width, winSize.height), 0)
					];
		for (var i = 0; i < walls.length; i++) {
			var shape = walls[i];
			shape.setElasticity(1);
			shape.setFriction(1);
			shape.collision_type = i;
			this.space.addStaticShape(shape);
		}*/
	},
	
	setupDebugNode:function() {
		this._debugNode = new cc.PhysicsDebugNode(this.space);
		this._debugNode.visible = Constants.PHYSICS_DEBUG_NODE_SHOW;
		this.addChild(this._debugNode);
	},
	
	_sdk_init:function() {
		this._agent = Anysdk._init();
		this._ads_plugin = this._agent.getAdsPlugin();
		this._ads_plugin.showAds(AdsType.AD_TYPE_BANNER);			//显示banner广告
		//this._analytics_plugin = this._agent.getAnalyticsPlugin();
		//this._analytics_plugin.startSession();
		//this._analytics_plugin.setCaptureUncaughtException(true);			//收集应用错误日志
	},
	
	_analytics_init:function() {
		this._analytics_plugin = this._agent.getAnalyticsPlugin();
		this._analytics_plugin.startSession();
		this._analytics_plugin.setCaptureUncaughtException(true);			//收集应用错误日志
	},
	
	_exit:function() {
		this._analytics_plugin.stopSession();
		cc.director.end();
	},
	
	//手指开始
	_onMainTouchBegan:function(touch, event) {
		this._flag = 0;
		var pos = touch.getLocation();
		var winSize = cc.director.getWinSize();
		var action = cc.jumpTo(Constants.BALL_JUMP_SECONDS, 
				cc.p(winSize.width/2, this._ball.y + Constants.BALL_JUMP_DISTANCE), 
				Constants.BALL_JUMP_STEP, 1);
		this._ball.runAction(action);
		return true;
	},
	
	//手指放开
	_onMainTouchEnded:function(touch, event) {
		this._flag = 1;
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
	
	//鼠标结束
	_onMainMouseUp:function() {
		this._flag = 1;
	},
	
	update:function() {
		var timeStep = 0.07;
		this.space.step(timeStep);
		if (this._flag == 1) {
			var winSize = cc.director.getWinSize();
			var action = cc.jumpTo(Constants.BALL_FALL_SECONDS, 
				cc.p(winSize.width/2, this._ball.y - Constants.BALL_FALL_DISTANCE), 
				-Constants.BALL_FALL_DISTANCE, 1);
			this._ball.runAction(action);
			
			var winSize = cc.director.getWinSize();
			if (this._ball.y < 0 - 10) {
				//显示错误提示框
				//cc.director.pause();
				this.removeListener();
				this.unscheduleUpdate();
				var dialogLayer = new DialogLayer(this, Constants.ROUND_FAIL, 0);
				this.addChild(dialogLayer, 3);
			} else if (this._ball.y >= this.height) {
				//显示成功提示框
				//cc.director.pause();
				//闯关成功，开始下一关
				Storage.setCurrentScore(Constants.ROUND_KEY, ++this._round);
				this.removeListener();
				this.unscheduleUpdate();
				if (this._round == RoundSetup.ROUND_ARRAY.length) {			//已经通关
					var dialogLayer = new DialogLayer(this, Constants.ROUND_FINISH, 1);
				} else {
					var dialogLayer = new DialogLayer(this, Constants.ROUND_SUCCESS, 1);
				}
				this.addChild(dialogLayer, 3);
			}
		}
		return true;
	},
	
	clearLayer:function() {
		this._roundLayer.clearLayer(this);
		this.removeChild(this._ball);
		this.removeChild(this._roundLayer);
	},
	
	removeListener:function() {
		cc.eventManager.removeListener(this._listener);
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
	
	//碰撞检测
	onCollisionCheck:function() {		
		//添加碰撞检测事件
		//important！如果有很多物体，此处需要遍历
		//小球的collision_type始终是1,与其他的遍历
		this.space.setDefaultCollisionHandler(
            this.collisionBegin.bind(this),
            this.collisionPre.bind(this),
            this.collisionPost.bind(this),
            this.collisionSeparate.bind(this)
        );
		/*this.space.addCollisionHandler(1, 2, 
			this.collisionBegin.bind(this),
			this.collisionPre.bind(this),
			this.collisionPost.bind(this),
			this.collisionSeparate.bind(this)
		);
		
		this.space.addCollisionHandler(1, 3, 
			this.collisionBegin.bind(this),
			this.collisionPre.bind(this),
			this.collisionPost.bind(this),
			this.collisionSeparate.bind(this)
		);*/
	},
	
	//碰撞检测
	collisionBegin:function(arbiter, space) {
		var shapes = arbiter.getShapes();
		var shapeA = shapes[0];
		var shapeB = shapes[1];
		var collTypeA = shapeA.collision_type;
		var collTypeB = shapeB.collision_type;
		//有任何的碰撞，游戏失败
		if (collTypeA >= 1 && collTypeB >= 1) {
			//cc.director.pause();
			this.removeListener();
			this.unscheduleUpdate();
			var dialogLayer = new DialogLayer(this, Constants.ROUND_FAIL, 0);
			this.addChild(dialogLayer, 3);
		}
		return true;
	},
	
	collisionPre:function(arbiter, space) {
		//cc.log("collision Pre");
		return true;
	},
	
	collisionPost:function(arbiter, space) {
		//cc.log("collision post");
	},
	
	collisionSeparate:function(arbiter, space) {
		//cc.log("collision seperate");
	}
});

var GameScene = cc.Scene.extend({
	layer: null,
    onEnter:function () {
        this._super();
        this.layer = new MainLayer();
        this.addChild(this.layer);
    }
});