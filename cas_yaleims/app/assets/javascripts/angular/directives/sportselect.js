'use strict';

angular.module('yaleImsApp')
  .directive('sportSelect', function () {
    return {
      template: '<div><div ng-if="updatepage"  ng-click="dial()" class="{{colsize}}"><a title="{{sport}}"  ui-sref="{{url}}"><center><span class="{{iconsize}} flaticon-{{sporturl}}"></span></center></a></div><div ng-if="!updatepage" class="{{colsize}}"><a title="{{sport}}"  ui-sref="{{url}}"><center><span class="{{iconsize}} flaticon-{{sporturl}}"></span></center></a></div></div>',
      restrict: 'E',
        replace: 'true',
        scope: {
            sport: '@',
            sporturl: '@',
            iconsize: '@',
            colsize: '@',
            url: '@',
            dial: "&",
            updatepage: '@'
        }
      }
  });
