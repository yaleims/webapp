'use strict';

angular.module('yaleImsApp')
  .controller('SportCtrl', ['$scope', 'ParseService', '$routeParams', function ($scope, ParseService, $routeParams) {


        var sportURL = $routeParams.sport;
        alert(sportURL);

        ParseService.getSportsBySeason(function(results) {
            $scope.$apply(function() {
                $scope.allSports = results;
            })
        });
        
        ParseService.getSportObjects(sportURL, function(results){
            var sport;
            $scope.$apply(function() {
                sport = results[0];
                $scope.sportName = results[0].get('Sport');
            })

            ParseService.getTeams(function(results) {
                $scope.$apply(function() {
                    $scope.teams = results;
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
