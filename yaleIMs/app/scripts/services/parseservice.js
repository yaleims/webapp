'use strict';

angular.module('yaleImsApp')
	.factory('ParseService', function() {
 
  	Parse.initialize('OIrcvapOVEU2B8RqVp7uzyLavPl5WExmOR5Bw9ph', 'ljWrwJntFsQhK6GxZOIVEWYH2SFvslPbiQoNN4Nv');

    var ParseService = {
      name: 'Parse',

      getColleges: function GetColleges(callback) {
		var parseClass = Parse.Object.extend('College');
		var query = new Parse.Query(parseClass);
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
		    		alert('Error: ' + error.code + ' ' + error.message);
		  		}
			});
		},

        getSports: function GetSports(sportname, callback) {
            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
            query.equalTo('Name', sportname);
            var sports = [];

            query.find({
                success: function(results) {
                
                //Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
                    sports.push({
                        college : object.get('College'),
                        win : object.get('Win'),   
                        loss : object.get('Loss'),
                        points : object.get('Points')
                    });
                }   
                callback(sports);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },

        getPlayers: function GetPlayers(callback) {
            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);
            var players = [];

            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        players.push({
                            name : object.get('FirstName') + ' ' + object.get('LastName'),
                            points : object.get('Points')
                        });
                    }
                    callback(players);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        }
     };

     return ParseService;
});