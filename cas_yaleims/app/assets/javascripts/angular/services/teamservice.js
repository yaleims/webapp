'use strict';

angular.module('yaleImsApp')
	.factory('TeamsService', ['ParseService', function(ParseService) {
 
  	var TeamsService = {
        joinTeam: function(netid, college, sport) {

            var sportObject;
            var collegeObject;

            ParseService.getSportObjects(sport, false, function(results) {
                sportObject = results[0];
            }).then(function(results) {

                ParseService.getCollegeObjects(college, function(results) {
                    collegeObject = results[0];
                }).then(function(results) {
            
                    ParseService.joinTeam(netid, college, teamid);
                    console.log('Player: ' + netid + ' joined team: ' + college + ' ' + teamid);
                });
            });
        },

        leaveTeam: function(netid, college, teamid) {
            // Parse service
            console.log('Player: ' + netid + ' left team: ' + college + ' ' + teamid);
        },

        joinedTeams: function(netid) {
            return ['b-hoops'];
        },

        allTeamsWithJoined: function(netid) 
        {
            // return 
        }

    };
    return TeamsService;
}]);