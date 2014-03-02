'use strict';

describe('Controller: SportCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var SportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SportCtrl = $controller('SportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
