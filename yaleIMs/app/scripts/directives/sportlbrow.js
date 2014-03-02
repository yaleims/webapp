'use strict';

angular.module('yaleImsApp')
    .directive('sportlbRow', function () {
        return {
            template: '<td>{{rank}}</td><td>{{college}}</td><td>{{points}}</td><td>{{wins}} - {{loss}}</td>',
            restrict: 'A',
            scope: {
                rank: '@',
                college: '@',
                points: '@',
                wins: '@',
                loss: '@'
            }
        };
    });
