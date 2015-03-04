'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:BroadcastsCtrl
 * @description
 * # BroadcastsCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
  .controller('BroadcastsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
