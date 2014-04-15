'use strict';

angular.module('yaleImsApp')
  .controller('LogoutCtrl', ['$scope', 'ParseService', '$location', '$state', '$http', function ($scope, ParseService, $location, $state, $http) {

            $location.path("/home");
        });
}]);
