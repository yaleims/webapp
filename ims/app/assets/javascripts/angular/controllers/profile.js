'use strict';

angular.module('yaleImsApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.playerTeams = [{sport: "Coed Badminton", sporturl: "coed-badminton"}, {sport: "Coed Swimming", sporturl: "coed-swimming"}];
    $scope.playerName = "Nicholas Gonzalez";
        $scope.playerCollege = "Morse";
        $scope.playerYear = 2015;
  });
