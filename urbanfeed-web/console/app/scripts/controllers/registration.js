'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('RegistrationCtrl', ['$scope', '$timeout', 'Subscribers', function($scope, $timeout, Subscribers) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.success = false;
		$scope.registerUser = function(username, password, passwordconfirmation) {
			var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
			if (!EMAIL_REGEXP.test(username)) {
				toast('Not a valid email, try again', 4000);
			} else {
				if (password === passwordconfirmation) {
					var subscription = Subscribers.createSubscriber(username, password);
					subscription.success(function(data) {
						$scope.success = true;
						$timeout(function() {
							window.location.href = '#/feed';
						}, 1000);

					});
				} else {
					toast('Passwords do not match, try again', 4000);
				}
			}

		};
	}]);