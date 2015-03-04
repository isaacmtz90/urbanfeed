'use strict';

/**
 * @ngdoc service
 * @name consoleApp.FeedsService
 * @description
 * # FeedsService
 * Service in the consoleApp.
 */
var baseurl = 'https://city-notifications.appspot.com/_ah/api/urbanfeed/v1/';
angular.module('consoleApp')
	.service('FeedsService', ['$http', function FeedsService($http) {
		

		function allFeeds() {
			var request = $http({
				method: 'GET',
				url: baseurl + 'channels/list'
			});
			return request;
		}

		function getByCity(city, country) {
			var request = $http({
				method: 'GET',
				url: baseurl + 'channels/get_by_city',
				params: {
					'city': city,
					'country': country
				}
			});
			return request;
		}
		return {
			getAllFeeds: allFeeds,
			getFeedByCity: getByCity
		};



		// AngularJS will instantiate a singleton by calling "new" on this function
	}]);