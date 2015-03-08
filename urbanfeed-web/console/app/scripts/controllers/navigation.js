'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('NavigationCtrl', ['$cookieStore', '$window','$scope', function( $cookieStore, $window, $scope ) {


		$scope.DisplayLogin = function() {
			$('#login').openModal();
		};

		$scope.dropdownLogout = function() {
			$('.dropdown-button').dropdown();
		};
		$scope.Logout = function() {
			console.log('logout');
			$cookieStore.remove('LoggedUser');
			$window.location.reload();
		};
	}]);