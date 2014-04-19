'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$modal', 'Student', 'ParseService', function ($scope, $rootScope, $modal, Student, ParseService) {
    $scope.student = $rootScope.student;

    ParseService.getSportsBySeason(function(results) {
        $scope.$apply(function() {
            $scope.allTeams = results;
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
