'use strict';

angular.module('yaleImsApp')
	.factory('GamesService', ['ParseService', function(ParseService) {
 
  	var GamesService = {
        addGame: function(team1, team2, sport, datetime) {
            console.log(team1);
            console.log(team2);
            console.log(sport);
            console.log(datetime);
            ParseService.addGame(team1.object, team2.object, sport.object, datetime);
            console.log('Added game');
        },

        editGame: function(gameid, team1, team2, sport, datetime) {
            console.log(gameid);
            console.log(team1);
            console.log(team2);
            console.log(sport);
            console.log(datetime);
            ParseService.editGame(gameid, team1, team2, sport.object, datetime);
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
                return ParseService.getPlayers(netid, function(results) {
                    playerObject = results[0].object;
                });
            }).then(function(results) {
                ParseService.attendGame(playerObject, gameObject);
                console.log('User: ' + netid + ' is attending: ' + gameid);
            });
        },

        unattendGame: function(netid, gameid) {
                   
            var playerObject;
            var gameObject;

            ParseService.getGameById(gameid, function(results) {
                gameObject = results[0];
            }).then(function(results) {
                return ParseService.getPlayers(netid, function(results) {
                    playerObject = results[0].object;
                });
            }).then(function(results) {
                ParseService.unattendGame(playerObject, gameObject);
                    console.log('User: ' + netid + ' no longer attending: ' + gameid);   
            });
        },

        getGamesAttended: function(netid, sport, college, callback) {

            var playerObject;

            var upcoming = [];
            var attend = [];
            
            ParseService.getPlayers(netid, function(results) {
                playerObject = results[0].object;
            }).then(function() {
                return ParseService.getGames(sport, college, false, function(results) {
                    upcoming = results;
                });
            }).then(function() {
                return ParseService.getAttending(playerObject, undefined, function(results) {
                    attend = results; 
                });
            }).then(function() {                             
                console.log(upcoming)  
                for (var i = 0; i < upcoming.length; i++) {
                    upcoming[i].going = false;
                    for (var j = 0; j < attend.length; j++) {
                        if (upcoming[i].object.id == attend[j].game.object.id) {
                            console.log('Attending');
                            upcoming[i].going = true;
                        }
                    }
                }
                callback(upcoming);
            });
        }
    };
    return GamesService;
}]);