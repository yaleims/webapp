'use strict';

angular.module('yaleImsApp')
  .controller('CollegeCtrl', ['$scope', '$rootScope', 'ParseService', 'GamesService', '$stateParams', function ($scope, $rootScope, ParseService, GamesService, $stateParams) {

        // Get the data from the url
        var college = $stateParams.college;
        var netid = $rootScope.student.id;
        var sport = "";
        if($stateParams.sport)
            sport = $stateParams.sport;

        $scope.collegeURL = college;
        $scope.sportURL = sport;

        $scope.updateSchedule = function (sportName, sportUrl)
        {
            $scope.sportURL = sportUrl;
            $scope.sportName = sportName;
            
            ParseService.getSports(sportUrl, function(results) {
                $scope.$apply(function() {
                    sport = results[0].object;
                })
            
                ParseService.getTeams(sport, college, function(results) {
                    $scope.$apply(function() {
                        $scope.sportWins = results[0].win;
                        $scope.sportLosses = results[0].loss;
                        $scope.sportTyngPoints = results[0].points;
                        console.log(results);
                    });
                });
            });
        }

        GamesService.getGamesAttended(netid, college, sport, function(results) {
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
        })

        ParseService.getSportsBySeason(function(results) {
            $scope.allSports = results;
        });

        ParseService.getColleges(college, function(results) {
            college = results[0].object;
            $scope.totalTyngPoints = results[0].score;
            $scope.collegeName = results[0].college;

            ParseService.getGames(undefined, college, true, function(results) {
                $scope.$apply(function() {
                    $scope.pastGames = results;
                    // console.log(results);
                })
            });
        });
}]);
