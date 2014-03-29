'use strict';

angular.module('yaleImsApp')
  .directive('sportSelect', function () {
    return {
      template: '<div class="{{colSize}}"><a title="{{sport}}" class="thumbnail" ng-href="{{url}}"><center><span class="flaticon-{{sporturl}} {{iconSize}}"></span></center></a></div>',
      replace: true,
      restrict: 'E',
        scope: {
            sport: '@',
            sporturl: '@',
            iconSize: '@',
            colSize: '@',
            url: '@'
        }
      }
    };
  });
