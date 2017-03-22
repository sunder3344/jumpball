var Anysdk = {
	//注意：这里 appKey, appSecret, privateKey，要替换成自己打包工具里面的值(登录打包工具，游戏管理界面上显示的那三个参数)。
	appKey : "0E4CA189-51ED-2D40-2F10-6B3B8ADA93B4",
	appSecret : "d3a6eb2b18c4680c05c00fbaa4d56022",
	privateKey : "E313A4F9031BD9C4725440373D408CBA",
	oauthLoginServer : "http://oauth.anysdk.com/api/OauthLoginDemo/Login.php",
	agent : null,

	_init:function() {
		//init
		this.agent = anysdk.AgentManager.getInstance();
		this.agent.init(this.appKey, this.appSecret, this.privateKey, this.oauthLoginServer);
		return this.agent;
		//load
		//Android建议 在onCreate 里调用 PluginWrapper.loadAllPlugins()；来进行插件初始化
	},
	
	//用户系统
	_userPlugin:function() {
		//this._init();
		//var user_plugin  = this.agent.getUserPlugin();              //用户系统
	},
	
	//支付系统
	_iapPlugin:function() {
		//this._init();
		//var iap_plugins = this.agent.getIAPPlugin();              	//支付系统
	},
	
	//分享系统
	_sharePlugin:function() {
		//this._init();
		//var share_plugin = this.agent.getSharePlugin();             //分享系统
	},
	
	//广告系统
	_adsPlugin:function() {
		if (this.agent == null) {
			this._init();
		}
		var ads_plugin = this.agent.getAdsPlugin();               	//广告系统
		return ads_plugin;
	},
	
	//社交系统
	_socialPlugin:function() {
		//this._init();
		//var social_plugin = this.agent.getSocialPlugin();           //社交系统
	},
	
	//推送系统
	_pushPlugin:function() {
		//this._init();
		//var push_plugin = this.agent.getPushPlugin();              //推送系统
	},
	
	//统计系统
	_analyticsPlugin:function() {
		this._init();
		var analytics_plugin = this.agent.getAnalyticsPlugin();    //统计系统
		return analytics_plugin;
	},
	
	//崩溃分析系统
	_crashPlugin:function() {
		//this._init();
		//var crash_plugin = this.agent.getCrashPlugin();             //崩溃分析系统
	},
	
	//录屏分享系统
	_recPlugin:function() {
		//this._init();
		//var rec_plugin = this.agent.getRECPlugin();                 //录屏分享系统
	},
	
	//自定义系统
	_customPlugin:function() {
		//this._init();
		//var custom_plugin = this.agent.getCustomPlugin();           //自定义系统
	},
	
	_unloadPlugin:function() {
		this.agent.unloadAllPlugins();
	}
}