'use strict';

angular.module('yaleImsApp')
  .directive('playerlbRow', function () {
    return {
      template: '<td>{{rank}}</td><td>{{player}}</td><td>{{points}}</td>',
      restrict: 'A',
      scope: {
          rank: '@',
          player: '@',
          points: '@'
      }
    };
  });
