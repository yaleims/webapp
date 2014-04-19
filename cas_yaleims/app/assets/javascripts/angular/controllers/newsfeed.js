'use strict';

angular.module('yaleImsApp')
  .controller('NewsfeedCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

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
          $scope.upcomingGames = results;
        })
    });
}]);
