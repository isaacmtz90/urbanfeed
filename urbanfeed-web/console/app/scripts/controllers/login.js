'use strict';

/**
 * @ngdoc function
 * @name consoleApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the consoleApp
 */
angular.module('consoleApp')
	.controller('LoginctrlCtrl', ['$scope', '$rootScope','$cookieStore','Subscribers', function($scope, $rootScope,$cookieStore,Subscribers) {

		if($cookieStore.get('LoggedUser')!== undefined){
			$rootScope.username=$cookieStore.get('LoggedUser');
			$rootScope.logged=true;
			var user=Subscribers.getByObjId($rootScope.username);
			user.success(function(data){
				var channels =[];
				channels=channels.concat(data.channels);
				$rootScope.channels=channels;
				$rootScope.$broadcast('user-logged');
			});
			
		}else{
			$rootScope.channels=[];
		}

		$scope.logMeIn = function(username, password) {
			//validate, if it passes:
			$rootScope.errorlogin=false;
			$rootScope.logged=false;
			
			var validation=Subscribers.validateSubscriber(username,password);
			validation.success(function(data){
				
				//set cookie
				$rootScope.username = username;
				$rootScope.password = password;
				$rootScope.channels= data.channels;
				$cookieStore.put('LoggedUser', username);
				$cookieStore.put('Logged', true);
				$rootScope.logged=true;
				$('#login').closeModal();

			});
			validation.error(function(data){
				$rootScope.errorlogin=true;
			});
			
			//TODO: store in cookie
			//TODO: Read at startup

			

		};
		$scope.register = function(username, password) {
			$('#login').closeModal();
			window.location.href = '#/registration';

		};

	}]);