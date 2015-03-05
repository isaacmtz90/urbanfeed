'use strict';

describe('Service: Subscribers', function () {

  // load the service's module
  beforeEach(module('consoleApp'));

  // instantiate service
  var Subscribers;
  beforeEach(inject(function (_Subscribers_) {
    Subscribers = _Subscribers_;
  }));

  it('should do something', function () {
    expect(!!Subscribers).toBe(true);
  });

});
