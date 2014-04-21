'use strict';

angular.module('yaleImsApp')
	.factory('ParseService', function() {
 
  	Parse.initialize('OIrcvapOVEU2B8RqVp7uzyLavPl5WExmOR5Bw9ph', 'ljWrwJntFsQhK6GxZOIVEWYH2SFvslPbiQoNN4Nv');

    var ParseService = {
        name: 'Parse',

        getColleges: function GetColleges(collegeURL, callback) {
        
            var parseClass = Parse.Object.extend('College');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            if (typeof collegeURL !== 'undefined') 
                query.equalTo('URL', collegeURL);

            var colleges = [];
            
            query.find().then(function(results) {
                
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
                    colleges.push({
                        college : object.get('College'),
                        abbreviation : object.get('Abbreviation'),
                        url : object.get('URL'),
                        score : object.get('Score'),
                        object : object
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

        getSports: function GetSports(sportURL, callback) {

            var parseClass = Parse.Object.extend('Sport');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            if (typeof sportURL !== 'undefined') {
                query.equalTo('URL', sportURL);
            }
      
            var sports = [];
          
            query.find().then(function(results) {

                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                        
                    sports.push({
                        sport : object.get('Sport'),
                        season : object.get('Season'),
                        url : object.get('URL'),
                        object : object
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
        
        getTeams: function GetTeams(sport, college, callback) {
           
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
                        tie : object.get('Tie'),
                        sport : object.get('Sport'),
                        college : object.get('College'),
                        object : object
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
    
        getPlayers: function GetPlayers(netid, callback) {

            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);

            if (typeof netid !== 'undefined')
                query.equalTo('netid', netid);
            
            var promise = new Parse.Promise();

            var players = [];

            query.include('College');

            query.find().then(function(results) {

                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    players.push({
                        name : object.get('Name'),
                        netid : object.get('netid'),
                        points : object.get('Points'),
                        college : object.get('College').get('College'),
                        collegeurl : object.get('College').get('URL'),
                        year : object.get('Year'),
                        object : object
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

        getGameById: function GetGameById(id, callback) {

            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('objectId', id);

            var games = [];

            query.find().then(function(results) {
                
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];

                    games.push(object);
                }   
                callback(games);
                promise.resolve();
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();    
            });

            return promise;
        },

        getGamesByDate: function GetGamesByDate(gameids, buffer, past, callback) {

            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            var date = new Date();

            var games = [];

            if (typeof gameids !== 'undefined') {
                console.log(gameids)
                query.containedIn('objectId', gameids);
            }

            if (typeof buffer == 'number')
                date = new Date(date.getTime() + buffer*60000);

            if (past)
                query.lessThan('Date', date);
            else
                query.greaterThan('Date', date);

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
                        sport : object.get('Sport'),
                        winner : object.get('Winner'),
                        object : object
                    });
                }   
                console.log(games);
                callback(games);
                promise.resolve();
            }, function(error) {
                promise.reject();
            });

            return promise;
        },

        //get game by sport, college
        getGames: function GetGames(sport, college, past, callback) {
            
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

            if (past) {
                query.descending('Date');
                query.exists('Score1');
            }
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
                        sport : object.get('Sport'),
                        winner : object.get('Winner'),
                        object : object
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

        setAttended: function setAttended(player, game) {

            var parseClass = Parse.Object.extend('Attend');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('Game', game);
            query.equalTo('Player', player);

            query.first().then(function(results) {
                var object = results;

                object.set('Attended', true);
                object.save().then(function() {
                    promise.resolve();    
                }, function(error) {
                    promise.reject();
                });
            }, function(error) {
                promise.reject();
            });

            return promise;
        },

        getCheckIns: function getCheckIns(callback) {
            
            var games = [];
            var attending = [];

            var promise = new Parse.Promise();

            var parseClass = Parse.Object.extend('Attend');
            var query = new Parse.Query(parseClass);

            query.equalTo('Attended', false);

            query.find().then(function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    games.push(object.get('Game').id);
                }
            }).then(function () {
                ParseService.getGamesByDate(games, 15, true, function(results) {
                    for (var i = 0; i < results.length; i++) {
                        attending.push(results[i]);
                    }
                });
            callback(attending);
            promise.resolve();
            });

            return promise;
        },

        getRSVPGames: function getRSVPGames(player, past, callback) {

            var games = [];
            var attending = [];

            var promise = new Parse.Promise();

            var parseClass = Parse.Object.extend('Attend');
            var query = new Parse.Query(parseClass);

            query.equalTo('Attended', true);
            query.equalTo('Player', player);

            query.find().then(function(results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    games.push(object.get('Game').id);
                }
            }).then(function () {
                ParseService.getGamesByDate(games, 0, past, function(results) {
                    for (var i = 0; i < results.length; i++) {
                        attending.push(results[i]);
                    }
                });
                callback(attending);
                promise.resolve();
            });

        return promise;
        },

        getAttending: function getAttending(player, game, callback) {

            var parseClass = Parse.Object.extend('Attend');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            if (typeof game !== 'undefined') 
               query.equalTo('Game', game);

            if (typeof player !== 'undefined') 
              query.equalTo('Player', player);
                    
            var attending = [];

            query.include(['Player.College']);
            query.include(['Game.Team1']);
            query.include(['Game.Team2']);
            query.include(['Game.College']);

            query.find().then(function(results) {
                  
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
                    
                    attending.push({
                        player : {
                            netid : object.get('Player').get('netid'),
                            name : object.get('Player').get('Name'),
                            college : object.get('Player').get('College').get('College'),
                            collegeurl : object.get('Player').get('College').get('URL'),
                            object : object.get('Player')
                        },
                        game : {
                            date : object.get('Game').get('Date'),
                            score1 : object.get('Game').get('Score1'),
                            score2 : object.get('Game').get('Score2'),
                            complete : object.get('Game').get('Completed'),
                            team1 : object.get('Game').get('Team1'),
                            team2 : object.get('Game').get('Team2'),
                            sport : object.get('Game').get('Sport'),
                            object : object.get('Game')
                        },
                        object : object        
                    });
                } 
                callback(attending);
                promise.resolve();
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });

            return promise;
        },

        getJoined: function getJoined(netid, team, callback) {

            var parseClass = Parse.Object.extend('Joined');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            var playerObject;
                    
            ParseService.getPlayers(netid, function(results) {
                playerObject = results[0].object;
            }).then(function(results) {
                    
                query.equalTo('Player', playerObject);

                if (typeof team !== 'undefined') 
                   query.equalTo('Team', team);
                    
                var joined = [];

                query.include(['Team.Sport']);
                query.find().then(function(results) {
                   
                   for (var i = 0; i < results.length; i++) { 
                        var object = results[i];

                        joined.push({
                            sport : object.get('Team').get('Sport').get('Sport'),
                            season : object.get('Team').get('Sport').get('season'),
                            url : object.get('Team').get('Sport').get('URL'),
                            object : object
                        });
                    }   
                    callback(joined);
                    promise.resolve();

                }, function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                    promise.reject();
                });
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

        completedGames: function completedGames(sport, college, callback) {
            
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

            query.equalTo('Completed', true);
            query.doesNotExist('Score1');
            query.doesNotExist('Score1');

            query.descending('Date');
            
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
                        sport : object.get('Sport'),
                        object : object
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

        updateGames: function updateGames() {

            var date = new Date;

            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.lessThan('Date', date);

            var updates = [];

            query.find().then(function(results) {
                for (var i = 0; i < results.length; i++)
                    updates.push(results[i]);
            }).then(function(results) {
                for (var i = 0; i < updates.length; i++) {
                    var object = updates[i];
                    
                    object.set('Completed', true);
                    object.save();    
                }
            });
        },

        editGame: function editGame(id, team1, team2, sport, date) {

            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('objectId', id.id); 

            query.first().then(function(results) {
                
                var object = results;
                
                if (typeof team1 == 'object')
                    object.set('Team1', team1.object);
                if (typeof team2 == 'object')
                    object.set('Team2', team2.object);
                if (typeof sport == 'object')
                    object.set('Sport', sport.object);

                object.set('Date', date);
                object.save(); 

                promise.resolve();   
            }, function(error) {
                alert("Error: " + error.message);
                promise.reject();
            });

            return promise;
        },


        deleteGame: function deleteGame(id) {

            var date = new Date;

            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('objectId', id.id); 

            query.first().then(function(results) {
                var object = results;

                object.destroy().then(function() {

                    parseClass = Parse.Object.extend('Attend');
                    query = new Parse.Query(parseClass);

                    query.equalTo('Game', id); 

                    query.first().then(function(results) {
                        var object = results;

                        object.destroy().then(function() {
                            promise.resolve()
                        }, function(error) {
                            promise.reject();
                        });
                    }, function(error) {
                        promise.reject();
                    });
                }, function(error) {
                    promise.reject();
                });    
            });

            return promise;
        },


        scoreGame: function scoreGame(id, score1, score2) {

            var parseClass = Parse.Object.extend('Game');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('objectId', id.id); 

            query.first().then(function(results) {                
                var object = results;

                if (typeof score1 == 'number')
                    object.set('Score1', score1);
                if (typeof score2 == 'number')
                    object.set('Score2', score2);

                var team1 = object.get('Team1');
                var team2 = object.get('Team2');
                var sport = object.get('Sport');

                var winner = 0;

                if (score1 > score2) {
                    object.set('Winner', team1);
                    winner = 1;
                }
                else if (score2 > score1) {
                    object.set('Winner', team2);
                    winner = 2;
                }

                object.save().then(function() {
                    console.log('updatingTeam1')
                    return ParseService.updateTeam(team1, sport, 1, winner);
                }).then(function() {
                    console.log('updatingTeam2')
                    return ParseService.updateTeam(team2, sport, 2, winner);
                });
                
                promise.resolve();   
            }, function(error) {
                alert("Error: " + error.message);
                promise.reject();
            });

            return promise;
        },

        updateTeam: function updateTeam(college, sport, number, winner) {

            var teamObject;
            var promise = new Parse.Promise();

            ParseService.getTeams(sport, college, function(results) {
                teamObject = results[0].object;
            }).then(function() {

                var parseClass = Parse.Object.extend('Team');
                var query = new Parse.Query(parseClass);

                query.equalTo('objectId', teamObject.id);

                query.first().then(function(results) {                
                    var object = results;
                    
                    var currTie = object.get('Tie');
                    var currWin = object.get('Win');
                    var currLoss = object.get('Loss');
                    var currPoints = object.get('Points');

                    if (winner == 0) {
                        object.set('Tie', currTie + 1);
                    }
                    else if (winner == number) {
                        object.set('Win', currWin + 1);
                        object.set('Points', currPoints + 10);
                    }
                    else {
                        object.set('Loss', currLoss + 1);
                    }

                    object.save().then(function() {
                        if(winner == 0) {
                            return ParseService.updateCollege(object.get('College'), 2);
                        }
                        else if(winner == number) {
                            return ParseService.updateCollege(object.get('College'), 10);
                        }
                    });

                    promise.resolve();

                }, function(error) {
                    alert("Error: " + error.message);
                    promise.reject();
                });
            });

            return promise;
        },

        updateCollege: function updateCollege(college, points) {

            var promise = new Parse.Promise();

            var parseClass = Parse.Object.extend('College');
            var query = new Parse.Query(parseClass);

            query.equalTo('objectId', college.id);

            query.first().then(function(results) {

                var object = results;
                var currPoints = object.get('Score');

                object.set('Score', currPoints + points);

                object.save();
                promise.resolve();
                    
            }, function(error) {
                alert("Error: " + error.message);
                promise.reject();
            });
            
            return promise;
        },


        attendGame: function attendGame(netid, game) {

            var promise = new Parse.Promise();

            var found = false;

            ParseService.getAttending(netid, game, function(results) {    
                if (results.length > 0)
                    found = true;
            }).then(function(results) {
                if (!found) {
                    var object = Parse.Object.extend('Attend');
                    var object = new object();

                    object.save({Player: netid,
                                Game: game,
                                Attended: false}
                    ).then(function(object) {
                        promise.resolve();
                    }, function(error) {
                        alert("Error: " + error.message);
                        promise.reject();
                    });
                }
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
                promise.reject();
            });
            
            return promise;
        },

        unattendGame: function unattendGame(netid, game) {

            var promise = new Parse.Promise();

            var found = false;
            var attending = [];

            ParseService.getAttending(netid, game, function(results) {    
                for (var i = 0; i < results.length; i++) {
                    attending.push(results[i].object);
                }
            }).then(function(results) {
                for (var i = 0; i < attending.length; i++) {
                    var object = attending[i];

                    object.destroy().then(function(object) {
                        }, function(error) {
                            alert("Error: " + error.message);
                            promise.reject();
                        });
                }
                promise.resolve();
                        
            }, function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
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

        addPerson: function addPerson(netid, name, collegeURL, year) {
            
            var parseClass = Parse.Object.extend('Player');
            var query = new Parse.Query(parseClass);

            var promise = new Parse.Promise();

            query.equalTo('netid', netid);
            
            var collegeObject;
            var found = false;

            query.find().then(function(results) {
                if (results.length > 0)
                    found = true;
            }, function(error) {
                proimse.reject();
                alert('Error: ' + error.code + ' ' + error.message);
            }).then(function(results) {
                if (!found) {
                    ParseService.getColleges(collegeURL, function(results) {
                        collegeObject = results[0].object;
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

        joinTeam: function joinTeam(netid, college, sport) {

            var promise = new Parse.Promise();
            
            var teamObject;
            var playerObject;
            var found = false;

            ParseService.getTeams(sport, college, function(results) {
                teamObject = results[0].object;
            }).then(function(results) {

                ParseService.getJoined(netid, teamObject, function(results) {
                    if (results.length <= 0)
                        found = true;
                }).then(function(results) {
                    if (found) {
                        ParseService.getPlayers(netid, function(results) {
                            playerObject = results[0].object;
                        }).then(function(results) {
                            
                            var parseClass = new Parse.Object.extend('Joined');
                            var object = new parseClass();

                            object.save({Player: playerObject,
                                        Team: teamObject}
                            ).then(function(object) {
                                promise.resolve();
                            }, function(error) {
                                alert("Error: " + error.message);
                                promise.reject();
                            });
                        }, function(error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                            promise.reject();
                        });
                    }
                });
            });

            return promise;
        },

        leaveTeam: function leaveTeam(netid, college, sport) {

            var promise = new Parse.Promise();
            
            var teamObject;
            var playerObject;

            var joined = [];

            ParseService.getTeams(sport, college, function(results) {
                teamObject = results[0].object;
            }).then(function(results) {

                ParseService.getJoined(netid, teamObject, function(results) {
                    for (var i = 0; i < results.length; i++) {
                        joined.push(results[i].object);
                    }
                }).then(function(results) {
                    
                    for (var i = 0; i < joined.length; i++) {
                        var object = joined[i];

                        object.destroy().then(function(object) {
                            promise.resolve();
                        }, function(error) {
                            alert("Error: " + error.message);
                            promise.reject();
                        })
                    }  
                }, function(error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                    promise.reject();
                });
            });

            return promise;
        }
    };

    return ParseService;
});