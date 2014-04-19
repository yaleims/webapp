'use strict';

angular.module('yaleImsApp')
  .directive('addGameForm', function () {
    return {
      templateUrl: 'templates/addGameForm.html',
      restrict: 'E',
      scope: {},
      controller: ['$scope', 'GamesService', function($scope, GamesService) {
        $scope.student = $scope.$parent.student;

        $scope.gameData = { team1: '',
                            team2: '',
                            date: new Date(),
                            time: new Date(),
                            sport: '',
                            student: $scope.student.id
                          };


        $scope.colleges = {};
        $scope.sports = {};

        // ************************************************
        // *********** DATE Picker functions *************
        // ************************************************
        $scope.minDate = ( $scope.minDate ) ? null : new Date();

        $scope.openCalendar = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.openedCalendar = true;
        };

        $scope.dateOptions = {
          'year-format': "'yy'",
          'starting-day': 1,
          'show-weeks': false
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];


        // ************************************************
        // *********** TIME Picker functions *************
        // ************************************************
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.ismeridian = true;
        $scope.meridian = ['AM', 'PM'];

        $scope.timeChanged = function () {
          console.log('Time changed to: ' + $scope.gameData.time);
        };


        // ************************************************
        // *********** Handle games functions *************
        // ************************************************
          $scope.addGame = function() {
          // Add game to parse
          var game = $scope.gameData;
          var datetime = new Date(game.date.getFullYear(), game.date.getMonth(), game.date.getDate(), 
               game.time.getHours(), game.time.getMinutes(), game.time.getSeconds());
          // console.log(datetime);
          GamesService.addGame(game.team1, game.team2, game.sport, datetime);
          $scope.$parent.alerts.push({type: 'success', msg: "The game was successfully added to the schedule."});
        }

        $scope.deleteGame = function() {
          // Delete game to parse
          GamesService.deleteGame();
        }

        $scope.editGame = function() {
          // Edit game in parse
          GamesService.editGame();
        }

      }]
    };
  });
