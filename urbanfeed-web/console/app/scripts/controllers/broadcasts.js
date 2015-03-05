'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:BroadcastsCtrl
 * @description
 * # BroadcastsCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
  .controller('BroadcastsCtrl',[ '$scope', 'Messages','$routeParams', function ($scope, Messages,$routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Messages.getByChannels($routeParams.param).success(function(data) {
			$scope.feedItems = data.items;
		});
  }]);
