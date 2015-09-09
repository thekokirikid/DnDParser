var fs = require('fs'), walk = require('walk'), xml2js = require('xml2js'), dictionary = require("./dictionaryServer.js");

var file_path = './xml_files';
var xml_files = [];

var walker = walk.walk(file_path, { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    if (stat.name.indexOf('.xml') > -1) {
    	xml_files.push(root + '/' + stat.name);
    }
    next();
});

walker.on('end', function() {
	console.log('Reading Files...');

    for (var file in xml_files) {
	    var parser = new xml2js.Parser();

		(function(file_name) {
			fs.readFile(file_name, { encoding: 'utf-8' }, function(e1, data) {
				if (e1) throw e1
			    parser.parseString(data, function (e2, result) {
			    	if (e2) {
			    		console.log(file_name + "\n" + e2);
			    	} else {
			    		var json_result = JSON.stringify(result);
			    		iterate(result);
			        	console.log(file_name + ' Complete.');
			    	}
			    });
			});
		})(xml_files[file]);
    }

});

function iterate(obj){
	if(typeof obj==="string"){
		var words = obj.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"").replace(/\s{2,}/g," ").split(" ");
		for(i in words){
			dictionary.checkWord(words[i],wordSearched);
		}
	}
	else{
		for(i in obj){
			if(obj.hasOwnProperty(i)){
				iterate(obj[i]);
			}
		}
	}
}

function wordSearched(word, data){
	if(word!==""&&word.length>1&&isNaN(word)&&data===0){
		console.log("not found: "+word);
	}
}

