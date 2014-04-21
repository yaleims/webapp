'use strict';

angular.module('yaleImsApp')
  .controller('PlayerProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'Student', 'ParseService', 'TeamsService', function ($scope, $rootScope, $stateParams, Student, ParseService, TeamsService) {
    
  	// Student logged in
    $scope.student = $rootScope.student;
    
    // Player being viewed
    var netid = $stateParams.player;
    ParseService.getPlayers(netid, function(results){
    	$scope.$apply(function() {
    		$scope.player = results[0];
    		console.log($scope.player);
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
