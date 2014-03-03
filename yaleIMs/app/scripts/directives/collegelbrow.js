'use strict';

angular.module('yaleImsApp')
  .directive('collegelbRow', function () {
        return {
            template: '<td>{{rank}}</td><td>{{college}}</td><td>{{points}}</td><td ng-hide="nowinloss">{{wins}} - {{loss}}</td>',
            restrict: 'A',
            scope: {
                rank: '@',
                college: '@',
                points: '@',
                wins: '@',
                loss: '@',
                nowinloss: '@'
            }
        };
    });

