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
    'ngRoute', 'ngCookies'
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
      .when('/broadcasts/:param', {
        templateUrl: 'views/broadcasts.html',
        controller: 'BroadcastsCtrl'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl'
      })
      .when('/myfeeds', {
        templateUrl: 'views/myfeeds.html',
        controller: 'MyfeedsCtrl'
      })
      .when('/sms_validation', {
        templateUrl: 'views/sms_validation.html',
        controller: 'SmsValidationCtrl'
      })
      .when('/email_validation', {
        templateUrl: 'views/email_validation.html',
        controller: 'EmailValidationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
