'use strict';

angular.module('yaleImsApp')
	.factory('Student', function($resource) {
        return $resource('/users/me', {});
});