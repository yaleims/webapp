'use strict';

describe('Directive: shield', function () {

  // load the directive's module
  beforeEach(module('yaleImsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<shield></shield>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the shield directive');
  }));
});
