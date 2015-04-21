'use strict';

describe('Controller: SmsValidationCtrl', function () {

  // load the controller's module
  beforeEach(module('consoleApp'));

  var SmsValidationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SmsValidationCtrl = $controller('SmsValidationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
