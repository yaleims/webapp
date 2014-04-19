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
        
        ParseService.getSports(sportURL, function(results){
            var sport;
            $scope.$apply(function() {
                sport = results[0].object;
                if(sport)
                    $scope.sportName = results[0].sport;
            })

            ParseService.getTeams(sport, undefined, function(results) {
                $scope.$apply(function() {
                    $scope.teams = results;
                })
            });

            ParseService.getGames(sport, undefined, true, function(results) {
                $scope.$apply(function() {
                    $scope.pastGames = results;
                })
            });

            ParseService.getGames(sport, undefined, false, function(results) {
                $scope.$apply(function() {
                    for(var game in results)
                    {
                        if(results[game].team1.get('URL') == $rootScope.student.collegeurl 
                            || results[game].team2.get('URL') == $rootScope.student.collegeurl) {
                            results[game].showrsvp = true;
                        }
                        else {
                            results[game].showrsvp = false;
                        }
                    }
                    $scope.upcomingGames = results;
                })
            });
      });
}]);
