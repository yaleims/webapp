'use strict';

describe('Directive: upcomingGameRow', function () {

  // load the directive's module
  beforeEach(module('yaleImsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<upcoming-game-row></upcoming-game-row>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the upcomingGameRow directive');
  }));
});
