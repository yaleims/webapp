'use strict';

angular.module('yaleImsApp')
	.factory('TeamsService', ['ParseService', function(ParseService) {
 
  	var TeamsService = {
        joinTeam: function(netid, college, teamid) {
            // Parse service
            console.log('Player: ' + netid + ' joined team: ' + college + ' ' + teamid);
        },

        leaveTeam: function(netid, college, teamid) {
            // Parse service
            console.log('Player: ' + netid + ' left team: ' + college + ' ' + teamid);
        },

        joinedTeams: function(netid) {
            return ['b-hoops'];
        }

    };
    return TeamsService;
}]);