'use strict';

describe('Service: Cityservice', function () {

  // load the service's module
  beforeEach(module('consoleApp'));

  // instantiate service
  var Cityservice;
  beforeEach(inject(function (_Cityservice_) {
    Cityservice = _Cityservice_;
  }));

  it('should do something', function () {
    expect(!!Cityservice).toBe(true);
  });

});
