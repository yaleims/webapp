'use strict';

angular.module('yaleImsApp')
  .directive('flaticon', function () {
    return {
      template: '<a ng-href="#/sport/{{sporturl}}" title="{{sport}}"><center ng-if="center"><span class="{{size}} flaticon-{{sporturl}}"></span></center><span ng-if="!center" class="{{size}} flaticon-{{sporturl}}"></span></a>',
      restrict: 'E',
        replace: true,
        scope: {
            sport: '@',
            sporturl: '@',
            size: '@',
            center: '@'
        }
    };
  });
