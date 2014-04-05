'use strict';

angular.module('yaleImsApp')
  .controller('CollegeCtrl', ['$scope', 'ParseService', '$routeParams', function ($scope, ParseService, $routeParams) {

        // Get the data from the url
        var college = $routeParams.college;
        var sport = $routeParams.sport;

        $scope.collegeURL = college;
        $scope.sportURL = sport;

        $scope.updateSchedule = function (sportName, sportUrl)
        {
            console.log(sportName);
            $scope.sportURL = sportUrl;
            $scope.sportName = sportName;
            sport = sportName;

            ParseService.getSports(function(results) {
                $scope.$apply(function() {
                    $scope.sportWins = results[0].win;
                    $scope.sportLosses = results[0].loss;
                    $scope.sportTyngPoints = results[0].points;
                    console.log(results);
                });
            }, sport, college);
        }

        ParseService.getAllSports(function(results) {
            $scope.allSports = results;
        });

        ParseService.getCollegeFromUrl(college, function(results) {
            college = results[0].collegeName;
            $scope.totalTyngPoints = results[0].totalTyngPoints;
            $scope.collegeName = results[0].collegeName;

            ParseService.getGames(function(results) {
                $scope.$apply(function() {
                    $scope.pastGames = results;
                    console.log(results);
                })
            }, undefined, college, true);

            ParseService.getGames(function(results) {
                $scope.$apply(function() {
                    $scope.upcomingGames = results;
                })
            }, undefined, college, false);
        });
}]);
