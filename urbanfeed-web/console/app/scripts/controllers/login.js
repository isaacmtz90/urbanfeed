'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('LoginctrlCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

		$scope.logMeIn = function(username, password) {
			//validate, if it passes:
			$rootScope.username = username;
			$rootScope.password = password;
			//TODO: store in cookie
			//TODO: Read at startup

			$('#login').closeModal();

		};
		$scope.register = function(username, password) {
			$('#login').closeModal();
			window.location.href = "#/registration"

		};

	}]);