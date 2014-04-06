'use strict';

angular.module('yaleImsApp')
  .controller('AdminCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {
        
    ParseService.getSportObjects(undefined, function(results) {
        $scope.$apply(function() {
            $scope.sportObjects = results;
            console.log($scope.sportObjects);
        })
    });

    ParseService.getCollegeObjects(undefined, function(results) {
        $scope.$apply(function() {
            $scope.collegeObjects = results;
        })
    });

   	ParseService.getGames(function(results) {
        $scope.$apply(function() {
          $scope.pastGames = results;
      	})
  	}, undefined, undefined, true);

  	$scope.getGames = function() {
	 	 ParseService.getGames(function(results) {
	        $scope.$apply(function() {
	          $scope.upcomingGames = results;
	        })
	    }, undefined, undefined, false);
 	}

    $scope.addGames = function() {
    	var dateString = $scope.gameDate + ' ' + $scope.gameTime;
    	var gameDate = new Date(dateString);

    	ParseService.addGame($scope.formTeam1, $scope.formTeam2, $scope.formSport, gameDate, function(results) {
    		$scope.getGames();
    	});
    	$scope.formTeam1 = "";
    	$scope.formTeam2 = ""
    	$scope.gameDate = "";
    	$scope.gameTime = "";
    	$scope.formSport = "";
    	}
  }]);
