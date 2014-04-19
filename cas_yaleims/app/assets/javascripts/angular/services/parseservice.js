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
                            college : object.get('College'),
                            abbreviation : object.get('Abbreviation'),
                            url : object.get('URL'),
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

        getCollegeObjects: function GetCollegeObjects(collegeURL, callback) {

            var parseClass = Parse.Object.extend('College');
            var query = new Parse.Query(parseClass);
	       	
            if (typeof collegeURL !== 'undefined') 
                query.equalTo('URL', collegeURL);
            
            var colleges = [];
            
            query.find().then(function(results) {
		  		
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
			    	colleges.push(object);
                }   
                callback(colleges);
                promise = Parse.Promise.as("The good result.");
            }, function(error) {
		    	alert('Error: ' + error.code + ' ' + error.message);
			});
		},

        getSports: function GetSports(callback) {

            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
      
            var sports = [];
          
            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        
                        sports.push({
                            sport : object.get('Sport'),
                            season : object.get('Season'),
                            url : object.get('URL') 
                        });
                    }
                    callback(sports);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },

        getSportObjects: function GetSportObjects(sportURL, getAll, callback) {
            
            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
            
            if (typeof collegeURL !== 'undefined' || !getAll) 
                query.equalTo('URL', sportURL);
            
            var sports = [];

            query.find({
                success: function(results) {

                    //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        sports.push(object);
                    }
                    callback(sports);
                },
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },
        
        getSportsBySeason: function GetSportsBySeason(callback) {

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

                        if (season == 'Fall')
                            fall.push(object);

                        else if (season == 'Winter')
                            winter.push(object);

                        else if (season == 'Spring')
                            spring.push(object);
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
        
        getTeams: function GetTeams(callback, sport, college) {
           
            var parseClass = Parse.Object.extend('Team');
            var query = new Parse.Query(parseClass);

            if (typeof college !== 'undefined')
                query.equalTo('College', college);

            if (typeof sport !== 'undefined')
                query.equalTo('Sport', sport);

            var teams = [];

            query.include('College');
            query.include('Sport');

            query.find({
                success: function(results) {
                
                //Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) { 
                        var object = results[i];
                        teams.push({
                            points : object.get('Points'),
                            win : object.get('Win'),
                            loss : object.get('Loss'),
                            sport : object.get('Sport'),
                            college : object.get('College')
                        })
                    }   
                    callback(teams);
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
  
            query.include('Sport');
            query.include('Team1');
            query.include('Team2');
            
            query.find({
                success: function(results) {
                
                //Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];

                    //alert(object.id);
                    games.push({
                        date : object.get('Date'),
                        score1 : object.get('Score1'),
                        score2 : object.get('Score2'),
                        complete : object.get('Completed'),
                        team1 : object.get('Team1'),
                        team2 : object.get('Team2'),
                        sport : object.get('Sport')
                    });
                }   
                callback(games);
                },  
                error: function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        },

        addGame: function addGame(team1, team2, sport, date, callback) {
            
            var object = Parse.Object.extend('Game');
            var object = new object();

            object.save({Team1:team1, Team2:team2, Sport:sport, Date:date, Completed:false}, {
              success: function(object) {
                callback();
              },
              error: function(error) {
                alert("Error: " + error.message);
              }
            });
        },

        updateTable: function updateTable(sport, college, points, win, loss, callback) {
            
            var object = Parse.Object.extend('Team');
            var object = new object();

            object.save({Sport:sport, College:college, Points:points, Win:win, Loss:loss}, {
              success: function(object) {
                callback();
              },
              error: function(error) {
                alert("Error: " + error.message);
              }
            });
        },

        addPerson: function addPerson(netid, name, collegeurl, year) {
            
            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);

            query.equalTo('netid', netid);
            var found = false;
            var collegeObject;

            query.find().then(function(results) {
                if (results.length > 0)
                    found = true;
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
            }).then(function(results) {
                if (!found) {           
                    var parseClass = Parse.Object.extend('College');
                    var query = new Parse.Query(parseClass);

                    query.equalTo('URL', collegeurl);
            
                    query.find().then(function(results) {
                
                        for (var i = 0; i < results.length; i++) { 
                            collegeObject = results[i];
                        }   
                    }, function(error) {
                        alert('Error: ' + error.code + ' ' + error.message);
                    }).then(function(results) {
                        var object = Parse.Object.extend('Player');
                        var object = new object();

                        object.save({netid:netid, College:collegeObject, Name:name, Year:year, Points:10}, {
                            success: function(object) {
                            },
                            error: function(error) {
                                alert("Error: " + error.message + "FUCK");
                            }
                        });
                    });
                }
            });
        }
    };

    return ParseService;
});