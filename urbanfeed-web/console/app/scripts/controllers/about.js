'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
