'use strict';

angular.module('yaleImsApp')
  .controller('SportCtrl', ['$scope', '$rootScope', 'ParseService', '$stateParams', function ($scope, $rootScope, ParseService, $stateParams) {

  		$scope.student = $rootScope.student;

        var sportURL = $stateParams.sport;

        ParseService.getSportsBySeason(function(results) {
            $scope.$apply(function() {
                $scope.allSports = results;
            })
        });
}]);
