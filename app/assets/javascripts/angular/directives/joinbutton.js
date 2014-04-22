'use strict';

angular.module('yaleImsApp')
  .directive('joinButton', ['TeamsService', function (TeamsService) {
    return {
        template: '<button ng-show="!member" ng-click="join()" class="btn btn-danger pull-right">Join</button><button ng-show="member" ng-click="unjoin()" class="btn btn-success pull-right">Joined</button>',
        restrict: 'E',
        scope: {
            netid: '@',
            college: '@',
            team: '@',
            member: '='        
        },
        link: function(scope) {

            scope.join = function() {
                scope.member = true;
                TeamsService.joinTeam(scope.netid, scope.college, scope.team);
            };

            scope.unjoin = function() {
                scope.member = false;
                TeamsService.leaveTeam(scope.netid, scope.college, scope.team);
            };
        }
    };
  }]);
