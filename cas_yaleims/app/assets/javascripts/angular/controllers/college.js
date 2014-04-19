'use strict';

angular.module('yaleImsApp')
  .controller('CollegeCtrl', ['$scope', 'ParseService', '$stateParams', function ($scope, ParseService, $stateParams) {

        // Get the data from the url
        var college = $stateParams.college;
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
                    console.log(results);
                })
            });

            ParseService.getGames(undefined, college, false, function(results) {
                $scope.$apply(function() {
                    $scope.upcomingGames = results;
                })
            });
        });
}]);
