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
						score : object.get('Score'),
                        collegeAbbr: object.get('Abbreviation'),
                        collegeURL: object.get('CollegeURL')
					});
			    }   
			    callback(colleges);
				},
		  		error: function(error) {
		    		alert('Error: ' + error.code + ' ' + error.message);
		  		}
			});
		},

        getCollegeFromUrl: function GetCollegeFromUrl(college, callback) {
            var parseClass = Parse.Object.extend('College');
            var query = new Parse.Query(parseClass);
            query.equalTo('CollegeURL', college);
            var collegeData = [];

            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        collegeData.push({
                            collegeName: object.get('College'),
                            totalTyngPoints: object.get('Score'),
                            collegeAbbr: object.get('Abbreviation')
                        });

                    }
                    callback(collegeData);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },

        getAllSports: function GetAllSports(callback) {
            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
      
            var sports = [];
            var fall = [];
            var winter = [];
            var spring = [];

            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        var season = object.get('Season');

                        if (season == 'Fall') {
                            fall.push({
                                name: object.get('Name'),
                                url : object.get('URL')
                            });
                        }

                        else if (season == 'Winter') {
                            winter.push({
                                name: object.get('Name'),
                                url : object.get('URL')
                            });
                        }

                        else if (season == 'Spring') {
                            spring.push({
                                name: object.get('Name'),
                                url : object.get('URL')
                            });
                        }
                    }

                    sports.push({season : 'Fall', sport : fall});
                    sports.push({season : 'Winter', sport : winter});
                    sports.push({season : 'Spring', sport : spring});

                    callback(sports);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },

        getSports: function GetSports(callback, sport, college) {
            var parseClass = Parse.Object.extend('Team');
            var query = new Parse.Query(parseClass);

            if (typeof college !== 'undefined')
                query.equalTo('College', college);

            if (typeof sport !== 'undefined')
                query.equalTo('Name', sport);

            var sports = [];

            query.find({
                success: function(results) {
                
                //Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
                    sports.push({
                        college : object.get('College'),
                        //collegeURL: //fill in,
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

        getSportFromUrl: function GetSportsFromUrl(sport, callback) {
            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
            query.equalTo('URL', sport);
            var sportName = "";

            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        sportName = object.get('Name');

                    }
                    callback(sportName);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },

        getSeasonalSports: function GetSeasonalSports(season, callback) {
            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
            query.equalTo('Season', season);
            var sports = [];

            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        sports.push({
                            name : object.get('Name'),
                            url : object.get('URL'),
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
        },

        //get game by sport, college
        getGames: function GetGames(callback, sport, college, past) {
            
            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            if (typeof college !== 'undefined') {
                var query1 = new Parse.Query(parseClass);
                var query2 = new Parse.Query(parseClass);
                query1.equalTo('Team1', college);
                query2.equalTo('Team2', college);
                query = Parse.Query.or(query1, query2);
            } 

            if (typeof sport !== 'undefined')
                query.equalTo('Sport', sport);

            query.equalTo('Completed', past);

            if (past)
                query.descending('Date');
            else
                query.ascending('Date');

            var games = [];
  
            query.include("SportTest")
            query.include("Test1")
            query.include("Test2")
            query.find({
                success: function(results) {
                
                //Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];

                    games.push({
                        sport : object.get('SportTest').get('Name'),
                        url : object.get('SportTest').get('URL'),
                        team1 : object.get('Test1').get('College'),
                        team1abbr : object.get('Test1').get('Abbreviation'),
                        team1url : object.get('Test1').get('CollegeURL'),
                        team2 : object.get('Test2').get('College'),
                        team2abbr : object.get('Test2').get('Abbreviation'),
                        team2url : object.get('Test2').get('CollegeURL'),
                        score1 : object.get('Score1'),
                        score2 : object.get('Score2'),
                        date : object.get('Date')
                    });
                }   
                callback(games);
                },  
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        }
     };

     return ParseService;
});
