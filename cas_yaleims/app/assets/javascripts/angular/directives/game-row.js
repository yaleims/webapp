'use strict';

angular.module('yaleImsApp')
  .directive('gameRow', function () {
    return {
        template: '<td ng-hide="{{noicon}}"><flaticon sport="{{sport}}" sporturl="{{sporturl}}" size="smallSportIcon"></flaticon></td><td>{{date}}</td><td><shield college="{{team1}}" collegeurl="{{team1url}}" size="smallShield"></shield><a ng-href="/#/college/{{team1url}}">{{team1abbr}}</a> vs. <shield college="{{team2}}" collegeurl="{{team2url}}" size="smallShield"></shield><a ng-href="/#/college/{{team2url}}">{{team2abbr}}</a></td><td ng-hide="{{!past}}">{{score1}} - {{score2}}</td><td ng-hide="{{!rsvp}}"><rsvp-button ng-show="{{showrsvp}}" netid="{{netid}}" gameid="{{gameid}}" attending="{{attending}}"></rsvp-button></td><td ng-hide="{{!outcome}}">{{outcome}}</td><td ng-hide="{{!tyng}}">{{tyngpoints}}</td><td ng-hide="{{!admin}}"><button class="btn btn-info" ng-click="adminfxn({team1: team1, team2: team2, date: dateunfiltered, sport: sport, student: netid, gameid: gameid })"">Edit</button></td>',
        restrict: 'A',
        scope: {
            sport: '@',
            sporturl: '@',
            date: '@',
            team1: '@',
            team1abbr: '@',
            team1url: '@',
            team2: '@',
            team2abbr: '@',
            team2url: '@',
            score1: '@',
            score2: '@',
            past: '@',
            noicon: '@',
            tyng: '@',
            rsvp:  '@',
            showrsvp: '@',
            outcome: '@',
            netid: '@',
            gameid: '@',
            attending: '@',
            adminfxn: '&',
            dateunfiltered: '@',
            admin: '@'
        }
    };
  });
