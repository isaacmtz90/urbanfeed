'use strict';

/**
 * @ngdoc service
 * @name consoleApp.Messages
 * @description
 * # Messages
 * Service in the consoleApp.
 */
var baseurl = 'https://city-notifications.appspot.com/_ah/api/urbanfeed/v1/';
angular.module('consoleApp')
	.service('Messages', ['$http', function Messages($http) {
		// AngularJS will instantiate a singleton by calling "new" on this function


		function getByChannels(channels) {
			var request = $http({
				method: 'GET',
				url: baseurl + 'messages/get_by_channels',
				params: {
					'channels': channels
				}
			});
			return request;
		}

		function insertMessage(message) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'messages/create_and_notify',
				params: {
					channel_name: message.channel_name,
					channel_id: message.channel_id,
					title: message.title,
					content:message.content
				}
			});
			return request;
		}

		return {
			insertMessage: insertMessage,
			getByChannels: getByChannels
		};
	}]);