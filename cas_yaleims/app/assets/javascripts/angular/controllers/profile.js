'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', '$modal', 'Student', 'TeamsService', function ($scope, $rootScope, $modal, Student, TeamsService) {
    $scope.student = $rootScope.student;

    $scope.teams = TeamsService.allTeamsWithJoined($scope.student.id);

    $scope.toggleModal = function() {
    	$scope.showModal = !$scope.showModal;
    };

    
  }]);
