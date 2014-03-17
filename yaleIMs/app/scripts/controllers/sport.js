'use strict';

angular.module('yaleImsApp')
  .controller('SportCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

	$scope.init = function(sport) {

    	ParseService.getSports(sport, function(results) {
      		$scope.$apply(function() {
        	$scope.sports = results;
      		})
  		});

  		ParseService.getGames(function(results) {
      		$scope.$apply(function() {
          	$scope.pastGames = results;
      		})
  		}, sport, undefined, true);

  		ParseService.getGames(function(results) {
      		$scope.$apply(function() {
          	$scope.upcomingGames = results;
      		})
  		}, sport, undefined, false);
    };
}]);
