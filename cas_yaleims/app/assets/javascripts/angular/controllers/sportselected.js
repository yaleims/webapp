'use strict';

angular.module('yaleImsApp')
  .controller('SportSelectedCtrl', ['$scope', '$rootScope', 'TeamsService', 'ParseService', '$stateParams', function ($scope, $rootScope, TeamsService, ParseService, $stateParams) {

        $scope.student = $rootScope.student;
        var sportURL = $stateParams.sport;
        $scope.sportURL = sportURL;

        $scope.onTeam = false;

        var joinedTeams = TeamsService.joinedTeams();
        for (var i in joinedTeams)
        {
            if(sportURL == joinedTeams[i])
                $scope.onTeam = true;
            console.log(sportURL, joinedTeams[i]);
        }


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
