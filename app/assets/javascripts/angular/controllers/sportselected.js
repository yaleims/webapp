'use strict';

angular.module('yaleImsApp')
  .controller('SportSelectedCtrl', ['$scope', '$rootScope', 'TeamsService', 'ParseService', 'GamesService', '$stateParams', function ($scope, $rootScope, TeamsService, ParseService, GamesService, $stateParams) {

        $scope.student = $rootScope.student;
        var netid = $rootScope.student.id;
        var sportURL = $stateParams.sport;
        $scope.sportURL = sportURL;

        $scope.onTeam = false;

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

           GamesService.getGamesAttended(netid, sport, undefined, function(results) {
                $scope.$apply(function() {
                            // console.log(results);
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
                  console.log(results);
                })
            });

           TeamsService.joinedTeams($rootScope.student.id, function(results) {
                $scope.$apply(function() {
                    for (var i = 0; i < results.length; i++) {
                        if(sportURL == results[i].url)
                        $scope.onTeam = true;
                    }   
                });
            });
      });
}]);
