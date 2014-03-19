'use strict';

angular.module('yaleImsApp')
  .directive('gameRow', function () {
    return {
        template: '<td><flaticon sport="{{sport}}" sporturl="{{sporturl}}" size="smallSportIcon"></flaticon></td><td>{{date}}</td><td>{{team1}} vs. {{team2}}</td><td ng-hide="{{!past}}">{{score1}} - {{score2}}</td>',
        restrict: 'A',
        scope: {
            sport: '@',
            sporturl: '@',
            date: '@',
            team1: '@',
            team2: '@',
            score1: '@',
            score2: '@',
            past: '@'
        }
    };
  });
