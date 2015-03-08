'use strict';

/**
 * @ngdoc service
 * @name consoleApp.Cityservice
 * @description
 * # Cityservice
 * Service in the consoleApp.
 */
var baseurl = 'https://city-notifications.appspot.com/_ah/api/urbanfeed/v1/';
angular.module('consoleApp')
	.service('Cityservice', ['$http', function FeedsService($http) {
		

		function allCities() {
			var request = $http({
				method: 'GET',
				url: baseurl + 'city/list'
			});
			return request;
		}

		
		return {
			allCities: allCities
			
		};



		// AngularJS will instantiate a singleton by calling "new" on this function
	}]);