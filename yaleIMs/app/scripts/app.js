'use strict';

angular.module('yaleImsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/newsfeed', {
        templateUrl: 'views/newsfeed.html',
        controller: 'NewsfeedCtrl'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })
        .when('/sport/:sport', {
            templateUrl: 'views/sport.html',
            controller: 'SportCtrl'
        })
        .when('/sport', {
        templateUrl: 'views/sport.html',
        controller: 'SportCtrl'
      })
      .when('/college/:college/:sport', {
        templateUrl: 'views/college.html',
        controller: 'CollegeCtrl'
      })
        .when('/college/:college', {
            templateUrl: 'views/college.html',
            controller: 'CollegeCtrl'
        })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
