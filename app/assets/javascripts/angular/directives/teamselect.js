'use strict';

angular.module('yaleImsApp')
  .directive('teamSelect', ['TeamsService', function (TeamsService) {
    return {
        template: '<div ng-show="!member" class="col-sm-3 col-xs-4" ng-click="join()"><a title="{{teamname}}"><center><span class="adminSportIcon flaticon-{{team}}"></span></center></a></div><div ng-show="member" class="col-sm-3 col-xs-4" ng-click="unjoin()"><a title="{{teamname}}" class="joined"><center><span class="adminSportIcon flaticon-{{team}}"></span></center></a></div>',
        restrict: 'E',
        scope: {
            netid: '@',
            college: '@',
            team: '@',
            teamname: '@',
            member: '@'        
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
