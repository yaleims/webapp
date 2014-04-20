'use strict';

angular.module('yaleImsApp')
	.factory('Student', function($resource) {
        return $resource('/api/v1' + '/users/me', {});
});