'use strict';

angular.module('yaleImsApp')
	.factory('GamesService', ['ParseService', function(ParseService) {
 
  	var GamesService = {
        addGame: function(team1, team2, sport, datetime) {
            // Parse service
            console.log('Added game');
        },

        editGame: function(gameid, team1, team2, sport, datetime) {
            // Parse service
            console.log('Editted game: ' + id);
        },

        deleteGame: function(gameid) {
            // Parse service
            console.log('Deleted this motherfucker: ' + id);
        },

        attendGame: function(netid, gameid) {
            // Parse service
            console.log('User: ' + netid + ' is attending: ' + gameid);
        },

        unattendGame: function(netid, gameid) {
            // Parse service
            console.log('User: ' + netid + ' is no longer attending: ' + gameid);
        }

    };
    return GamesService;
}]);