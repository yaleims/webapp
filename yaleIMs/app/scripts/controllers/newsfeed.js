'use strict';

angular.module('yaleImsApp')
  .controller('NewsfeedCtrl', ['$scope', 'ParseService', function ($scope, ParseService) {

    ParseService.getColleges(function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });
}]);
