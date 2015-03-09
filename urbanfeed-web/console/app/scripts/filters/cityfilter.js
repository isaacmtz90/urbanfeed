'use strict';

/**
 * @ngdoc filter
 * @name consoleApp.filter:cityFilter
 * @function
 * @description
 * # cityFilter
 * Filter in the consoleApp.
 */
angular.module('consoleApp')
	.filter('cityFilter', ['Cityservice', '$timeout', function(Cityservice, $timeout) {
		var cities;
		
		
		var filter= function (input){
			return 'city';
		};

		var filterFunction=function(input){
			angular.forEach(cities, function(city, key) {
				console.log(city,input);
				if (city.id === input) {
					return city.name + '-' + city.country;
				}
			});
		};



		Cityservice.allCities().success(function(data) {
			cities = data.items;
			filter=filterFunction;
			console.log('change filter');
		});
		filter.$stateful =true;
		return function(input) {
			return filter(input);
		};
	}]);