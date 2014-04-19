'use strict';

angular.module('yaleImsApp')
  .controller('NewsfeedCtrl', ['$scope', '$rootScope', 'ParseService', function ($scope, $rootScope, ParseService) {

    ParseService.getColleges(undefined, function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

	 ParseService.getGames(undefined, undefined, true, function(results) {
        $scope.$apply(function() {
          $scope.pastGames = results;
      	})
  	});

  ParseService.getGames(undefined, undefined, false, function(results) {
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
}]);
