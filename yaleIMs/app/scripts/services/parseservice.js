'use strict';

angular.module('yaleImsApp')
	.factory('ParseService', function() {
 
  	Parse.initialize("OIrcvapOVEU2B8RqVp7uzyLavPl5WExmOR5Bw9ph", "ljWrwJntFsQhK6GxZOIVEWYH2SFvslPbiQoNN4Nv");  

    var ParseService = {
      name: "Parse",

      getColleges: function GetColleges(callback) {
		var GameScore = Parse.Object.extend("College");
		var query = new Parse.Query(GameScore);
		var colleges = [];

		query.find({
		  	success: function(results) {
		  		
		  	  	//Do something with the returned Parse.Object values
			  	for (var i = 0; i < results.length; i++) { 
			    	var object = results[i];
			    	colleges.push({
						name : object.get('College'),			
						score : object.get('Score')
					});
			    }   
			    callback(colleges);
				},
		  		error: function(error) {
		    		alert("Error: " + error.code + " " + error.message);
		  		}
			});
		}	
     };

     return ParseService;
});