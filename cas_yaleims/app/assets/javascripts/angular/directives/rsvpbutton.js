'use strict';

angular.module('yaleImsApp')
  .directive('rsvpButton', ['GamesService', function (GamesService) {
    return {
        template: '<button class="btn btn-info" ng-click="going()" ng-hide="merp">RSVP</button><button class="btn btn-success" ng-click="unattend()" ng-if="merp">Going</button>',
        restrict: 'E',
        scope: {
            netid: '@',
            gameid: '@',
            merp: '@'        
        },
        link: function(scope) {
            console.log(scope.merp);
            scope.going = function() {
                scope.merp = true;
                GamesService.attendGame(scope.netid, scope.gameid);
            };

            scope.unattend = function() {
                scope.merp = false;
                GamesService.unattendGame(scope.netid, scope.gameid);
            };
        }
    };
  }]);
