'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('FeedsCtrl', ['$scope', '$timeout', 'FeedsService', 'Messages', function($scope,$timeout, FeedsService, Messages) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];

		FeedsService.getAllFeeds().success(function(data) {
			console.log(data.items);
			$scope.feedItems = data.items;
		});

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
			console.log(evt);
		};

		console.log($scope.feedItems);
	}]);