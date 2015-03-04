'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('NavigationCtrl', function($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		$scope.DisplayLogin = function() {
			$('#login').openModal();
		};
	});