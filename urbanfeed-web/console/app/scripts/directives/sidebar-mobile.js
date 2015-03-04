'use strict';
/*global $:false */
/**
 * @ngdoc directive
 * @name consoleApp.directive:sidebarMobile
 * @description
 * # sidebarMobile
 */
angular.module('consoleApp')
	.directive('sidebarMobile', function() {
		return {

			restrict: 'A',
			link: function postLink(scope, element) {
				element.on('click', function() {
					$('.button-collapse').sideNav({
						closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
					});
				});
			}
		};
	});