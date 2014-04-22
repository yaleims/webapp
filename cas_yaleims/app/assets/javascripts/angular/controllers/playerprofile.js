'use strict';

angular.module('yaleImsApp')
  .controller('PlayerProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'Student', 'ParseService', 'GamesService', 'TeamsService', function ($scope, $rootScope, $stateParams, Student, ParseService, GamesService, TeamsService) {
    
  	// Student logged in
    $scope.student = $rootScope.student;
    
    // Player being viewed
    var netid = $stateParams.player;
    ParseService.getPlayers(netid, function(results){
    	$scope.$apply(function() {
    		$scope.player = results[0];
    		var fullName = results[0].name.split(" ");
    		$scope.player.fname = fullName[0];
    		console.log($scope.player);
    	});
    });

    GamesService.getGamesAttending(netid, undefined, undefined, function(results) {
	
	    	var college = $scope.player.college;

	    	$scope.$apply(function() {
	    		console.log("RESULTS");
	    		console.log(results);
	    		results[game].winner.get('College')
	    		for (var game in results) {
	                if (typeof results[game].winner == 'undefined')
	                    results[game].outcome = 'T';
	                else if (results[game].winner.get('College') == college)
	                    results[game].outcome = 'W';
	                else {
	                    results[game].outcome = 'L';
	                }
	            }
	       		$scope.pastGames = results;
	       	});
    });

    GamesService.getGamesAttended(netid, undefined, undefined, function(results) {
       	$scope.$apply(function() {

       		$scope.upcomingGames = results;
       	});
    });

    ParseService.getSportsBySeason(function(results) {
        TeamsService.joinedTeams(netid, function(joinedTeams) {
	        $scope.$apply(function() {
	            $scope.playerTeams = joinedTeams;
	            for(var i = 0; i < results.length; i++) {
	            	for(var j = 0; j < results[i].sport.length; j++) {
	            		results[i].sport[j].joined = false;
	            		for(var k = 0; k < joinedTeams.length; k++) {
	            			if(results[i].sport[j].get('URL') == joinedTeams[k].url) {
	            				results[i].sport[j].join = true;
	            			}
	            		}
	            	}
	            }
			    $scope.allTeams = results;
	        })
	    });
    });

    $scope.requeryTeams = function () {
    	ParseService.getSportsBySeason(function(results) {
	        TeamsService.joinedTeams(netid, function(joinedTeams) {
		        $scope.$apply(function() {
		            $scope.playerTeams = joinedTeams;
		            for(var i = 0; i < results.length; i++) {
		            	for(var j = 0; j < results[i].sport.length; j++) {
		            		results[i].sport[j].joined = false;
		            		for(var k = 0; k < joinedTeams.length; k++) {
		            			if(results[i].sport[j].get('URL') == joinedTeams[k].url) {
		            				results[i].sport[j].join = true;
		            			}
		            		}
		            	}
		            }
				    $scope.allTeams = results;
		        })
		    });
	    });
	    console.log("Requery");
    };
    
  }]);
