'use strict';

angular.module('yaleImsApp')
  .directive('playerlbRow', function () {
    return {
      template: '<td>{{rank}}</td><td><shield college="{{college}}" collegeurl="{{collegeurl}}" size="smallShield"></shield><a ng-href="/profile/{{netid}}">{{player}}</td><td>{{points}}</td>',
      restrict: 'A',
      scope: {
          rank: '@',
          player: '@',
          netid: '@',
          college: '@',
          collegeurl: '@',
          points: '@'
      }
    };
  });
