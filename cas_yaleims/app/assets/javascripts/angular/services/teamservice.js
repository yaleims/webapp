'use strict';

angular.module('yaleImsApp')
	.factory('TeamsService', ['ParseService', function(ParseService) {
 
  	var TeamsService = {
        joinTeam: function(netid, college, sport) {
            
            var sportObject;
            var collegeObject;

            ParseService.getSports(sport, function(results) {
                sportObject = results[0].object;
            }).then(function(results) {

                ParseService.getColleges(college, function(results) {
                    collegeObject = results[0].object;
                }).then(function(results) {

                    ParseService.joinTeam(netid, collegeObject, sportObject);
                    console.log('Player: ' + netid + ' joined team: ' + college + ' ' + sport);
                });
            });
        },

        leaveTeam: function(netid, college, sport) {
             
            var sportObject;
            var collegeObject;

            ParseService.getSports(sport, function(results) {
                sportObject = results[0].object;
            }).then(function(results) {

                ParseService.getColleges(college, function(results) {
                    collegeObject = results[0].object;
                }).then(function(results) {

                    ParseService.leaveTeam(netid, collegeObject, sportObject);
                    console.log('Player: ' + netid + ' left team: ' + college + ' ' + sport);
                });
            });
        },

        joinedTeams: function(netid, callback) {
            
            ParseService.getJoined(netid, undefined, function(results) {
                callback(results);
            });
        },
    };
    return TeamsService;
}]);