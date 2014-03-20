'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.playerTeams = [{sport: "Badminton", sporturl: "badminton"}, {sport: "Swimming", sporturl: "swimming"}];
    $scope.playerName = "Nicholas Gonzalez";
        $scope.playerCollege = "Morse";
        $scope.playerYear = 2015;
  });
