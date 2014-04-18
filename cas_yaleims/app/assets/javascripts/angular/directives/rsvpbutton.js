'use strict';

angular.module('yaleImsApp')
  .directive('rsvpButton', ['GamesService', function (GamesService) {
    return {
        template: '<button ng-show="!attending" ng-click="attend()" class="btn btn-info">RSVP</button><button ng-show="attending" ng-click="unattend()" class="btn btn-success">Attending</button>',
        restrict: 'E',
        scope: {
            netid: '@',
            gameid: '@',
            attending: '@'        
        },
        link: function(scope) {

            scope.attend = function() {
                scope.attending = true;
                GamesService.attendGame(scope.netid, scope.gameid);
            };

            scope.unattend = function() {
                scope.attending = false;
                GamesService.unattendGame(scope.netid, scope.gameid);
            };
        }
    };
  }]);
