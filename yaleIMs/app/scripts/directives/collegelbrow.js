'use strict';

angular.module('yaleImsApp')
  .directive('collegelbRow', function () {
        return {
            template: '<td>{{rank}}</td><td><shield college="{{college}}" collegeurl="{{collegeurl}}" size="smallShield"></shield><a ng-href="/#/college/{{collegeurl}}">{{college}}</a></td><td>{{points}}</td><td ng-hide="nowinloss">{{wins}} - {{loss}}</td>',
            restrict: 'A',
            scope: {
                rank: '@',
                college: '@',
                collegeurl: '@',
                points: '@',
                wins: '@',
                loss: '@',
                nowinloss: '@'
            }
        };
    });

