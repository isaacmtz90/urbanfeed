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

		function createSubscriber(user,password, email, phone_number, sms_enabled, email_enabled) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/insert_subscriber',
				data: {
					'object_id': user,
					'password': password,
					'channels': [],
					'phone_number':phone_number,
					'email':email,
					'sms_enabled':sms_enabled,
					'email_enabled':email_enabled
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

		function getByObjId(user) {
			var request = $http({
				method: 'GET',
				url: baseurl + 'subscribers/get_by_object_id',
				params: {
					'objectId': user
				}
			});
			return request;
		}

		function addChannel(channel, object_id) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/add_channel',
				params: {
					'channelid': channel,
					'objectId' : object_id
				}
			});
			return request;
		}

		function removeChannel(channel, object_id) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/remove_channel',
				params: {
					'channelid': channel,
					'objectId' : object_id
				}
			});
			return request;
		}


		return {
			createSubscriber: createSubscriber,
			validateSubscriber: validateSubscriber,
			addChannel:addChannel,
			removeChannel:removeChannel,
			getByObjId:getByObjId

		};
	}]);