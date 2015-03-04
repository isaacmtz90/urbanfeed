'use strict';

describe('Service: FeedsService', function () {

  // load the service's module
  beforeEach(module('consoleApp'));

  // instantiate service
  var FeedsService;
  beforeEach(inject(function (_FeedsService_) {
    FeedsService = _FeedsService_;
  }));

  it('should do something', function () {
    expect(!!FeedsService).toBe(true);
  });

});
