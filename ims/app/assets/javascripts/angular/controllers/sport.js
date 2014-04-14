'use strict';

angular.module('yaleImsApp')
  .controller('SportCtrl', ['$scope', 'ParseService', '$stateParams', function ($scope, ParseService, $stateParams) {

        var sportURL = $stateParams.sport;

        ParseService.getSportsBySeason(function(results) {
            $scope.$apply(function() {
                $scope.allSports = results;
            })
        });
}]);
