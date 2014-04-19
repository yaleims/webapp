'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', 'Student', 'TeamsService', function ($scope, $rootScope, Student, TeamsService) {
    $scope.student = $rootScope.student;

    $scope.teams = TeamsService.allTeamsWithJoined($scope.student.id);

    $scope.toggleModal = function() {
    	$scope.showModal = !$scope.showModal;
    };

    // $scope.playerTeams = [{sport: "Coed Badminton", sporturl: "coed-badminton"}, {sport: "Coed Swimming", sporturl: "coed-swimming"}];
    // $scope.playerName = "Nicholas Gonzalez";
    //     $scope.playerCollege = "Morse";
    //     $scope.playerYear = 2015;
  }]);
