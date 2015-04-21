'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('MyfeedsCtrl', ['$scope', 'FeedsService', 'Cityservice', '$rootScope', 'Subscribers', function($scope, FeedsService, Cityservice, $rootScope, Subscribers) {
		$scope.loaded=false;
		Cityservice.allCities().success(function(data){
			$scope.cities=data.items;
		});

		$scope.$on('user-logged', function() {
			var idscomma = '';
			console.log('root channels' + $rootScope.channels);
			angular.forEach($rootScope.channels, function(value, key) {
				idscomma += ',' + value;
			});

			FeedsService.getByIds(idscomma).success(function(data) {
				
				$scope.feedItems = data.items;
				if ($scope.feedItems === undefined){
					$scope.feedItems= [];
				}
				$('.tooltipped').tooltip({
					delay: 50
				});
				$scope.loaded=true;
			});

		});

		if ($rootScope.logged) {
			var idscomma='';
			angular.forEach($rootScope.channels, function(value, key) {
				idscomma += ',' + value;
			});
			FeedsService.getByIds(idscomma).success(function(data) {
				console.log(data.items);
				$scope.feedItems = data.items;
				$('.tooltipped').tooltip({
					delay: 50
				});
			});
		}

		$scope.getCity=function(city_id){
			var cityname= 'city';
			angular.forEach($scope.cities,function(city,key){
				if (city.id===city_id){
					cityname= city.name + ' - ' + city.country;
				}
			});
			return cityname;

		};


		$scope.RemoveFeed = function(feedid, indx) {
			var rm = Subscribers.removeChannel(feedid, $rootScope.username);
			rm.success(function(data) {
				toast('Feed Removed Successfully', 2000);
				var index = $rootScope.channels.indexOf(feedid);
				$rootScope.channels.splice(index, 1);
				console.log(indx);
				$scope.feedItems.splice(indx, 1);
			});
		};



		console.log($scope.feedItems);
	}]);