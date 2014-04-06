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
    
    ParseService.getSportsBySeason(function(results) {
        $scope.$apply(function() {
            $scope.allSports = results;
        })
    });

    ParseService.getSportObjects(undefined, function(results) {
        $scope.$apply(function() {
            $scope.sportObjects = results;
            console.log($scope.sportObjects);
        })
    });

    ParseService.getCollegeObjects(undefined, function(results) {
        $scope.$apply(function() {
            $scope.collegeObjects = results;
        })
    });

    $scope.addGames = function() {
        ParseService.addGame($scope.formTeam1, $scope.formTeam2, $scope.formSport, function() {
        });
    }
}]);
