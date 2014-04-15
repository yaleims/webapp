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
            
            ParseService.getSportObjects(sportUrl, function(results) {
                $scope.$apply(function() {
                    sport = results[0];
                })
            
                ParseService.getTeams(function(results) {
                    $scope.$apply(function() {
                        $scope.sportWins = results[0].win;
                        $scope.sportLosses = results[0].loss;
                        $scope.sportTyngPoints = results[0].points;
                        console.log(results);
                    });
                }, sport, college);
            });
        }

        ParseService.getSportsBySeason(function(results) {
            $scope.allSports = results;
        });

        ParseService.getCollegeObjects(college, function(results) {
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