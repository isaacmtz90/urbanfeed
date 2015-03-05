'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $('.parallax').parallax();
  });
