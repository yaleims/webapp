'use strict';

angular.module('yaleImsApp')
  .controller('SportSelectedCtrl', ['$scope', '$rootScope', 'ParseService', '$stateParams', function ($scope, $rootScope, ParseService, $stateParams) {

        $scope.student = $rootScope.student;
        var sportURL = $stateParams.sport;
        $scope.onTeam = false;

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
