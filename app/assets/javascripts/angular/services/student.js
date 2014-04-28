'use strict';

angular.module('yaleImsApp')
	.factory('Student', ['$resource', function($resource) {
        return $resource('/api/v1' + '/users/me', {});
}]);