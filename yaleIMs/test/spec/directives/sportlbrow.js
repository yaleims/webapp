'use strict';

describe('Directive: SportLBRow', function () {

  // load the directive's module
  beforeEach(module('yaleImsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-sport-l-b-row></-sport-l-b-row>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the SportLBRow directive');
  }));
});
