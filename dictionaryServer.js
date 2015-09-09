module.exports = {
	initialize: function(){
		"use strict";
		console.log("initializing...");
		this.redis = require("redis");
		this.redisClient = this.redis.createClient();
		this.data = require('./library/dictionary.json');

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
	checkWord: function(word, callback){
		"use strict";
		//console.log("**********"+word);
		return this.redisClient.exists(word.toLowerCase(),function(err,data){
			if(err){
				throw err;
			}else{
				return callback(word,data);
			}
		});
	},
	addWordToDictionary: function(word){
		"use strict";
		this.redisClient.set(word,"");
	}

}

module.exports.initialize();