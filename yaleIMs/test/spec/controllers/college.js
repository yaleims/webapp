'use strict';

describe('Controller: CollegeCtrl', function () {

  // load the controller's module
  beforeEach(module('yaleImsApp'));

  var CollegeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CollegeCtrl = $controller('CollegeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
