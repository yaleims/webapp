'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$modal', 'Student', 'ParseService', 'TeamsService', function ($scope, $rootScope, $modal, Student, ParseService, TeamsService) {
    $scope.me = true;
    $scope.student = $rootScope.student;
    var netid = $rootScope.student.id;

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

    var playerObject;
    
	ParseService.getPlayers(netid, function(results) {
        playerObject = results[0].object;
	}).then(function() {
       	ParseService.getRSVPGames(playerObject, true, function(results) {
       		$scope.$apply(function() {
       			$scope.pastGames = results;
       		});
       	});

       	ParseService.getRSVPGames(playerObject, false, function(results) {
       		$scope.$apply(function() {
       			$scope.upcomingGames = results;
             	console.log(results);
        	});
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

    $scope.toggleModal = function() {
    	 var modalInstance = $modal.open({
	      templateUrl: 'templates/profileModalContent.html',
	      controller: ['$scope', '$rootScope',  '$modalInstance', 'allTeams', function ($scope, $rootScope, $modalInstance, allTeams) {
	      	$scope.student = $rootScope.student;
			$scope.allTeams = allTeams;
			// console.log($scope.allTeams);

			$scope.close = function () {
				$modalInstance.close();
			};

	      }],
	      resolve: {
	        allTeams: function () {
	          return $scope.allTeams;
	        }
	      }
	    });

	    modalInstance.result.then(function () {
	    	console.log("CLOSED");
	    	$scope.requeryTeams();
	    });
    };

    
  }]);
