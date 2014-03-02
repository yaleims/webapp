'use strict';

angular.module('yaleImsApp')
	.controller('LeaderboardCtrl', function ($scope, ParseService) {
  
	ParseService.getColleges(function(results) {
      $scope.$apply(function() {
        $scope.colleges = results;
      })
    });
});
