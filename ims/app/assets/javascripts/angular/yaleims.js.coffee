window.patientbank = angular.module('yaleImsApp', 
  ['ngResource', 'ui.router', 'ngStorage', 'ui.bootstrap'])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    ($stateProvider, $locationProvider, $urlRouterProvider) ->
      $stateProvider
        # Authentication and Static States
        .state('home',
          url: '/home'
          templateUrl: '/templates/home'
          controller: 'HomeCtrl'
        )
        .state('profile',
          url: '/profile',
          templateUrl: '/templates/profile'
          controller: 'ProfileCtrl'
        )
        .state('newsfeed',
          url: '/newsfeed',
          templateUrl: '/templates/newsfeed'
          controller: 'NewsfeedCtrl'
        )
        # Record States
        .state('leaderboard',
          url: '/leaderboard'
          templateUrl: '/templates/leaderboard'
          controller: 'LeaderboardCtrl'
        )
        
        # Access Controls States
        .state('sport.none',
          url: '/sport'
          templateUrl: '/templates/sport'
          controller: 'SportCtrl'
        )
        .state('sport.selected'
          url: '/sport/:sport'
          templateUrl: '/templates/sport'
          controller: 'SportCtrl'
        )
        .state('college.nosport',
          url: '/college/:college'
          templateUrl: '/templates/college'
          controller: 'CollegeCtrl'
        )
        .state('college.sport',
          url: '/college/:college/:sport'
          templateUrl: '/templates/college'
          controller: 'CollegeCtrl'
        )
        .state('admin',
          url: '/admin'
          templateUrl: '/templates/admin'
          controller: 'AdminCtrl'
        )
      $locationProvider.html5Mode(true)
      $urlRouterProvider.otherwise('/home')
  ])