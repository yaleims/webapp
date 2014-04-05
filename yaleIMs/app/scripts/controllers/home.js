'use strict';

angular.module('yaleImsApp')
  .controller('HomeCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {
    ParseService.getColleges(function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

    ParseService.getGames(function(results) {
        $scope.$apply(function() {
            $scope.upcomingGames = results;
        })
    }, undefined, undefined, false);

    ParseService.getPlayers(function(results) {
        $scope.$apply(function() {
            $scope.players = results;
        })
    });

    ParseService.getAllSports(function(results) {
        $scope.allSports = results;
    });
}]);
