'use strict';

/**
 * @ngdoc overview
 * @name consoleApp
 * @description
 * # consoleApp
 *
 * Main module of the application.
 */
angular
  .module('consoleApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/feeds', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedsCtrl'
      })
      .when('/broadcasts', {
        templateUrl: 'views/broadcasts.html',
        controller: 'BroadcastsCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
