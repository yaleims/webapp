'use strict';

angular.module('yaleImsApp')
  .directive('sportSelect', function () {
    return {
      template: '<div class="{{colsize}}"><a title="{{sport}}" class="" ng-href="{{url}}"><center><span class="{{iconsize}} flaticon-{{sporturl}}"></span></center></a></div>',
      replace: true,
      restrict: 'E',
        scope: {
            sport: '@',
            sporturl: '@',
            iconsize: '@',
            colsize: '@',
            url: '@'
        }
      }
  });
