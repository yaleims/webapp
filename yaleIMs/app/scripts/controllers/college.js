'use strict';

angular.module('yaleImsApp')
  .controller('CollegeCtrl', ['$scope', 'ParseService', '$routeParams', function ($scope, ParseService, $routeParams) {

        // Get the data from the url
        var college = $routeParams.college;
        var sport = $routeParams.sport;

        $scope.collegeURL = college;
        $scope.sportURL = sport;

        ParseService.getAllSports(function(results) {
            $scope.allSports = results;
        });

        ParseService.getCollegeFromUrl(college, function(results) {
            college = results[0].collegeName;
            $scope.totalTyngPoints = results[0].totalTyngPoints;
            $scope.collegeName = results[0].collegeName;

            ParseService.getSportFromUrl(sport, function(sportName){
                sport = sportName;
                $scope.sportName = sportName;

                ParseService.getGames(function(results) {
                    $scope.$apply(function() {
                        $scope.pastGames = results;
                    })
                }, sport, college, true);

                ParseService.getGames(function(results) {
                    $scope.$apply(function() {
                        $scope.pastGames = results;
                    })
                }, sport, college, true);

                ParseService.getGames(function(results) {
                    $scope.$apply(function() {
                        $scope.upcomingGames = results;
                    })
                }, sport, college, false);
            });
        });
}]);
