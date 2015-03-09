'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('FeedsCtrl', ['$scope', '$rootScope', '$timeout', 'FeedsService', 'Cityservice', 'Messages', 'Subscribers', function($scope, $rootScope, $timeout, FeedsService, Cityservice,Messages, Subscribers) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		Cityservice.allCities().success(function(data){
			$scope.cities=data.items;
		});

		FeedsService.getAllFeeds().success(function(data) {
			console.log(data.items);
			$scope.feedItems = data.items;
			$('.tooltipped').tooltip({
				delay: 50
			});
		});

		$scope.getCity=function(city_id){
			var cityname= 'city';
			angular.forEach($scope.cities,function(city,key){
				if (city.id===city_id){
					cityname= city.name + ' - ' + city.country;
				}
			});
			return cityname;

		};

		$scope.isOwned = function(channelid) {
			if ($rootScope.logged) {
				
				if ($rootScope.channels.indexOf(channelid) !== -1) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}

		};

		$scope.isAdmin = function(adminEmail) {
			if ($rootScope.logged) {
				if ($rootScope.username === adminEmail) {
					return true;
				} else

				if (adminEmail === 'all') {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}

		};

		$scope.createMessage = function(title, content, channel) {
			console.log('hai');
			console.log(title, content, channel);
			var data = {
				title: title,
				content: content,
				channel_id: channel.short_id,
				channel_name: channel.name
			};
			var response = Messages.insertMessage(data);
			response.success(function() {
				toast('Message sent!', 4000);
				$timeout(function() {
					$('.card-title').click();
					$scope.selected = false;
				});

			});
			response.error(function() {
				toast('Error sending message', 4000);

				$timeout(function() {
					$('.card-title').click();
					$('.card').removeClass('medium');
					$scope.selected = false;
				});

			});
		};

		$scope.expandCard = function(evt) {
			console.log('expand');
		};

		$scope.RemoveFeed = function(feedid) {
			var rm = Subscribers.removeChannel(feedid, $rootScope.username);
			rm.success(function(data) {
				toast('Feed Removed Successfully', 2000);
				var index = $rootScope.channels.indexOf(feedid);
				$rootScope.channels.splice(index, 1);

			});
		};

		$scope.AddFeed = function(feedid) {
			var rm = Subscribers.addChannel(feedid, $rootScope.username);
			rm.success(function(data) {
				toast('Feed added to follow list:' + feedid, 2000);

				$rootScope.channels.push(feedid);

			});
		};

		console.log($scope.feedItems);
	}]);