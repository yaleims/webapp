'use strict';

angular.module('yaleImsApp')
  .controller('CollegeCtrl', ['$scope', 'ParseService', '$routeParams', function ($scope, ParseService, $routeParams) {

        // Get the data from the url
        var college = $routeParams.college;
        var sport = $routeParams.sport;

        $scope.collegeURL = college;
        $scope.sportURL = sport;

        ParseService.getCollegeFromUrl(college, function(collegeName) {
            college = collegeName;
            $scope.collegeName = collegeName;

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
                        $scope.upcomingGames = results;
                    })
                }, sport, college, false);
            });
        });
}]);
