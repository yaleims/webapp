'use strict';

angular.module('yaleImsApp')
  .directive('upcomingGameRow', function () {
    return {
        template: '<td><flaticon sport="{{sport}}" sporturl="{{sporturl}}" size="smallSportIcon"></flaticon></td><td>{{date}}</td><td>{{team1}} vs. {{team2}}</td>',
        restrict: 'A',
        scope: {
            sport: '@',
            sporturl: '@',
            date: '@',
            team1: '@',
            team2: '@',
        }
    };
  });
