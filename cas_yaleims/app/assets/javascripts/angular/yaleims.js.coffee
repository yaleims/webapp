window.yaleImsApp = angular.module('yaleImsApp', 
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
        .state('sport',
          url: '/sport'
          templateUrl: '/templates/sport'
          controller: 'SportCtrl'
        )
        .state('sportSelected'
          url: '^/sport/:sport'
          templateUrl: '/templates/sport'
          controller: 'SportSelectedCtrl'        )
        .state('college',
          url: '/college/:college'
          templateUrl: '/templates/college'
          controller: 'CollegeCtrl'
        )
        .state('college.sport',
          url: '/:sport'
          templateUrl: '/templates/college'
          controller: 'CollegeCtrl'
        )
        .state('admin',
          url: '/admin'
          templateUrl: '/templates/admin'
          controller: 'AdminCtrl'
        )
        .state('logout',
          url: '/logout'
          controller: 'LogoutCtrl'
        )
      $locationProvider.html5Mode(true)
      $urlRouterProvider.otherwise('/home')
  ])

  .run(['$rootScope', 'Student', 'ParseService', ($rootScope, Student, ParseService) ->
    yaleImsApp.apiPrefix = '/api/v1'
    Student.get((response) ->
      $rootScope.student = response.person
      console.log($rootScope.student)
      ParseService.addPerson(response.person.id, response.person.name, response.person.collegeurl, response.person.year);
    )
  ])