'use strict';

angular.module('yaleImsApp')
  .directive('gameRow', function () {
    return {
        template: '<td ng-hide="{{noicon}}"><flaticon sport="{{sport}}" sporturl="{{sporturl}}" size="smallSportIcon"></flaticon></td><td>{{date}}</td><td>{{team1}} vs. {{team2}}</td><td ng-hide="{{!past}}">{{score1}} - {{score2}}</td><td ng-hide="{{!rsvp}}"><button type="button" class="btn btn-primary btn-sm">Attend</button></td><td ng-hide="{{!tyng}}">{{tyngpoints}}</td>',
        restrict: 'A',
        scope: {
            sport: '@',
            sporturl: '@',
            date: '@',
            team1: '@',
            team2: '@',
            score1: '@',
            score2: '@',
            past: '@',
            noicon: '@',
            tyng: '@',
            rsvp:  '@'
        }
    };
  });
