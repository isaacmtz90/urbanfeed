'use strict';

describe('Service: Validations', function () {

  // load the service's module
  beforeEach(module('consoleApp'));

  // instantiate service
  var Validations;
  beforeEach(inject(function (_Validations_) {
    Validations = _Validations_;
  }));

  it('should do something', function () {
    expect(!!Validations).toBe(true);
  });

});
