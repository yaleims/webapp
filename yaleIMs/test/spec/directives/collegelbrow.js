'use strict';

describe('Directive: CollegeLBRow', function () {

  // load the directive's module
  beforeEach(module('yaleImsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-college-l-b-row></-college-l-b-row>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the CollegeLBRow directive');
  }));
});