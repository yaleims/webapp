'use strict';

angular.module('yaleImsApp')
  .controller('NewsfeedCtrl', ['$scope', '$rootScope', 'ParseService', 'GamesService', function ($scope, $rootScope, ParseService, GamesService) {

    var netid = $rootScope.student.id;
    
    ParseService.getColleges(undefined, function(results) {
        $scope.$apply(function() {
            $scope.colleges = results;
        })
    });

	 ParseService.getGames(undefined, undefined, true, function(results) {
        $scope.$apply(function() {
          $scope.pastGames = results;
      	})
  	});

    GamesService.getGamesAttended(netid, undefined, undefined, function(results) {
        $scope.$apply(function() {
                    // console.log(results);
          for(var game in results)
          {
            if(results[game].team1.get('URL') == $rootScope.student.collegeurl 
              || results[game].team2.get('URL') == $rootScope.student.collegeurl) {
                results[game].showrsvp = true;
            }
            else {
              results[game].showrsvp = false;
            }
          }
          $scope.upcomingGames = results;
          console.log(results);
        })
    });
}]);
