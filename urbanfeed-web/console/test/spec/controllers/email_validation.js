'use strict';

describe('Controller: EmailValidationCtrl', function () {

  // load the controller's module
  beforeEach(module('consoleApp'));

  var EmailValidationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailValidationCtrl = $controller('EmailValidationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
