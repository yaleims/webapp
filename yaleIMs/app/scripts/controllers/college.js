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
            $scope.sportURL = sportUrl;
            $scope.sportName = sportName;
            
            ParseService.getSportFromUrl(sportUrl, function(results) {
                $scope.$apply(function() {
                    sport = results[0];
                })
            
                ParseService.getTeams(function(results) {
                    $scope.$apply(function() {
                        $scope.sportWins = results[0].team.get('Win');
                        $scope.sportLosses = results[0].team.get('Loss');
                        $scope.sportTyngPoints = results[0].team.get('Points');
                        console.log(results);
                    });
                }, sport, college);
            });
        }

        ParseService.getAllSports(function(results) {
            $scope.allSports = results;
        });

        ParseService.getCollegeFromUrl(college, function(results) {
            college = results[0];
            $scope.totalTyngPoints = results[0].get('Score');
            $scope.collegeName = results[0].get('College');

     

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
