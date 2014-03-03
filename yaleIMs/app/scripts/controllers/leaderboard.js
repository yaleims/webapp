'use strict';

angular.module('yaleImsApp')
	.controller('LeaderboardCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {
  
	ParseService.getColleges(function(results) {
      $scope.$apply(function() {
        $scope.colleges = results;
      })
    });
}]);