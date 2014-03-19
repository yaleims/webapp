'use strict';

angular.module('yaleImsApp')
  .directive('flaticon', function () {
    return {
      template: '<a class="thumbnail" ng-href="/sport/{{sporturl}}" title="{{sport}}"><center><span class="{{size}} flaticon-{{sporturl}}"></span></center></a>',
      restrict: 'E',
        scope: {
            sport: '@',
            sporturl: '@',
            size: '@'
        }
    };
  });
