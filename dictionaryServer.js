module.exports = {
	initialize: function(){
		"use strict";
		console.log("initializing...");
		this.redis = require("redis");
		this.redisClient = this.redis.createClient();
		this.data = require('./libraries/dictionary.json');

		this.loadDictionary();
	},
	loadDictionary:function(){
		"use strict";
		console.log("loading dictionary...");
		var self=this;
		this.data.forEach(function(word){
			self.redisClient.set(word,"");
		});
		console.log("dictionary loaded!");
	},
	checkWord: function(word){
		"user strict";
		console.log("checking dictionary for "+ word);
		this.redisClient.exists(word.toUpperCase(),function(err,data){
			if(err){
				throw err;
			}else{
				console.log(word+": "+data);
			}
		});
	}
	addWordToDictionary: function(word){
		"use strict";
		this.redisClient.set(word,"");
	}

}

module.exports.initialize();