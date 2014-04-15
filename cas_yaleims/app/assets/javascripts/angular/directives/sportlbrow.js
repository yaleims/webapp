'use strict';

angular.module('yaleImsApp')
    .directive('sportlbRow', function () {
        return {
            template: '<td>{{college1}} vs. {{college2}}</td><td>{{score1}} - {{score2}}</td><td>{{outcome}}</td><td>+{{points}}</td>',
            restrict: 'A',
            scope: {
                college1: '@',
                college2: '@',
                score1: '@',
                score2: '@',
                outcome: '@',
                points: '@'
            }
        };
    });
