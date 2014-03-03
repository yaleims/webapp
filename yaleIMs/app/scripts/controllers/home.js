'use strict';

angular.module('yaleImsApp')
  .controller('HomeCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {
    ParseService.getColleges(function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

    ParseService.getPlayers(function(results) {
        $scope.$apply(function() {
            $scope.players = results;
        })
    });
}]);
