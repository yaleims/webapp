'use strict';

angular.module('yaleImsApp')
  .controller('CollegeCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

  	$scope.init = function(college, sport) {

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
    };
}]);
