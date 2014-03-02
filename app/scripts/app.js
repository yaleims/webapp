'use strict';

angular.module('colinApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/newsfeed', {
        templateUrl: 'views/newsfeed.html',
        controller: 'NewsfeedCtrl'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })
      .when('/college', {
        templateUrl: 'views/college.html',
        controller: 'CollegeCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/sport', {
        templateUrl: 'views/sport.html',
        controller: 'SportCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
