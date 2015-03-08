'use strict';

/**
 * @ngdoc service
 * @name consoleApp.Subscribers
 * @description
 * # Subscribers
 * Service in the consoleApp.
 */
var baseurl = 'https://city-notifications.appspot.com/_ah/api/urbanfeed/v1/';
angular.module('consoleApp')
	.service('Subscribers', ['$http', function Subscribers($http) {

		function createSubscriber(user,password) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/insert',
				data: {
					'object_id': user,
					'password': password,
					'channels': []
				},
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return request;
		}

		function validateSubscriber(user,password) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/validate',
				params: {
					'objectId': user,
					'password': password
				}
			});
			return request;
		}
		return {
			createSubscriber: createSubscriber,
			validateSubscriber: validateSubscriber

		};
	}]);