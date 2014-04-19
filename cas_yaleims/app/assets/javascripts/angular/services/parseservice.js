'use strict';

angular.module('yaleImsApp')
	.factory('ParseService', function() {
 
  	Parse.initialize('OIrcvapOVEU2B8RqVp7uzyLavPl5WExmOR5Bw9ph', 'ljWrwJntFsQhK6GxZOIVEWYH2SFvslPbiQoNN4Nv');

    var ParseService = {
        name: 'Parse',

        getColleges: function GetColleges(callback) {
        
            var parseClass = Parse.Object.extend('College');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            var colleges = [];
            
            query.find().then(function(results) {
                
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
                promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

        getCollegeObjects: function GetCollegeObjects(collegeURL, callback) {

            var parseClass = Parse.Object.extend('College');
            var query = new Parse.Query(parseClass);
            
            var promise = new Parse.Promise();

            if (typeof collegeURL !== 'undefined') 
                query.equalTo('URL', collegeURL);
            
            var colleges = [];
            
            query.find().then(function(results) {
		  		
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
			    	colleges.push(object);
                }   
                callback(colleges);
                promise.resolve();

            }, function(error) {
		    	alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
			});

            return promise;
		},

        getSports: function GetSports(callback) {

            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();
      
            var sports = [];
          
            query.find().then(function(results) {

                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                        
                    sports.push({
                        sport : object.get('Sport'),
                        season : object.get('Season'),
                        url : object.get('URL') 
                    });
                }
                callback(sports);
                promise.resolve();
                
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

        getSportObjects: function GetSportObjects(sportURL, getAll, callback) {
            
            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
            
            var promise = new Parse.Promise();

            if (typeof collegeURL !== 'undefined' || !getAll) 
                query.equalTo('URL', sportURL);
            
            var sports = [];

            query.find().then(function(results) {

                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    sports.push(object);
                }
                callback(sports);
                promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });
            
            return promise;
        },
        
        getSportsBySeason: function GetSportsBySeason(callback) {

            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);
      
            var promise = new Parse.Promise();

            var sports = [];

            var fall = [];
            var winter = [];
            var spring = [];

            query.find().then(function(results) {

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
                promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },
        
        getTeams: function GetTeams(callback, sport, college) {
           
            var parseClass = Parse.Object.extend('Team');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            if (typeof college !== 'undefined')
                query.equalTo('College', college);

            if (typeof sport !== 'undefined')
                query.equalTo('Sport', sport);

            var teams = [];

            query.include('College');
            query.include('Sport');

            query.find().then(function(results) {
                
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
                promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

        getTeamObjects: function GetTeamObjects(sport, college, callback) {
           
            var parseClass = Parse.Object.extend('Team');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            if (typeof college !== 'undefined')
                query.equalTo('College', college);

            if (typeof sport !== 'undefined')
                query.equalTo('Sport', sport);

            var teams = [];

            query.find().then(function(results) {
                
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
                    teams.push(object);
                }   
                callback(teams);
                promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

    
        getPlayers: function GetPlayers(callback) {

            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);
            
            var promise = new Parse.Promise();

            var players = [];

            query.find().then(function(results) {

                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    players.push({
                        name : object.get('Name'),
                        points : object.get('Points')
                    });
                }
               callback(players);
               promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

        getPlayerObjects: function GetPlayerObjects(netid, callback) {

            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);
            
            var promise = new Parse.Promise();

            query.equalTo('netid', netid);

            var players = [];

            query.find().then(function(results) {

                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    players.push(object);
                }
                callback(players);
                promise.resolve();

            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

        //get game by sport, college
        getGames: function GetGames(callback, sport, college, past) {
            
            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

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
            
            query.find().then(function(results) {
                
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];

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
                promise.resolve();
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();    
            });

            return promise;
        },

        addGame: function addGame(team1, team2, sport, date) {
            
            var object = Parse.Object.extend('Game');
            var object = new object();

            var promise = new Parse.Promise();

            object.save({Team1:team1, 
                        Team2:team2, 
                        Sport:sport, 
                        Date:date, 
                        Completed:false}

            ).then(function(object) {
                promise.resolve();
            }, function(error) {
                alert("Error: " + error.message);
                promise.reject();
            });

            return promise;
        },

        updateTable: function updateTable(sport, college, points, win, loss) {
            
            var object = Parse.Object.extend('Team');
            var object = new object();

            var promise = new Parse.Promise();

            object.save({Sport:sport, 
                        College:college, 
                        Points:points, 
                        Win:win, 
                        Loss:loss}

            ).then(function(object) {
                promise.resolve();
            }, function(error) {
                alert("Error: " + error.message);
                promise.reject();
            });

            return promise;
        },

        addPerson: function addPerson(netid, name, collegeurl, year) {
            
            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('netid', netid);
            
            var CollegeObject;
            var found = false;

            query.find().then(function(results) {
                if (results.length > 0)
                    found = true;
            }, function(error) {
                proimse.reject();
                alert('Error: ' + error.code + ' ' + error.message);
            }).then(function(results) {
                if (!found) {
                    ParseService.getCollegeObjects(collegeurl, function(results) {
                        collegeObject = results[0];
                    }).then(function(results) {
        
                        var object = Parse.Object.extend('Player');
                        var object = new object();

                        object.save({netid:netid, 
                                    College:collegeObject, 
                                    Name:name, 
                                    Year:year, 
                                    Points:10}
                        ).then(function(object) {
                            promise.resolve();
                        }, function(error) {
                            alert("Error: " + error.message);
                            promise.reject();
                        });
                    });        
                }
            });

            return promise;
        },

        joinTeam: function joinTeam(netid, college, team) {

            var parseClass = Parse.Object.extend('Team');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();
            
            var teamObject;
            var playerObject;
            var sportObject;
            var collegeObject;


            ParseService.getSportObjects('coed-tennis', false, function(results) {
                sportObject = results[0];
            }).then(function(results) {

                ParseService.getCollegeObjects('morse', function(results) {
                    collegeObject = results[0];
                }).then(function(results) {
            
                ParseService.getTeamObjects(sportObject, collegeObject, function(results) {
                    teamObject = results[0];
                }).then(function(results) {

                    ParseService.getPlayerObjects(netid, function(results) {
                        playerObject = results[0];
                    }).then(function(results) {
                        
                        var object = Parse.Object.extend('Joined');
                        var object = new object();

                        object.save({Player: playerObject,
                                    Team: teamObject}
                        ).then(function(object) {
                            promise.resolve();
                        }, function(error) {
                            alert("Error: " + error.message);
                            promise.reject();
                        });
                });
            });
                      });
            });


            return promise;
        }
    };

    return ParseService;
});