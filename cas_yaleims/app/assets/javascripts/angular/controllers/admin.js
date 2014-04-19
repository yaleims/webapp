'use strict';

angular.module('yaleImsApp')
  .controller('AdminCtrl', ['$scope', 'ParseService', '$rootScope', function ($scope, ParseService, $rootScope) {
    
    // ************************************************
    // *********** Special Admin Menu Bar *************
    // ************************************************
    $rootScope.adminPage = true;
    
    $scope.$on('$stateChangeStart', function ()
    {
        $rootScope.adminPage = false;
    });

    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    // ************************************************
    // *************  Parse Integration  **************
    // ************************************************
    ParseService.getSportsBySeason(function(results) {
        $scope.allSports = results;
    });

    ParseService.getSports(undefined, function(results) {
        $scope.$apply(function() {
            $scope.sportObjects = results;
        })
    });

    ParseService.getColleges(undefined, function(results) {
        $scope.$apply(function() {
            $scope.collegeObjects = results;
        })
    });

   	ParseService.getGames(undefined, undefined, true, function(results) {
        $scope.$apply(function() {
          $scope.pastGames = results;
      	})
  	});

  	$scope.getGames = function() {
	 	 ParseService.getGames(undefined, undefined, false, function(results) {
	        $scope.$apply(function() {
	          $scope.upcomingGames = results;
	        })
	    });
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
