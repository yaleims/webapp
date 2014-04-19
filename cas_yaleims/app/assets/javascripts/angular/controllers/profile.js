'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$modal', 'Student', 'ParseService', 'TeamsService', function ($scope, $rootScope, $modal, Student, ParseService, TeamsService) {
    $scope.student = $rootScope.student;

    ParseService.getSportsBySeason(function(results) {
        $scope.$apply(function() {
            $scope.allTeams = results;
        })
    });


    TeamsService.joinedTeams($scope.student.id, function(results) {
        $scope.$apply(function() {
            $scope.playerTeams = results;
            console.log($scope.playerTeams);
        })
    });

    $scope.toggleModal = function() {
    	 var modalInstance = $modal.open({
	      templateUrl: 'templates/profileModalContent.html',
	      controller: ['$scope', '$rootScope',  '$modalInstance', 'allTeams', function ($scope, $rootScope, $modalInstance, allTeams) {
	      	$scope.student = $rootScope.student;
			$scope.allTeams = allTeams;

			$scope.close = function () {
				$modalInstance.close('closed');
			};

	      }],
	      resolve: {
	        allTeams: function () {
	          return $scope.allTeams;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      console.log('Closed Modal')
	    });
    };

    
  }]);
