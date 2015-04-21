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
		$scope.regions = [{
			value: 1,
			label: 'USA (+1)'
		}, {
			value: 504,
			label: 'Honduras (+504)'
		}];
		$scope.smsnoti = true;
		$scope.emailnoti = true;
		$(document).ready(function() {
			$('select').material_select();
		});
		

		$scope.registerUser = function(username, password, passwordconfirmation, region, phone, smsnoti, emailnoti) {
			var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
			region= $('#regionselector').val();
			console.log(username, region , phone, smsnoti, emailnoti);
			if (!EMAIL_REGEXP.test(username)) {
				toast('Not a valid email, try again', 4000);
			} else if (region ===null && smsnoti){
				toast('Please select a region', 4000);

			}else if (password.length < 6) {
				toast('Password must be at least 6 characters', 4000);

			} else if (smsnoti && (phone === undefined || phone.length < 1)) {
				toast('Enter a phone number if you turn on sms notifications', 4000);
			} else {
				if (password === passwordconfirmation) {
					var subscription = Subscribers.createSubscriber(username, password, username, '+' + region + phone, smsnoti, emailnoti);
					subscription.success(function(data) {
						$scope.success = true;
						$timeout(function() {
							if (phone !== undefined) {
								window.location.href = '#/sms_validation';
							} else {
								window.location.href = '#/home';
							}
						}, 1000);

					}).error(function(response) {
						toast('An error ocurred, please try again', 4000);

					});


				} else {
					toast('Passwords do not match, try again', 4000);
				}
			}

		};
	}]);