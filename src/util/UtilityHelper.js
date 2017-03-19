var UtilityHelper = {
	//生成随机数
	createRandomIndex:function(number) {
		return parseInt(Math.random() * number);
	},
	
	logs:function(object, iteration) {
		if (typeof(object) == "object") {
			this.objectEach(object);
		} else {
			cc.log("LOG => " + object);
		}
	},
	
	objectEach:function(object, iteration) {
		if (iteration <= 0) {
			return;
		}
		for (var data in object) {
			if (typeof(data) == "object") {
				iteration--;
				this.objectEach(data, iteration);
			} else {
				cc.log(data + " => " + object[data]);
			}
		}
	}
}