'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:SmsValidationCtrl
 * @description
 * # SmsValidationCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('SmsValidationCtrl', ['$rootScope', '$scope', 'Validations', '$timeout', function($rootScope, $scope, Validations, $timeout) {

		//$scope.sms_code = '0000';
		$scope.init = function() {

			if (!$rootScope.logged) {
				window.location = '#/';
			}
		};
		$scope.init();
		$scope.resendSmsCode = function() {
			var email = $rootScope.username;
			var req = Validations.resend_sms_verification(email);
			req.success(function(response) {
				toast('SMS sent, check your phone', 4000);
			}).error(function(err) {
				toast('An error ocurred, please try again later', 4000);
			});

		};

		$scope.validateSms = function() {
			var email = $rootScope.username;
			var req = Validations.verify_sms(email, $scope.sms_code);
			req.success(function(response) {
				toast('Phone verified!', 4000);
				$timeout(function() {
					window.location.href = '#/feed';
				}, 1000);

			}).error(function(err) {
				toast('An error ocurred, please try again later', 4000);
			});

		};
	}]);