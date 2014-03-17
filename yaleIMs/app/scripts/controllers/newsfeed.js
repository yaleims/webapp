'use strict';

angular.module('yaleImsApp')
  .controller('NewsfeedCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

    ParseService.getColleges(function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

	ParseService.getGames(function(results) {
      	$scope.$apply(function() {
        $scope.pastGames = results;
      	})
  	}, undefined, undefined, true);
}]);
