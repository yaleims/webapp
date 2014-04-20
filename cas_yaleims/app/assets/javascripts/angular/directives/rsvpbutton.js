'use strict';

angular.module('yaleImsApp')
  .directive('rsvpButton', ['GamesService', function (GamesService) {
    return {
        template: '<button ng-show="!going" ng-click="attend()" class="btn btn-info">RSVP</button><button ng-show="going" ng-click="unattend()" class="btn btn-success">Attending</button>',
        restrict: 'E',
        scope: {
            netid: '@',
            gameid: '@',
            going: '@'        
        },
        link: function(scope) {

            scope.attend = function() {
                scope.going = true;
                GamesService.attendGame(scope.netid, scope.gameid);
            };

            scope.unattend = function() {
                scope.going = false;
                GamesService.unattendGame(scope.netid, scope.gameid);
            };
        }
    };
  }]);
