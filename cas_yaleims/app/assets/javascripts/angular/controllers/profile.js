'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', ['$scope', 'Student', function ($scope, Student) {
    Student.get(function(response) {
    	$scope.student = response.person;
    	console.log(response.person);
    });

    // $scope.playerTeams = [{sport: "Coed Badminton", sporturl: "coed-badminton"}, {sport: "Coed Swimming", sporturl: "coed-swimming"}];
    // $scope.playerName = "Nicholas Gonzalez";
    //     $scope.playerCollege = "Morse";
    //     $scope.playerYear = 2015;
  }]);
