'use strict';

angular.module('yaleImsApp')
  .controller('SportCtrl', ['$scope', 'ParseService', '$routeParams', function ($scope, ParseService, $routeParams) {


        ParseService.getAllSports(function(results) {
            $scope.allSports = results;
        });

        var sport = $routeParams.sport;
        ParseService.getSportFromUrl(sport, function(sportName){
            sport = sportName;
            $scope.sportName = sportName;

            ParseService.getSports(function(results) {
                $scope.$apply(function() {
                $scope.sports = results;
                })
            }, sport, undefined);

            ParseService.getGames(function(results) {
                $scope.$apply(function() {
                $scope.pastGames = results;
                })
            }, sport, undefined, true);

            ParseService.getGames(function(results) {
                $scope.$apply(function() {
                $scope.upcomingGames = results;
                })
            }, sport, undefined, false);
      });
}]);
