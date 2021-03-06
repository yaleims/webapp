'use strict';

angular.module('yaleImsApp')
	.controller('LeaderboardCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {
  
	ParseService.getColleges(undefined, function(results) {
      $scope.$apply(function() {
        $scope.colleges = results;
      })
    });

    ParseService.getPlayers(undefined, function(results) {
      $scope.$apply(function() {
        $scope.players = results;
      })
    });
}]);