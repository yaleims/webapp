'use strict';

angular.module('yaleImsApp')
  .directive('PlayerLBRow', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the PlayerLBRow directive');
      }
    };
  });