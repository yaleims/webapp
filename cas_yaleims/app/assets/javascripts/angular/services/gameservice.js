'use strict';

angular.module('yaleImsApp')
	.factory('GamesService', ['ParseService', function(ParseService) {
 
  	var GamesService = {
        addGame: function(team1, team2, sport, datetime) {
            return ParseService.addGame(team1.object, team2.object, sport.object, datetime);
        },

        editGame: function(gameid, team1, team2, sport, datetime) {
            return ParseService.editGame(gameid, team1, team2, sport, datetime);
        },

        scoreGame: function(gameid, score1, score2) {
            return ParseService.scoreGame(gameid, score1, score2);
        },

        deleteGame: function(gameid) {
            // Parse service
            console.log('Deleted this motherfucker: ' + id);
        },

        attendGame: function(netid, gameid) {
            
            var playerObject;
            var gameObject;

            ParseService.getGameById(gameid, function(results) {
                gameObject = results[0];
            }).then(function(results) {
                ParseService.getPlayers(netid, function(results) {
                    playerObject = results[0].object;
                }).then(function(results) {
                    ParseService.attendGame(playerObject, gameObject);
                    console.log('User: ' + netid + ' is attending: ' + gameid);   
                });
            });
        },

        unattendGame: function(netid, gameid) {
                   
            var playerObject;
            var gameObject;

            ParseService.getGameById(gameid, function(results) {
                gameObject = results[0];
            }).then(function(results) {
                ParseService.getPlayers(netid, function(results) {
                    playerObject = results[0].object;
                }).then(function(results) {
                    ParseService.unattendGame(playerObject, gameObject);
                    console.log('User: ' + netid + ' no longer attending: ' + gameid);   
                });
            });
        },

        getGamesAttended: function(netid, college, sport, callback) {

            var playerObject;
            var collegeObject;
            var sportObject;

            var upcoming = [];
            var attend = [];

            ParseService.getPlayers(netid, function(results) {
                playerObject = results[0].object;
            }).then(function() {
                return ParseService.getColleges(college, function(results) {
                    if (typeof college !== 'undefined')  
                        collegeObject = results[0].object;
                    console.log(collegeObject);
                })
            }).then(function() {
                return ParseService.getSports(sportObject, function(results) {
                    if (typeof sport !== 'undefined')
                        sportObject = results[0].object;
                    console.log(sportObject);
                });  
            }).then(function() {
                return ParseService.getGames(sportObject, collegeObject, false, function(results) {
                    upcoming = results;
                    console.log(upcoming);
                });
            }).then(function() {
                return ParseService.getAttending(playerObject, undefined, function(results) {
                    attend = results; 
                    console.log(attend);
                });
            }).then(function() {                             
                console.log(upcoming)  
                for (var i = 0; i < upcoming.length; i++) {
//                    upcoming[i].penis = false;
                    for (var j = 0; j < attend.length; j++) {
                        if (upcoming[i].object == attend[j].game.object) {
                            //upcoming[i].penis = true;
                        }
                    }
                }
                console.log('Upcoming')
                console.log(upcoming)
                callback(upcoming);
            });
        }
    };
    return GamesService;
}]);