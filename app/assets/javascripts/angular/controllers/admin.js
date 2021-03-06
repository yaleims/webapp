'use strict';

angular.module('yaleImsApp')
  .controller('AdminCtrl', ['$scope', 'ParseService', '$rootScope', '$timeout', '$modal', '$stateParams', function ($scope, ParseService, $rootScope, $timeout, $modal, $stateParams) {
    
    // ************************************************
    // *********** Special Admin Menu Bar *************
    // ************************************************
    $rootScope.adminPage = true;
    
    $scope.$on('$stateChangeStart', function ()
    {
        $rootScope.adminPage = false;
    });

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.closeScoreAlert = function(index) {
        $scope.scoreAlerts.splice(index, 1);
    };


    // ************************************************
    // *********** Active tab- admin page *************
    // ************************************************
    var activeTab = $stateParams.tab;
    $scope.activeTab = function(tab) {
        return angular.equals(tab, activeTab);
    };

    // ************************************************
    // *********** Manage Schedule Filtering *************
    // ************************************************
    $scope.updateSchedule = function (sportName, sportUrl)
    {
        $scope.sportURL = sportUrl;
        $scope.sportName = sportName;
    }

    $scope.filterAllSports = function ()
    {
        $scope.sportURL = null;
        $scope.sportName = null;
    }

    // ************************************************
    // *********** Admin Add Game Modal *************
    // ************************************************
    $scope.toggleAddModal = function() {
         var modalInstance = $modal.open({
          templateUrl: 'templates/gameFormModal.html',
          controller: ['$scope', 'GamesService', '$modalInstance', function($scope, GamesService, $modalInstance) {
            $scope.student = $scope.$parent.student;

             ParseService.getSports(undefined, function (results) {
                $scope.$apply(function () {
                    $scope.sports = results;
                });
            });

            ParseService.getColleges(undefined, function (results) {
                $scope.$apply(function () {
                    $scope.colleges = results;
                    console.log(results);
                });
            });

            $scope.gameData = { team1: '',
                                team2: '',
                                date: new Date(),
                                time: new Date(),
                                sport: '',
                                student: $scope.student.id
                              };

            $scope.add = true;
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
              GamesService.addGame(game.team1, game.team2, game.sport, datetime).then(function() {
                $modalInstance.close({ type: 'success', msg: 'Success! The game was added to the schedule.' });
              });
            }

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            }

          }]
        });

       modalInstance.result.then(function (alert) {
          $scope.getUpcoming();
          $scope.alerts = [];
          $scope.alerts.push(alert);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };


    // ************************************************
    // *********** Admin Edit Game Modal *************
    // ************************************************
    $scope.toggleEditModal = function(team1, team2, datetime, sport, student, gameid) {
         var modalInstance = $modal.open({
          templateUrl: 'templates/gameFormModal.html',
          controller: ['$scope', 'GamesService', '$modalInstance', 'ParseService', function($scope, GamesService, $modalInstance, ParseService) {
            ParseService.getSports(undefined, function (results) {
                $scope.$apply(function () {
                    $scope.sports = results;
                });
            });

            ParseService.getColleges(undefined, function (results) {
                $scope.$apply(function () {
                    $scope.colleges = results;
                    console.log(results);
                });
            });

            $scope.student = $scope.$parent.student;

            $scope.gameData = { team1: team1.get('College'),
                                team2: team2.get('College'),
                                date: new Date(datetime),
                                time: new Date(datetime),
                                sport: sport.get('Sport'),
                                gameid: gameid,
                                student: student
                              };


            $scope.edit = true;

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
              $scope.editGame = function() {
              // Add game to parse
              var game = $scope.gameData;
              var datetime = new Date(game.date.getFullYear(), game.date.getMonth(), game.date.getDate(), 
                   game.time.getHours(), game.time.getMinutes(), game.time.getSeconds());
              GamesService.editGame(gameid, game.team1, game.team2, game.sport, datetime).then(function() {
                $modalInstance.close({ type: 'success', msg: 'Success! The edits to the game were saved.'});
              });
            }

            $scope.deleteGame = function() {
              // Add game to parse
              var game = $scope.gameData;
              GamesService.deleteGame(game.gameid).then(function() {
                $modalInstance.close({ type: 'danger', msg: 'Success! The game was deleted.'});
              });
            }

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            }

          }]
        });

       modalInstance.result.then(function (alert) {
          $scope.getUpcoming();
          console.log("EDITTED");
          $scope.alerts = [];
          $scope.alerts.push(alert);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };

    // ************************************************
    // *********** Admin Score Game Modal *************
    // ************************************************
    $scope.toggleScoreModal = function(team1, team2, team1url, team2url, datetime, sport, student, gameid) {
         var modalInstance = $modal.open({
          templateUrl: 'templates/gameFormModal.html',
          controller: ['$scope', 'GamesService', '$modalInstance', 'ParseService', function($scope, GamesService, $modalInstance, ParseService) {
            ParseService.getSports(undefined, function (results) {
                $scope.$apply(function () {
                    $scope.sports = results;
                });
            });

            ParseService.getColleges(undefined, function (results) {
                $scope.$apply(function () {
                    $scope.colleges = results;
                    console.log(results);
                });
            });

            $scope.student = $scope.$parent.student;

            $scope.gameData = { team1: team1,
                                team2: team2,
                                team1url: team1url,
                                team2url: team2url,
                                date: new Date(datetime),
                                time: new Date(datetime),
                                sport: sport,
                                student: student,
                                gameid: gameid,
                                score1: '',
                                score2: ''
                              };


            $scope.score = true;

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
              $scope.scoreGame = function() {
              // Add game to parse
              var game = $scope.gameData;
              var datetime = new Date(game.date.getFullYear(), game.date.getMonth(), game.date.getDate(), 
                   game.time.getHours(), game.time.getMinutes(), game.time.getSeconds());
              GamesService.scoreGame(game.gameid, game.score1, game.score2).then(function() {
                $modalInstance.close({ type: 'success', msg: 'Success! The scores for the game were saved.' });
              });
            }

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            }
          }]
        });

       modalInstance.result.then(function (alert) {
          $scope.getCompleted();
          $scope.scoreAlerts = [];
          $scope.scoreAlerts.push(alert);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    };

    // ************************************************
    // *********** Admin Checkin Modal *************
    // ************************************************
    $scope.toggleCheckinModal = function(team1, team2, team1url, team2url, datetime, sport, gameid) {
         var modalInstance = $modal.open({
          templateUrl: 'templates/gameFormModal.html',
          controller: ['$scope', 'GamesService', '$modalInstance', 'ParseService', function($scope, GamesService, $modalInstance, ParseService) {

            $scope.getAttending = function() {
            
              var team1players = [];
              var team2players = [];

              ParseService.getAttending(undefined, gameid, function(results) {

                  console.log('updating list');
                  for (var i = 0; i < results.length; i++) {
                    if (results[i].player.college == team1 && results[i].object.get('Attended') == false) {
                      team1players.push(results[i].player);
                    }
                    else if (results[i].player.college == team2 && results[i].object.get('Attended') == false) {
                      team2players.push(results[i].player);
                    }
                  }
                }).then(function() {
                  $scope.$apply(function() {
                      $scope.gameData.team1players = team1players;
                      $scope.gameData.team2players = team2players;
                      console.log(team1players);
                      console.log(team2players);
                  });
              });
            }

            $scope.getAttending(); 
            $scope.student = $scope.$parent.student;

            $scope.gameData = { 
                      team1: team1,
                      team2: team2,
                      team1url: team1url,
                      team2url: team2url,
                      date: new Date(datetime),
                      sport: sport,
                      gameid: gameid
            };

            $scope.playerHere = function(player, game) {
                ParseService.setAttended(player.object, game).then(function() {
                  $scope.getAttending();
                });
            };

            $scope.playerNotHere = function(player, game) {
                ParseService.unattendGame(player.object, game).then(function() {
                  $scope.getAttending();
                });
            };


            $scope.checkin = true;

            // ************************************************
            // *********** Handle games functions *************
            // ************************************************
              
            $scope.cancel = function() {
              $modalInstance.close();
            }
          }]
        });

       modalInstance.result.then(function (alert) {
          $scope.getCheckIn();
          console.log("Modal for checking in closed")
        });
    };

    // ************************************************
    // *************  Parse Integration  **************
    // ************************************************

    ParseService.updateGames(); 

    ParseService.getSportsBySeason(function(results) {
        $scope.allSports = results;
    });

    $scope.getCheckIn = function() {
      ParseService.getCheckIns(function(results) {
        $scope.$apply(function() {
            $scope.gameDates = results;
            console.log($scope.gameDates);
        })
      });
    }

    $scope.getCompleted = function() {
      ParseService.completedGames(undefined, undefined, function(results) {
        $scope.$apply(function() {
            $scope.completedGames = results;
        });
      });
    }

    $scope.getUpcoming = function() {
      ParseService.getGames(undefined, undefined, false, function(results) {
            $scope.$apply(function() {
              $scope.upcomingGames = results;
          })
        });
      }

      $scope.getCompleted();
      $scope.getUpcoming();
      $scope.getCheckIn();

  }]);
