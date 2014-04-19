'use strict';

angular.module('yaleImsApp')
  .controller('HomeCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {
    
    ParseService.getColleges(undefined, function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

    ParseService.getGames(undefined, undefined, false, function(results) {
        $scope.$apply(function() {
            $scope.upcomingGames = results;
        })
    });
    
    ParseService.getPlayers(undefined, function(results) {
        $scope.$apply(function() {
            $scope.players = results;
        })
    });
    
    ParseService.getSportsBySeason(function(results) {
        $scope.$apply(function() {
            $scope.allSports = results;
        })
    });
}]);
