'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:EmailValidationCtrl
 * @description
 * # EmailValidationCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('EmailValidationCtrl', ['$scope', '$routeParams', '$rootScope', 'Validations', function($scope, $routeParams, $rootScope, Validations) {
		$scope.validatestatus ='validating';
		$scope.init = function() {
			var validate = Validations.verify_email($routeParams.email, $routeParams.verification_code);
			validate.success(function(resp){
				$scope.validatestatus = 'success';
			}).error(function(err){
				$scope.validatestatus = 'error';
			});
		};

		$scope.init();
	}]);