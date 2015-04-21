'use strict';

/**
 * @ngdoc service
 * @name consoleApp.Validations
 * @description
 * # Validations
 * Service in the consoleApp.
 */
var baseurl = 'https://city-notifications.appspot.com/_ah/api/urbanfeed/v1/';
angular.module('consoleApp')
	.service('Validations', ['$http', function Validations($http) {
		function verify_sms(object_id, verification_code) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/verify_sms',
				params: {
					'objectId': object_id,
					'verification_code': verification_code,
				}
			});
			return request;
		}

		function verify_email(object_id, verification_code) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/verify_email',
				params: {
					'objectId': object_id,
					'verification_code': verification_code
				}
			});
			return request;
		}

		function resend_sms_verification(object_id) {
			var request = $http({
				method: 'POST',
				url: baseurl + 'subscribers/resend_sms_verification',
				params: {
					'objectId': object_id
				}
			});
			return request;
		}


		return {
			verify_sms: verify_sms,
			verify_email: verify_email,
			resend_sms_verification: resend_sms_verification
		};
	}]);