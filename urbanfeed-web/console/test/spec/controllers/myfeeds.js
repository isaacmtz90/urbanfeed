'use strict';

describe('Controller: MyfeedsCtrl', function () {

  // load the controller's module
  beforeEach(module('consoleApp'));

  var MyfeedsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyfeedsCtrl = $controller('MyfeedsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
