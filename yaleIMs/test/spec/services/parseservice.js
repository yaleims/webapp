'use strict';

describe('Service: Parseservice', function () {

  // load the service's module
  beforeEach(module('yaleImsApp'));

  // instantiate service
  var Parseservice;
  beforeEach(inject(function (_Parseservice_) {
    Parseservice = _Parseservice_;
  }));

  it('should do something', function () {
    expect(!!Parseservice).toBe(true);
  });

});
