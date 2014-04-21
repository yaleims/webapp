'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$modal', 'Student', 'ParseService', 'TeamsService', 'GamesService', function ($scope, $rootScope, $modal, Student, ParseService, TeamsService, GamesService) {
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

    GamesService.getGamesAttending(netid, undefined, undefined, function(results) {
    	$scope.$apply(function() {
       		$scope.pastGames = results;
       	});
    });

    GamesService.getGamesAttended(netid, undefined, undefined, function(results) {
       	$scope.$apply(function() {

       		$scope.upcomingGames = results;
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
