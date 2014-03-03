'use strict';

angular.module('yaleImsApp')
  .controller('SportCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

  ParseService.getSports('Coed Water Polo', function(results) {
      $scope.$apply(function() {
          $scope.sports = results;
      })
  });
}]);
