'use strict';

angular.module('yaleImsApp')
  .controller('NewsfeedCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

    ParseService.getColleges(function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

	 ParseService.getGames(function(results) {
        $scope.$apply(function() {
          $scope.pastGames = results;
      	})
  	}, undefined, undefined, true);

  ParseService.getGames(function(results) {
        $scope.$apply(function() {
          $scope.upcomingGames = results;
        })
    }, undefined, undefined, false);

    /*$scope.addGames = function() {
      
      ParseService.getCollegeId($scope.formTeam1.name, function(results) {
        var team1 = results;
        ParseService.getCollegeId($scope.formTeam2.name, function(results) {
          var team2 = results;
          ParseService.getSportId($scope.formSport, function(results) {
            var sport = results;
            ParseService.addGame(team1, team2, sport, function() {
            });
          });
        });
      });
  }*/
}]);
