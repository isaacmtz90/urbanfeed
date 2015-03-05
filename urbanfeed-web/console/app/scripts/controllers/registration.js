'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('RegistrationCtrl', ['$scope','$timeout', 'Subscribers', function($scope, $timeout, Subscribers) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.success=false;
		$scope.registerUser = function(username, password, passwordconfirmation) {
			if (password === passwordconfirmation) {
				var subscription= Subscribers.createSubscriber(username, password);
				subscription.success(function(data){
					$scope.success=true;
					$timeout(function(){window.location.href= "#/feed"}, 4000);
					
				});
			} else {
				toast('Passwords do not match, try again', 4000);
			}

		};
	}]);