'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('MyfeedsCtrl', ['$scope', 'FeedsService', '$rootScope', 'Subscribers', function($scope, FeedsService, $rootScope, Subscribers) {


		$scope.$on('user-logged', function() {
			var idscomma = '';
			console.log('root channels' + $rootScope.channels);
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



		$scope.RemoveFeed = function(feedid, indx) {
			var rm = Subscribers.removeChannel(feedid, $rootScope.username);
			rm.success(function(data) {
				toast('Feed Removed Successfully', 2000);
				var index = $rootScope.channels.indexOf(feedid);
				$rootScope.channels = $rootScope.channels.splice(index, 1);
				console.log(indx);
				$scope.feedItems.splice(indx, 1);
			});
		};



		console.log($scope.feedItems);
	}]);