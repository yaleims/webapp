'use strict';

angular.module('yaleImsApp')
  .controller('AdminCtrl', ['$scope', 'ParseService', '$rootScope', function ($scope, ParseService, $rootScope) {
    $rootScope.adminPage = true;

        $scope.$on('$locationChangeStart', function ()
        {
            $rootScope.adminPage = false;
        });

    var showDashboard = true;
    var showScore = false;
    var showSchedule = false;
    var showTeam =  false;

    $scope.dashboard = function(){
       showDashboard = true;
       showScore = false;
       showSchedule = false;
       showTeam = false;
    }   
    $scope.score = function(){
       showDashboard = false;
       showScore = true;
       showSchedule = false;
       showTeam = false;
    }
    $scope.schedule = function(){
       showDashboard = false;
       showScore = false;
       showSchedule = true;
       showTeam = false;
    }
    $scope.team = function(){
       showDashboard = false;
       showScore = false;
       showSchedule = false;
       showTeam = true;
    }

    $scope.showDashboard = function(){
       return showDashboard;
    }
    $scope.showScore = function(){
       return showScore;
    }
    $scope.showSchedule = function(){
       return showSchedule;
    }
    $scope.showTeam = function(){
       return showTeam;
    }

    ParseService.getSportsBySeason(function(results) {
        $scope.allSports = results;
    });

    ParseService.getSportObjects(undefined, true, function(results) {
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
