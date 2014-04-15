'use strict';

angular.module('yaleImsApp')
  .controller('SportSelectedCtrl', ['$scope', 'ParseService', '$stateParams', function ($scope, ParseService, $stateParams) {

        var sportURL = $stateParams.sport;
        console.log(sportURL);
        
        ParseService.getSportObjects(sportURL, false, function(results){
            var sport;
            $scope.$apply(function() {
                sport = results[0];
                if(sport)
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
