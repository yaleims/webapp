'use strict';

angular.module('yaleImsApp')
  .directive('shield', function () {
    return {
      template: '<a ng-href="/#/college/{{collegeurl}}" title="{{college}}"><img ng-src="/assets/shields/{{collegeurl}}.png" class="{{size}}"></img></a>',
      restrict: 'E',
      scope: {
          college: '@',
          collegeurl: '@',
          size: '@'
      }
    };
  });
